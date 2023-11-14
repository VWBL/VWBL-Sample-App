# VWBL-Sample-App

## Install Packages

```bash
yarn install
```

## Set Env

### 1. Copy `.env.example` and rename it to `.env`

### 2. Set Env

Plese set the environmental variables 　 looking at the descriptions below
| name | required | description |
| --- | --- | --- |
| NEXT_PUBLIC_PROVIDER_URL | true | The URL which requests for blockchain data can be sent to |
| NEXT_PUBLIC_ALCHEMY_NFT_API | true | The URL which requests for alchemy nft API |
| NEXT_PUBLIC_NFT_CONTRACT_ADDRESS | true | The address of Smart Contract inherits VWBL Protocol |
| NEXT_PUBLIC_VWBL_NETWORK_URL | true | The URL of VWBL Key Management Network 　（No need to change）|
| NEXT_PUBLIC_CHAIN_ID | true | The ID of the blockchain network you want to connect |
| NEXT_PUBLIC_NFT_STORAGE_KEY | true | API key created on [NFT.Storage](https://nft.storage/) |
| NEXT_PUBLIC_BICONOMY_API_KEY | true | API key created on [Biconomy](https://www.biconomy.io) |
| NEXT_PUBLIC_MINT_API_ID | true | API ID of NFT mint method which is created on [Biconomy Dashboard](https://dashboard-gasless.biconomy.io/) |
| NEXT_PUBLIC_TRANSFER_API_ID | true | API ID of NFT transfer method whiich is created on [Biconomy Dashboard](https://dashboard-gasless.biconomy.io/) |
| NEXT_PUBLIC_FORWARDER_ADDRESS | true | The address of [EIP2771(Trusted Forwarder)](https://docs-gasless.biconomy.io/misc/contract-addresses) Smart Contract | 
| NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS |true | The address of [Data Collector](https://docs.vwbl-protocol.org/endpoint.html) Contract which support to fetch metadata from multiple contracts |  

## Start Locally

```bash
yarn dev
```
