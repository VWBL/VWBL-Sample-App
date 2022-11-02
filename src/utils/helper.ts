import { toHex } from 'web3-utils';
import { FetchedNFT } from '../components/types';
import { ChainId, NETWORKS } from './const';

export const getAsString = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

export const segmentation = (file: File, segmentSize: number) => {
  const segments = [];
  let fi = 0;
  while (fi * segmentSize < file.size) {
    const segment = file.slice(fi * segmentSize, (fi + 1) * segmentSize);
    segments.push(new File([segment], `${file.name}-${fi}`, { type: file.type }));
    ++fi;
  }

  return segments;
};

export const switchChain = async (chainId: ChainId) => {
  // Check if MetaMask is installed
  // MetaMask injects the global API into window.ethereum
  if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(chainId) }], // chainId must be in hexadecimal numbers
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: toHex(chainId),
                ...NETWORKS[chainId],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
  }
};

/**
 *
 * check if passed nft has actual data (means the current viewer is the owner or minter of the nft)
 *
 * @param nft
 * @returns boolean
 */
export const isExtracted = (nft: FetchedNFT) => {
  return 'fileName' in nft && 'ownDataBase64' in nft && 'ownFiles' in nft;
};
