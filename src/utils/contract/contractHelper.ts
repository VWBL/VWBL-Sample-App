import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import VWBLInterface from './VWBL.json';

export const isOwnerOf = async (web3: Web3, tokenId: number) => {
  const myAddress = (await web3.eth.getAccounts())[0];
  const vwbl = new web3.eth.Contract(VWBLInterface.abi as AbiItem[], process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);
  const owner = await vwbl.methods.ownerOf(tokenId).call();
  return myAddress === owner;
};