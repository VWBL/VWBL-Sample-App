# VWBL-Sample-App

## Install Packages
```bash
yarn install
```

## Set Env
### 1. Copy `.env.example` and rename it to `.env`
### 2. Set Env
Plese set the environmental variables　looking at the descriptions below
| name | required | description |
| --- | --- | --- | 
| NEXT_PUBLIC_PROVIDER_URL | true | The URL which requests for blockchain data can be sent to |
| NEXT_PUBLIC_NFT_CONTRACT_ADDRESS | true | The address of Smart Contract inherits VWBL Protocol |
| NEXT_PUBLIC_VWBL_NETWORK_URL | true | The URL of VWBL Key Management Network　（No need to change）|
| NEXT_PUBLIC_CHAIN_ID | true | The ID of the blockchain network you want to connect |
| NEXT_PUBLIC_NFT_STORAGE_KEY | true | API key created on [NFT.Storage](https://nft.storage/) | 


## Start Locally
```bash
yarn dev
```
