import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import { createContainer } from 'unstated-next';
import { ManageKeyType, UploadContentType, UploadMetadataType, VWBL, VWBLViewer } from '../../VWBL-SDK';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { PROVIDER_OPTIONS } from '../utils/const';

const useVWBL = () => {
  const [web3, setWeb3] = useState<Web3>();
  const [vwbl, setVwbl] = useState<VWBL>();
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

  const updateVwbl = useCallback((web3: Web3): void => {
    if (
      !process.env.NEXT_PUBLIC_VWBL_NETWORK_URL ||
      !process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
      !process.env.NEXT_PUBLIC_PROVIDER_URL ||
      !process.env.NEXT_PUBLIC_NFT_STORAGE_KEY ||
      !process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS
    ) {
      throw new Error('missing setting');
    }

    const vwblInstance = new VWBL({
      web3,
      contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
      manageKeyType: ManageKeyType.VWBL_NETWORK_SERVER,
      uploadContentType: UploadContentType.IPFS,
      uploadMetadataType: UploadMetadataType.IPFS,
      vwblNetworkUrl: process.env.NEXT_PUBLIC_VWBL_NETWORK_URL,
      ipfsNftStorageKey: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY,
      dataCollectorAddress: process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS,
    });
    setVwbl(vwblInstance);
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      const web3Modal = new Web3Modal({
        providerOptions: PROVIDER_OPTIONS,
        cacheProvider: true,
      });
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      setWeb3(web3);
      updateVwbl(web3);
      setProvider(provider);
      const ethProvider = new ethers.providers.Web3Provider(provider);
      setEthersProvider(ethProvider);
      if (accounts) setUserAddress(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  }, [updateVwbl]);

  const initVwbl = useCallback((): void => {
    if (
      !process.env.NEXT_PUBLIC_VWBL_NETWORK_URL ||
      !process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
      !process.env.NEXT_PUBLIC_PROVIDER_URL
    ) {
      throw new Error('missing setting');
    }

    const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
    const web3 = new Web3(provider);
    const vwblInstance = new VWBL({
      web3,
      contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
      vwblNetworkUrl: process.env.NEXT_PUBLIC_VWBL_NETWORK_URL,
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
      provider: web3,
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
    web3,
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
