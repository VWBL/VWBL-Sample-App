import VWBLInterface from './VWBL.json';
import { ethers } from 'ethers';

export const isOwnerOf = async (ethersProvider: ethers.BrowserProvider, tokenId: number) => {
  const signer = await ethersProvider.getSigner();
  const myAddress = await signer.getAddress();
  const vwbl = new ethers.Contract(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!, VWBLInterface.abi, signer);
  const owner = await vwbl.ownerOf(tokenId);
  return myAddress === owner;
};
