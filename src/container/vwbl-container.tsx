import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import { createContainer } from 'unstated-next';
import { ManageKeyType, UploadContentType, UploadMetadataType, VWBLMetaTx, VWBLViewer } from 'vwbl-sdk';
import { ethers } from 'ethers';
import Web3 from 'web3';

const useVWBL = () => {
  const [vwbl, setVwbl] = useState<VWBLMetaTx>();
  const [vwblViewer, setVwblViewer] = useState<VWBLViewer>();
  const [userSignature, setUserSignature] = useState<string>();
  const [userAddress, setUserAddress] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [provider, setProvider] = useState<any>();
  const [ethersProvider, setEthersProvider] = useState<ethers.providers.Web3Provider>();
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const router = useRouter();

  const refreshState = useCallback(() => {
    setUserAddress('');
  }, []);

  const disconnect = useCallback(async () => {
    await web3Modal?.clearCachedProvider();
    refreshState();
    clearVwbl();
    setProvider(undefined);
    router.push('/');
  }, [refreshState, web3Modal, router]);

  const updateVwbl = useCallback((provider: any): void => {
    if (
      !process.env.NEXT_PUBLIC_VWBL_NETWORK_URL ||
      !process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
      !process.env.NEXT_PUBLIC_PROVIDER_URL ||
      !process.env.NEXT_PUBLIC_NFT_STORAGE_KEY
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
      ipfsNftStorageKey: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY,
      biconomyConfig: {
        apiKey: process.env.NEXT_PUBLIC_BICONOMY_API_KEY!,
        forwarderAddress: process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!,
      },
    });
    setVwbl(vwblInstance);
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      const web3Modal = new Web3Modal({ cacheProvider: true });
      const provider = await web3Modal.connect();
      updateVwbl(provider);
      setProvider(provider);
      const ethProvider = new ethers.providers.Web3Provider(provider);
      setEthersProvider(ethProvider);
      const ethSigner = ethProvider.getSigner();
      const myAddress = await ethSigner.getAddress();
      if (myAddress) setUserAddress(myAddress);
    } catch (err) {
      console.log(err);
    }
  }, [web3Modal, updateVwbl]);

  const initVwbl = useCallback((): void => {
    if (
      !process.env.NEXT_PUBLIC_VWBL_NETWORK_URL ||
      !process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
      !process.env.NEXT_PUBLIC_PROVIDER_URL
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
    if (
      !process.env.NEXT_PUBLIC_VWBL_NETWORK_URL ||
      !process.env.NEXT_PUBLIC_PROVIDER_URL ||
      !process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS
    ) {
      throw new Error('missing setting');
    }
    const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
    const web3 = new Web3(provider);
    const vwblViewerInstance = new VWBLViewer({
      web3,
      vwblNetworkUrl: process.env.NEXT_PUBLIC_VWBL_NETWORK_URL,
      dataCollectorAddress: process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS,
    });
    setVwblViewer(vwblViewerInstance);
  };

  const clearVwbl = useCallback(() => {
    setVwbl(undefined);
    setVwblViewer(undefined);
    setUserSignature(undefined);
  }, []);

  useEffect(() => {
    const web3Modal = new Web3Modal({ cacheProvider: true });
    setWeb3Modal(web3Modal);
  }, []);

  const checkNetwork = useCallback(
    async (callback: () => void) => {
      if (!provider) return;

      const ethProvider = new ethers.providers.Web3Provider(provider);
      const ethSigner = ethProvider.getSigner();
      const connectedChainId = await ethSigner?.getChainId();
      const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!);
      if (connectedChainId !== properChainId) {
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
    disconnect,
    provider,
    ethersProvider,
    connectWallet,
    web3Modal,
    initVwbl,
    checkNetwork,
  };
};

export const VwblContainer = createContainer(useVWBL);
