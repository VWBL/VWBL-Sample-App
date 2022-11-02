import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';
import { createContainer } from 'unstated-next';
import { ManageKeyType, UploadContentType, UploadMetadataType, VWBL } from 'vwbl-sdk';
import Web3 from 'web3';

const useVWBL = () => {
  const [vwbl, setVwbl] = useState<VWBL>();
  const [userSignature, setUserSignature] = useState<string>();
  const [userAddress, setUserAddress] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [web3, setWeb3] = useState<Web3>();
  const [web3Modal, setWeb3Modal] = useState<Web3Modal>();
  const router = useRouter();

  const refreshState = useCallback(() => {
    setUserAddress('');
  }, []);

  const disconnect = useCallback(async () => {
    await web3Modal?.clearCachedProvider();
    refreshState();
    clearVwbl();
    setWeb3(undefined);
    router.push('/');
  }, [refreshState, web3Modal, router]);

  const updateVwbl = useCallback((web3: Web3): void => {
    if (
      !process.env.NEXT_PUBLIC_VWBL_NETWORK_URL ||
      !process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS ||
      !process.env.NEXT_PUBLIC_PROVIDER_URL ||
      !process.env.NEXT_PUBLIC_NFT_STORAGE_KEY
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
    });
    setVwbl(vwblInstance);
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      const provider = await web3Modal?.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      setWeb3(web3);
      updateVwbl(web3);
      if (accounts) setUserAddress(accounts[0]);
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
    const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
    const web3 = new Web3(provider);
    const vwblInstance = new VWBL({
      web3,
      contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
      vwblNetworkUrl: process.env.NEXT_PUBLIC_VWBL_NETWORK_URL,
    });
    setVwbl(vwblInstance);
  }, []);

  const clearVwbl = useCallback(() => {
    setVwbl(undefined);
    setUserSignature(undefined);
  }, []);

  useEffect(() => {
    const web3Modal = new Web3Modal({ cacheProvider: true });
    setWeb3Modal(web3Modal);
  }, []);

  const checkNetwork = useCallback(
    async (callback: () => void) => {
      if (!web3) return;

      const connectedChainId = await web3.eth.getChainId();
      const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!);
      if (connectedChainId !== properChainId) {
        callback();
      }
    },
    [web3],
  );

  return {
    vwbl,
    updateVwbl,
    clearVwbl,
    errorMessage,
    setErrorMessage,
    userSignature,
    userAddress,
    disconnect,
    web3,
    connectWallet,
    web3Modal,
    initVwbl,
    checkNetwork,
  };
};

export const VwblContainer = createContainer(useVWBL);
