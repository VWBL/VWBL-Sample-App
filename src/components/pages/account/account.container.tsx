import { useState, useEffect } from 'react';
import { AccountComponent } from './account';
import { VwblContainer } from '../../../container';
import { ExtendedMetadata } from 'vwbl-sdk';
import { switchChain } from '../../../utils';
import { ethers } from 'ethers';
import axios from 'axios';

export const Account = () => {
  const [ownedNfts, setOwnedNfts] = useState<ExtendedMetadata[]>([]);
  const [mintedNfts, setMintedNfts] = useState<ExtendedMetadata[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { vwblViewer, initVWBLViewer, provider, connectWallet, checkNetwork } = VwblContainer.useContainer();

  const metadataBlockList = [
    // openseaの共有コントラクトから発行されたNFTでありVWBL NFTではない
    'https://api.opensea.io/api/v2/metadata/matic/0x2953399124F0cBB46d2CbACD8A89cF0599974963'
  ];

  useEffect(() => {
    checkNetwork(() => switchChain(provider));
  }, [checkNetwork, provider]);

  useEffect(() => {
    const setup = async () => {
      setIsLoading(true);
      if (!provider) {
        await connectWallet();
        return;
      }
      const ethersProvider = new ethers.BrowserProvider(provider);
      const userAddress = await (await ethersProvider.getSigner()).getAddress();
      setWalletAddress(userAddress);

      if (!vwblViewer) {
        initVWBLViewer();
        return;
      }
      try {
        const query = `${process.env.NEXT_PUBLIC_ALCHEMY_NFT_API}/getNFTsForOwner?owner=${userAddress}&excludeFilters[]=SPAM`;
        const result = await axios.get(query);
        const ownedItems = (await Promise.all(
          result.data.ownedNfts.map(async (v: any) => {
            if (!(v.raw && v.raw.tokenUri)) {
              console.warn(`No tokenUri available for tokenId ${v.tokenId}`);
              return null;
            }
            let metadata;
            const isBlackList = metadataBlockList.some(blockedUrl => v.raw.tokenUri.includes(blockedUrl));
            if (isBlackList) {
              return null;
            }
            try {
              const tokenRes = await axios.get(v.raw.tokenUri, {timeout: 1000});
              metadata = tokenRes.data;
            } catch (err) {
              return null;
            }
            if (typeof metadata.encrypted_data === 'undefined') {
              console.warn(`NFT tokenId ${v.tokenId} missing encrypted_data`, metadata);
              return null;
            }
            return {
              id: Number(v.tokenId),
              name: metadata.name,
              description: metadata.description,
              image: metadata.image,
              mimeType: metadata.mime_type,
              encryptLogic: metadata.encrypt_logic,
              address: v.contract.address,
            } as ExtendedMetadata;
          })
        ))
          .filter((item): item is ExtendedMetadata => item !== null)
          .reverse();
        setOwnedNfts(ownedItems);
        setIsLoading(false);
      } catch (err) {
        setIsOpenModal(true);
        console.log(err);
        setIsLoading(false);
      }

      try {
        const mintedItems = await vwblViewer.listMintedNFTMetadata(userAddress);
        setMintedNfts(mintedItems.filter((v) => v).reverse() as ExtendedMetadata[]);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    setup();
  }, [vwblViewer, provider]);

  return (
    <AccountComponent
      ownedNfts={ownedNfts}
      mintedNfts={mintedNfts}
      walletAddress={walletAddress}
      isOpenModal={isOpenModal}
      onCloseModal={() => setIsOpenModal(false)}
      isLoading={isLoading}
    />
  );
};
