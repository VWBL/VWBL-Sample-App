import axios from 'axios';
import VWBLInterface from './VWBL.json';
import { Metadata } from 'vwbl-sdk';
import { ethers } from 'ethers';

export const isOwnerOf = async (ethersProvider: ethers.providers.Web3Provider, tokenId: number) => {
  const signer = ethersProvider.getSigner();
  const myAddress = await signer.getAddress();
  const vwbl = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!, VWBLInterface.abi, signer);
  const owner = await vwbl.callStatic.ownerOf(tokenId);
  return myAddress === owner;
};
