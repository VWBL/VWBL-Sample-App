import { ethers } from 'ethers';
import { buildForwardTxRequest, getDataToSignForEIP712, getDomainSeparator, TxParam } from '../../utils/biconomyHelper';
import { vwblMetaTxAbi, forwarderABI } from '../../utils/contract/MetaTxABI';

export const useBiconomy = () => {
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

    return {walletProvider, walletSigner, userAddress};
  }

  const sendMintMetaTx = async (
    documentId: string,
    metadataURl: string,
  ) => {
    const {walletProvider, walletSigner, userAddress} = await initBiconomy();

    const vwblMetaTxContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
      vwblMetaTxAbi,
      walletSigner,
    );
    const { data } = await vwblMetaTxContract.populateTransaction.mint(metadataURl, process.env.NEXT_PUBLIC_VWBL_NETWORK_URL!, 0, documentId);
  
    const { txParam, sig, domainSeparator } = await constructMetaTx(userAddress, walletProvider!, data);
    await sendTransaction(txParam, sig, userAddress, domainSeparator, 'EIP712_SIGN', walletProvider!);
  };

  const sendTransferMetaTx = async (
    toAddress: string,
    tokenId: number,
  ) => {
    const {walletProvider, walletSigner, userAddress} = await initBiconomy();

    const vwblMetaTxContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
      vwblMetaTxAbi,
      walletSigner,
    );
    const { data } = await vwblMetaTxContract.populateTransaction.transferFrom(userAddress, toAddress, tokenId);
    
    const { txParam, sig, domainSeparator } = await constructMetaTx(userAddress, walletProvider, data);
    await sendTransaction(txParam, sig, userAddress, domainSeparator, 'EIP712_SIGN', walletProvider);
  };

  const constructMetaTx = async (
    userAddress: string,
    walletProvider: ethers.providers.Web3Provider,
    data: any,
  ) => {
    const gasLimit = await walletProvider.estimateGas({
      to: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
      from: userAddress,
      data,
    });
  
    const forwarderContract = new ethers.Contract(
      process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!,
      forwarderABI,
      walletProvider.getSigner(),
    );
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
          await walletProvider.waitForTransaction(result.txHash);
          console.log('confirmed:', result.txHash);
        });
    } catch (error) {
      throw new Error('post meta tx error');
    }
  };

  return {sendMintMetaTx, sendTransferMetaTx};
}