import axios from 'axios';
import VWBLInterface from './VWBL.json';
import { Metadata } from 'vwbl-sdk';
import { ethers } from 'ethers';

export const fetchAllTokens = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_URL!);
  const vwbl = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!, VWBLInterface.abi, provider);
  const itemCount = await vwbl.callStatic.counter();
  const tokenIds = Array.from(new Array(parseInt(itemCount))).map((v, i) => ++i);

  const items: (Metadata | undefined)[] = await Promise.all(
    tokenIds.map(async (tokenId: number) => {
      const metadataUrl = await vwbl.callStatic.tokenURI(tokenId);
      const metadata = (await axios.get(metadataUrl).catch(() => undefined))?.data;
      if (!metadata) {
        return undefined;
      }
      return {
        id: tokenId,
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        mimeType: metadata.mime_type,
        encryptLogic: metadata.encryptLogic,
      };
    }),
  );
  return items;
};

export const isOwnerOf = async (ethersProvider: ethers.providers.Web3Provider, tokenId: number) => {
  const signer = ethersProvider.getSigner();
  const myAddress = await signer.getAddress();
  const vwbl = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!, VWBLInterface.abi, signer);
  const owner = await vwbl.callStatic.ownerOf(tokenId);
  return myAddress === owner;
};
