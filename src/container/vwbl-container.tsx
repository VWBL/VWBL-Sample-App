import { useState, useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { ManageKeyType, UploadContentType, UploadMetadataType, VWBLMetaTx, VWBLViewer } from 'vwbl-sdk';
import { ethers } from 'ethers';
import { Web3 } from 'web3';

const useVWBL = () => {
  const [vwbl, setVwbl] = useState<VWBLMetaTx>();
  const [vwblViewer, setVwblViewer] = useState<VWBLViewer>();
  const [userSignature, setUserSignature] = useState<string>();
  const [userAddress, setUserAddress] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [provider, setProvider] = useState<any>();
  const [ethersProvider, setEthersProvider] = useState<ethers.BrowserProvider>();
  const updateVwbl = useCallback((provider: any): void => {
    if (
      !process.env.NEXT_PUBLIC_VWBL_NETWORK_URL ||
      !process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
      !process.env.NEXT_PUBLIC_PROVIDER_URL ||
      !process.env.NEXT_PUBLIC_LIGHT_HOUSE_KEY ||
      !process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS ||
      !process.env.NEXT_PUBLIC_ALCHEMY_NFT_API
    ) {
      throw new Error('missing setting');
    }
    const vwblInstance = new VWBLMetaTx({
      bcProvider: provider,
      contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
      manageKeyType: ManageKeyType.VWBL_NETWORK_SERVER,
      uploadContentType: UploadContentType.IPFS,
      uploadMetadataType: UploadMetadataType.IPFS,
      vwblNetworkUrl: process.env.NEXT_PUBLIC_VWBL_NETWORK_URL,
      ipfsConfig: {
        apiKey: process.env.NEXT_PUBLIC_LIGHT_HOUSE_KEY,
      },
      biconomyConfig: {
        apiKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY!,
        forwarderAddress: process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!,
      },
      dataCollectorAddress: process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS,
    });
    setVwbl(vwblInstance);
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      const metaMaskProvider = (window as any).ethereum;

      if (metaMaskProvider && metaMaskProvider.isMetaMask) {
        setProvider(metaMaskProvider);
        updateVwbl(metaMaskProvider);
        const ethProvider = new ethers.BrowserProvider(metaMaskProvider);
        setEthersProvider(ethProvider);
        await metaMaskProvider.request({ method: 'eth_requestAccounts' });
        const ethSigner = await ethProvider.getSigner();
        const myAddress = await ethSigner.getAddress();
        if (myAddress) setUserAddress(myAddress);
      } else {
        throw new Error('missing metamask');
      }
    } catch (err) {
      console.log(err);
    }
  }, [updateVwbl]);

  const initVwbl = useCallback((): void => {
    console.log(
      process.env.NEXT_PUBLIC_VWBL_NETWORK_URL,
      process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
      process.env.NEXT_PUBLIC_PROVIDER_URL,
    );

    if (
      !process.env.NEXT_PUBLIC_VWBL_NETWORK_URL ||
      !process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
      !process.env.NEXT_PUBLIC_PROVIDER_URL ||
      !process.env.NEXT_PUBLIC_ALCHEMY_NFT_API
    ) {
      throw new Error('missing setting');
    }

    const vwblInstance = new VWBLMetaTx({
      bcProvider: provider,
      contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
      vwblNetworkUrl: process.env.NEXT_PUBLIC_VWBL_NETWORK_URL,
      biconomyConfig: {
        apiKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY!,
        forwarderAddress: process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!,
      },
    });
    setVwbl(vwblInstance);
  }, []);

  const initVWBLViewer = () => {
    if (!process.env.NEXT_PUBLIC_PROVIDER_URL || !process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS) {
      throw new Error('missing setting');
    }
    const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
    const web3 = new Web3(provider);
    const vwblViewerInstance = new VWBLViewer({
      provider: web3 as any,
      dataCollectorAddress: process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS,
    });
    setVwblViewer(vwblViewerInstance);
  };

  const clearVwbl = useCallback(() => {
    setVwbl(undefined);
    setVwblViewer(undefined);
    setUserSignature(undefined);
  }, []);

  const checkNetwork = useCallback(
    async (callback: () => void) => {
      if (!provider) return;

      const ethProvider = new ethers.BrowserProvider(provider);
      const network = await ethProvider.getNetwork();
      const connectedChainId = network.chainId;
      const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!);
      if (Number(connectedChainId) !== properChainId) {
        callback();
      }
    },
    [provider],
  );

  return {
    vwbl,
    updateVwbl,
    vwblViewer,
    initVWBLViewer,
    clearVwbl,
    errorMessage,
    setErrorMessage,
    userSignature,
    userAddress,
    provider,
    ethersProvider,
    connectWallet,
    initVwbl,
    checkNetwork,
  };
};

export const VwblContainer = createContainer(useVWBL);
