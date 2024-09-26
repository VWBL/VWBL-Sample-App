'use client';

import { useState, useCallback, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { ManageKeyType, UploadContentType, UploadMetadataType, VWBLMetaTx, VWBLViewer } from 'vwbl-sdk';
import { ethers } from 'ethers';
import { Web3 } from 'web3';
import { useAppKit } from '@reown/appkit/react';
import { useDisconnect } from './web3modal';

const useVWBL = () => {
  const [vwbl, setVwbl] = useState<VWBLMetaTx>();
  const [vwblViewer, setVwblViewer] = useState<VWBLViewer>();
  const [userSignature, setUserSignature] = useState<string>();
  const [userAddress, setUserAddress] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [provider, setProvider] = useState<any>();
  const [ethersProvider, setEthersProvider] = useState<ethers.BrowserProvider>();
  const { open } = useAppKit();

  // The library is not yet supported.
  // const { disconnect } = useDisconnect();

  const initializeVwbl = useCallback((instanceProvider: any) => {
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
      bcProvider: instanceProvider,
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
      await open();
      const instance = (window as any).ethereum as ethers.Eip1193Provider;

      if (!instance) {
        throw new Error('Wallet connection failed');
      }

      const ethProvider = new ethers.BrowserProvider(instance);
      setProvider(instance);
      setEthersProvider(ethProvider);
      initializeVwbl(instance);

      const ethSigner = await ethProvider.getSigner();
      const myAddress = await ethSigner.getAddress();
      setUserAddress(myAddress);
    } catch (err) {
      console.error('Wallet connection failed:', err);
      setErrorMessage('Wallet connection failed');
    }
  }, [initializeVwbl, open]);

  useEffect(() => {
    const instance = (window as any).ethereum;
    if (!provider && instance) {
      setProvider(instance);
      const ethProvider = new ethers.BrowserProvider(instance);
      setEthersProvider(ethProvider);
      initializeVwbl(instance);
    }

    const handleAccountsChanged = () => {
      if (provider) {
        const ethProvider = new ethers.BrowserProvider(provider);
        setEthersProvider(ethProvider);
      }
    };

    window.addEventListener('accountsChanged', handleAccountsChanged);
    return () => {
      window.removeEventListener('accountsChanged', handleAccountsChanged);
    };
  }, [provider, initializeVwbl]);

  const initVwbl = useCallback(() => {
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
  }, [provider]);

  const initVWBLViewer = useCallback(() => {
    if (!process.env.NEXT_PUBLIC_PROVIDER_URL || !process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS) {
      throw new Error('missing setting');
    }
    const web3Provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_PROVIDER_URL);
    const web3 = new Web3(web3Provider);
    const vwblViewerInstance = new VWBLViewer({
      provider: web3 as any,
      dataCollectorAddress: process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS,
    });
    setVwblViewer(vwblViewerInstance);
  }, []);

  const clearVwbl = useCallback(() => {
    setVwbl(undefined);
    setVwblViewer(undefined);
    setUserSignature(undefined);
  }, []);

  const disconnectWallet = useCallback(() => {
    useDisconnect();
    clearVwbl();
    setUserAddress(undefined);
  }, [useDisconnect, clearVwbl]);

  const checkNetwork = useCallback(
    async (callback: () => void) => {
      if (!provider) return;

      const ethProvider = new ethers.BrowserProvider(provider);
      const network = await ethProvider.getNetwork();
      const connectedChainId = network.chainId;
      const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!, 10);

      if (Number(connectedChainId) !== properChainId) {
        callback();
      }
    },
    [provider],
  );

  return {
    vwbl,
    vwblViewer,
    userSignature,
    userAddress,
    errorMessage,
    provider,
    ethersProvider,
    connectWallet,
    disconnectWallet,
    initVwbl,
    initVWBLViewer,
    updateVwbl: initializeVwbl,
    clearVwbl,
    setErrorMessage,
    checkNetwork,
  };
};

export const VwblContainer = createContainer(useVWBL);
