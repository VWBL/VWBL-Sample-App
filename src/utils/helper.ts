import { toHex } from 'web3-utils';
import { FetchedNFT } from '../components/types';
import { ChainId, NETWORKS } from './const';

const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!) as ChainId;

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

export const switchChain = async (provider: any) => {
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(properChainId) }], // chainId must be in hexadecimal numbers
      });
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: toHex(properChainId),
                ...NETWORKS[properChainId],
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
    throw new Error('provider does not exist');
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
