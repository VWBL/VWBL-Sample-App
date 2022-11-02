import axios from 'axios';
import VWBLInterface from './VWBL.json';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Metadata } from 'vwbl-sdk';

export const fetchAllTokens = async () => {
  const provider = new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_PROVIDER_URL!);
  const web3 = new Web3(provider);
  const vwbl = new web3.eth.Contract(VWBLInterface.abi as AbiItem[], process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);
  const itemCount = await vwbl.methods.counter().call();
  const tokenIds = Array.from(new Array(parseInt(itemCount))).map((v, i) => ++i);

  const items: (Metadata | undefined)[] = await Promise.all(
    tokenIds.map(async (tokenId: number) => {
      const metadataUrl = await vwbl.methods.tokenURI(tokenId).call();
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

export const isOwnerOf = async (web3: Web3, tokenId: number) => {
  const myAddress = (await web3.eth.getAccounts())[0];
  const vwbl = new web3.eth.Contract(VWBLInterface.abi as AbiItem[], process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);
  const owner = await vwbl.methods.ownerOf(tokenId).call();
  return myAddress === owner;
};
