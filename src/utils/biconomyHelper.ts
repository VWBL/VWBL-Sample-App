import { ethers } from 'ethers';

const biconomyForwarderDomainData = {
  name: 'Biconomy Forwarder',
  version: '1',
  salt: ethers.utils.hexZeroPad(ethers.BigNumber.from(process.env.NEXT_PUBLIC_CHAIN_ID!).toHexString(), 32),
  verifyingContract: process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!,
};

const domainType = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'verifyingContract', type: 'address' },
  { name: 'salt', type: 'bytes32' },
];
const forwardRequestType = [
  { name: 'from', type: 'address' },
  { name: 'to', type: 'address' },
  { name: 'token', type: 'address' },
  { name: 'txGas', type: 'uint256' },
  { name: 'tokenGasPrice', type: 'uint256' },
  { name: 'batchId', type: 'uint256' },
  { name: 'batchNonce', type: 'uint256' },
  { name: 'deadline', type: 'uint256' },
  { name: 'data', type: 'bytes' },
];

export interface TxParam {
  from: string;
  to: string;
  token: string;
  txGas: number;
  tokenGasPrice: string;
  batchId: number;
  batchNonce: number;
  deadline: number;
  data: string;
}

export const buildForwardTxRequest = async (tx: { account: string; gasLimitNum: number; batchNonce: string; data: string }) => {
  const req: TxParam = {
    from: tx.account,
    to: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!,
    token: '0x0000000000000000000000000000000000000000',
    txGas: tx.gasLimitNum,
    tokenGasPrice: '0',
    batchId: parseInt('0'),
    batchNonce: parseInt(tx.batchNonce),
    deadline: Math.floor(Date.now() / 1000 + 3600),
    data: tx.data as string,
  };
  return req;
};

export const getDataToSignForEIP712 = async (request: TxParam) => {
  const dataToSign = JSON.stringify({
    types: {
      EIP712Domain: domainType,
      ERC20ForwardRequest: forwardRequestType,
    },
    domain: biconomyForwarderDomainData,
    primaryType: 'ERC20ForwardRequest',
    message: request,
  });
  return dataToSign;
};

export const getDomainSeparator = async () => {
  const domainSeparator = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(
      ['bytes32', 'bytes32', 'bytes32', 'address', 'bytes32'],
      [
        ethers.utils.id('EIP712Domain(string name,string version,address verifyingContract,bytes32 salt)'),
        ethers.utils.id(biconomyForwarderDomainData.name),
        ethers.utils.id(biconomyForwarderDomainData.version),
        biconomyForwarderDomainData.verifyingContract,
        biconomyForwarderDomainData.salt,
      ],
    ),
  );
  return domainSeparator;
};
