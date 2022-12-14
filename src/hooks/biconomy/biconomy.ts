import { Biconomy } from '@biconomy/mexa';
import { ethers } from 'ethers';
import { buildForwardTxRequest, getDataToSignForEIP712, getDomainSeparator, TxParam } from '../../utils/biconomyHelper';
import { vwblMetaTxAbi, forwarderABI } from '../../utils/contract/MetaTxABI';

export const initBiconomy = async () => {
  if (
    !process.env.NEXT_PUBLIC_BICONOMY_API_KEY ||
    !process.env.NEXT_PUBLIC_MINT_API_ID ||
    !process.env.NEXT_PUBLIC_TRANSFER_API_ID ||
    !process.env.NEXT_PUBLIC_FORWARDER_ADDRESS
  ) {
    throw new Error('missing biconomy setting');
  }

  const jsonRpcProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_URL!);
  const biconomy = new Biconomy(jsonRpcProvider, {
    walletProvider: window.ethereum,
    apiKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY!,
    debug: true,
  });
  console.log('biconomy:', biconomy);

  const ethersProvider = new ethers.providers.Web3Provider(biconomy);
  const walletProvider = new ethers.providers.Web3Provider(window.ethereum);
  const walletSigner = walletProvider.getSigner();
  const userAddress = await walletSigner.getAddress();

  return { biconomy, ethersProvider, walletProvider, userAddress };
};

export const sendMintMetaTx = async (
  biconomy: Biconomy,
  documentId: string,
  metadataURl: string,
  userAddress: string,
  ethersProvider: ethers.providers.Web3Provider,
  walletProvider: ethers.providers.Web3Provider,
) => {
  const vwblMetaTxContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
    vwblMetaTxAbi,
    biconomy.getSignerByAddress(userAddress),
  );
  console.log('vwbl meta tx contract:', vwblMetaTxContract);
  const { data } = await vwblMetaTxContract.populateTransaction.mint(metadataURl, process.env.NEXT_PUBLIC_VWBL_NETWORK_URL!, 0, documentId);
  console.log('populate tx:', data);

  const { txParam, sig, domainSeparator } = await constructMetaTx(biconomy, userAddress, ethersProvider, walletProvider, data);
  await sendTransaction(txParam, sig, userAddress, domainSeparator, 'EIP712_SIGN', ethersProvider);
};

export const sendTransferMetaTx = async (
  biconomy: Biconomy,
  userAddress: string,
  toAddress: string,
  tokenId: number,
  ethersProvider: ethers.providers.Web3Provider,
  walletProvider: ethers.providers.Web3Provider,
) => {
  const vwblMetaTxContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
    vwblMetaTxAbi,
    biconomy.getSignerByAddress(userAddress),
  );
  console.log('vwbl meta tx contract:', vwblMetaTxContract);
  const { data } = await vwblMetaTxContract.populateTransaction.transferFrom(userAddress, toAddress, tokenId);
  console.log('populate tx:', data);

  const { txParam, sig, domainSeparator } = await constructMetaTx(biconomy, userAddress, ethersProvider, walletProvider, data);
  await sendTransaction(txParam, sig, userAddress, domainSeparator, 'EIP712_SIGN', ethersProvider);
};

const constructMetaTx = async (
  biconomy: Biconomy,
  userAddress: string,
  ethersProvider: ethers.providers.Web3Provider,
  walletProvider: ethers.providers.Web3Provider,
  data: any,
) => {
  const gasPrice = await ethersProvider!.getGasPrice();
  console.log(gasPrice.toString());
  const gasLimit = await ethersProvider!.estimateGas({
    to: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
    from: userAddress,
    data,
  });
  console.log('gaslimit', gasLimit.toString());
  console.log('gasPrice', gasPrice.toString());

  const forwarderContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!,
    forwarderABI,
    biconomy.getSignerByAddress(userAddress),
  );
  const batchNonce = await forwarderContract.getNonce(userAddress, 0);
  console.log('nonce:', batchNonce);
  const txParam: TxParam = await buildForwardTxRequest({
    account: userAddress,
    gasLimitNum: Number(gasLimit.toNumber().toString()),
    batchNonce,
    data: data!,
  });
  console.log('tx param:', txParam);

  const domainSeparator = await getDomainSeparator();
  console.log('domain separator:', domainSeparator);
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
  ethersProvider: ethers.providers.Web3Provider,
) => {
  const params = [request, domainSeparator, sig];

  try {
    await fetch(`https://api.biconomy.io/api/v2/meta-tx/native`, {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_BICONOMY_API_KEY!,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        to: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
        apiId: process.env.NEXT_PUBLIC_MINT_API_ID!,
        params: params,
        from: userAddress,
        signatureType: signatureType,
      }),
    })
      .then((response) => response.json())
      .then(async function (result: any) {
        console.log('tx hash:', result.txHash);
        const receipt = await ethersProvider!.waitForTransaction(result.txHash);
        console.log('confirmed:', receipt);
      });
  } catch (error) {
    throw new Error('post meta tx error');
  }
};
