import { ethers } from 'ethers';
import axios from 'axios';
import { EncryptLogic, VWBL, VWBLApi } from 'vwbl-sdk';
import Web3 from 'web3';
import { buildForwardTxRequest, getDataToSignForEIP712, getDomainSeparator, TxParam } from './biconomyHelper';
import { vwblMetaTxAbi, forwarderABI } from './contract/MetaTxABI';
import { UploadToIPFS } from './ipfsHelper';

export const managedCreateTokenViaMetaTx = async (
  vwbl: VWBL,
  plainFile: File | File[],
  isBase64: boolean,
  thumbnail: FileList,
  title: string,
  description: string,
  encryptLogic: EncryptLogic,
  web3: Web3,
) => {
  // 1. create key in frontend
  const key = vwbl.createKey();
  // 2. encrypt data
  console.log('encrypt data');
  const plainFileArray = [plainFile].flat();
  // 3. upload data
  console.log('upload data');
  const uploadToIpfs = new UploadToIPFS(process.env.NEXT_PUBLIC_NFT_STORAGE_KEY!);
  const encryptedDataUrls = await Promise.all(
    plainFileArray.map(async (file) => {
      const encryptedContent = isBase64 ? await vwbl.encryptDataViaBase64(file, key) : await vwbl.encryptFile(file, key);
      console.log(typeof encryptedContent);
      return await uploadToIpfs.uploadEncryptedFile(encryptedContent);
    }),
  );
  const thumbnailImageUrl = await uploadToIpfs.uploadThumbnail(thumbnail[0]);
  // 4. upload metadata
  console.log('upload metadata');
  const metadataUrl = await uploadToIpfs.uploadMetadata(
    title,
    description,
    thumbnailImageUrl,
    encryptedDataUrls,
    plainFileArray[0].type,
    encryptLogic,
  );
  // 5. mint nft by meta transaction
  console.log('mint via meta transaction');
  const documentId = web3.utils.randomHex(32);
  await sendMintMetaTx(documentId, metadataUrl);
  // 6. set key to vwbl-network
  console.log('set key');
  const keySetApi = new VWBLApi(process.env.NEXT_PUBLIC_VWBL_NETWORK_URL!);
  const chainId = await vwbl.opts.web3.eth.getChainId();
  await keySetApi.setKey(documentId, chainId, key, vwbl.signature!);
};

const initBiconomy = async () => {
  if (
    !process.env.NEXT_PUBLIC_BICONOMY_API_KEY ||
    !process.env.NEXT_PUBLIC_MINT_API_ID ||
    !process.env.NEXT_PUBLIC_TRANSFER_API_ID ||
    !process.env.NEXT_PUBLIC_FORWARDER_ADDRESS
  ) {
    throw new Error('missing biconomy setting');
  }

  const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
  const walletSigner = walletProvider.getSigner();
  const userAddress = await walletSigner.getAddress();

  return { walletProvider, walletSigner, userAddress };
};

const sendMintMetaTx = async (documentId: string, metadataURl: string) => {
  const { walletProvider, walletSigner, userAddress } = await initBiconomy();

  const vwblMetaTxContract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!, vwblMetaTxAbi, walletSigner);
  const { data } = await vwblMetaTxContract.populateTransaction.mint(metadataURl, process.env.NEXT_PUBLIC_VWBL_NETWORK_URL!, 0, documentId);

  const { txParam, sig, domainSeparator } = await constructMetaTx(userAddress, walletProvider, data);
  await sendTransaction(txParam, sig, userAddress, domainSeparator, 'EIP712_SIGN', walletProvider);
};

export const sendTransferMetaTx = async (toAddress: string, tokenId: number) => {
  const { walletProvider, walletSigner, userAddress } = await initBiconomy();

  const vwblMetaTxContract = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!, vwblMetaTxAbi, walletSigner);
  const { data } = await vwblMetaTxContract.populateTransaction.transferFrom(userAddress, toAddress, tokenId);

  const { txParam, sig, domainSeparator } = await constructMetaTx(userAddress, walletProvider, data);
  await sendTransaction(txParam, sig, userAddress, domainSeparator, 'EIP712_SIGN', walletProvider);
};

const constructMetaTx = async (userAddress: string, walletProvider: ethers.providers.Web3Provider, data: any) => {
  const gasLimit = await walletProvider.estimateGas({
    to: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
    from: userAddress,
    data,
  });

  const forwarderContract = new ethers.Contract(process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!, forwarderABI, walletProvider.getSigner());
  const batchNonce = await forwarderContract.getNonce(userAddress, 0);
  const txParam: TxParam = await buildForwardTxRequest({
    account: userAddress,
    gasLimitNum: Number(gasLimit.toNumber().toString()),
    batchNonce,
    data: data!,
  });

  const domainSeparator = await getDomainSeparator();
  const dataToSign = await getDataToSignForEIP712(txParam);
  const sig = await walletProvider?.send('eth_signTypedData_v3', [userAddress, dataToSign]);

  return { txParam, sig, domainSeparator };
};

const sendTransaction = async (
  request: TxParam,
  sig: any,
  userAddress: string,
  domainSeparator: string,
  signatureType: string,
  walletProvider: ethers.providers.Web3Provider,
) => {
  const params = [request, domainSeparator, sig];

  try {
    const headers = {
      'x-api-key': process.env.NEXT_PUBLIC_BICONOMY_API_KEY!,
      'content-Type': 'application/json;charset=utf-8',
    };
    const { data } = await axios.post(
      `https://api.biconomy.io/api/v2/meta-tx/native`,
      {
        to: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
        apiId: process.env.NEXT_PUBLIC_MINT_API_ID!,
        params: params,
        from: userAddress,
        signatureType: signatureType,
      },
      { headers: headers },
    );
    await walletProvider.waitForTransaction(data.txHash);
    console.log('confirmed:', data.txHash);
  } catch (error) {
    throw new Error('post meta tx error');
  }
};
