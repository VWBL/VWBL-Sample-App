// Blockchain
export type ChainId = 1 | 3 | 4 | 5 | 42 | 137 | 1337;
export type Currency = {
  name: string;
  symbol: string; // 2-6 characters long
  decimals: number; // mostly 18
};
export type Network = {
  chainName: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  nativeCurrency?: Currency;
};

export const MAX_FILE_SIZE = 1500000000; // 1.5GB
export const BASE64_MAX_SIZE = 50000000;
export const VALID_EXTENSIONS = { image: /image\/(png|jpg|jpeg|gif)/i, audio: /audio\/(mp3|wav|m4a|flac)/i, video: /video\/(mp4)/i };
export const NETWORKS: Record<ChainId, Network> = {
  1: { chainName: 'Ethereum Main Network', rpcUrls: ['https://mainnet.infura.io/v3/'], blockExplorerUrls: ['https://etherscan.io'] },
  3: { chainName: 'Ropsten Test Network', rpcUrls: ['https://ropsten.infura.io/v3/'], blockExplorerUrls: ['https://ropsten.etherscan.io'] },
  4: { chainName: 'Rinkeby Test Network', rpcUrls: ['https://rinkeby.infura.io/v3/'], blockExplorerUrls: ['https://rinkeby.etherscan.io'] },
  5: { chainName: 'Goerli Test Network', rpcUrls: ['https://goerli.infura.io/v3/'], blockExplorerUrls: ['https://goerli.etherscan.io'] },
  42: { chainName: 'Kovan Test Network', rpcUrls: ['https://kovan.infura.io/v3/'], blockExplorerUrls: ['https://kovan.etherscan.io'] },
  137: {
    chainName: 'Polygon Main Network',
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  1337: { chainName: 'Local Network', rpcUrls: ['https://localhost:8545'], blockExplorerUrls: [''] },
};

// Other
type stringObject = {
  [key: string]: string;
};

export const MEDIA_TYPE: stringObject = {
  All: 'all',
  Image: 'image',
  Movie: 'video',
  Sound: 'audio',
  Other: 'text,application',
};
