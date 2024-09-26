'use client';
import { createAppKit } from '@reown/appkit/react';
import { EthersAdapter as EthersAdapterClass } from '@reown/appkit-adapter-ethers';
import { sepolia, polygon } from '@reown/appkit/networks';
import { ReactNode } from 'react';

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_REOWN_ID!;

// 2. Set Ethers adapters
const ethersAdapter = new EthersAdapterClass();

// 3. Create a metadata object
const metadata = {
  name: 'VWBL App',
  description: 'VWBL application',
  url: '',
  icons: [''],
};

// 4. Create the AppKit instance
createAppKit({
  adapters: [ethersAdapter],
  metadata: metadata,
  networks: [polygon, sepolia],
  projectId,
  features: {
    email: false,
    socials: [],
    analytics: false,
    swaps: false,
    onramp: false,
    emailShowWallets: true,
  },
});

// The library is not yet supported.
export function useDisconnect() {
  async function disconnect() {
    await ethersAdapter.disconnect();
  }

  return {
    disconnect,
  };
}

export function Web3Wallet({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
