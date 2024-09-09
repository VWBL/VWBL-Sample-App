'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';

import { TransferModalComponent } from './transfer-modal';
import { ExtractMetadata, ManageKeyType, UploadContentType, UploadMetadataType, VWBLMetaTx } from 'vwbl-sdk';
import { VwblContainer, ToastContainer } from '../../../container';
import { getAsString } from '../../../utils/helper';
import { ChainId, NETWORKS } from '../../../utils';
import { ethers } from 'ethers';
import VWBL from '../../../utils/contract/VWBL.json';

export type FormInputs = {
  walletAddress: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  nft: ExtractMetadata;
};

export const TransferModal: React.FC<Props> = ({ isOpen, onClose, nft }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'onBlur' });
  const router = useRouter();
  const { vwbl, provider, userAddress, checkNetwork } = VwblContainer.useContainer();
  const { openToast } = ToastContainer.useContainer();
  const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!) as ChainId;

  const onSubmit = useCallback(
    async (data: FormInputs) => {
      const searchParams = useSearchParams();
      if (!searchParams) {
        console.log('エラー: パラメータが見つかりません。');
        return; // JSX要素ではなく、voidを返す
      }
      const contractAddress = searchParams.get('contractAddress');
      const tokenId = searchParams.get('tokenId');

      if (!contractAddress || !tokenId) return;
      const { walletAddress } = data;
      if (!walletAddress) {
        console.log('something went wrong');
        return;
      }
      await checkNetwork(() =>
        openToast({
          title: 'Please switch to ' + NETWORKS[properChainId],
          status: 'error',
          message: 'In order to transfer your nft, please switch to ' + NETWORKS[properChainId] + ' within your MetaMask wallet.',
        }),
      );

      if (!vwbl) return;
      if (!vwbl?.signature) {
        await vwbl?.sign();
      }
      try {
        setIsLoading(true);
        const lowerCaseContractAddress = getAsString(contractAddress).toLowerCase();
        const nftContractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!.toLowerCase();
        const nftGachaContractAddress = process.env.NEXT_PUBLIC_GACHA_NFT_CONTRACT_ADDRESS!.toLowerCase();

        let apiKey: string | undefined, transferApiId: string | undefined;

        if (lowerCaseContractAddress === nftContractAddress) {
          apiKey = process.env.NEXT_PUBLIC_BICONOMY_API_KEY;
          transferApiId = process.env.NEXT_PUBLIC_TRANSFER_API_ID!;
          await vwbl.safeTransfer(walletAddress, parseInt(getAsString(tokenId)), transferApiId);
        } else if (lowerCaseContractAddress === nftGachaContractAddress) {
          apiKey = process.env.NEXT_PUBLIC_GACHA_BICONOMY_API_KEY!;
          transferApiId = process.env.NEXT_PUBLIC_GACHA_TRANSFER_API_ID!;
          const provider = (window as any).ethereum;
          const vwblInstance = new VWBLMetaTx({
            bcProvider: provider,
            contractAddress: process.env.NEXT_PUBLIC_GACHA_NFT_CONTRACT_ADDRESS!,
            manageKeyType: ManageKeyType.VWBL_NETWORK_SERVER,
            uploadContentType: UploadContentType.IPFS,
            uploadMetadataType: UploadMetadataType.IPFS,
            vwblNetworkUrl: process.env.NEXT_PUBLIC_VWBL_NETWORK_URL!,
            ipfsConfig: {
              apiKey: process.env.NEXT_PUBLIC_LIGHT_HOUSE_KEY!,
            },
            biconomyConfig: {
              apiKey: apiKey,
              forwarderAddress: process.env.NEXT_PUBLIC_FORWARDER_ADDRESS!,
            },
            dataCollectorAddress: process.env.NEXT_PUBLIC_DATA_COLLECTOR_ADDRESS,
          });

          await vwblInstance.safeTransfer(walletAddress, parseInt(getAsString(tokenId)), transferApiId);
        } else {
          const ethProvider = new ethers.BrowserProvider(provider);
          const signer = await ethProvider.getSigner();
          const vwblContract = new ethers.Contract(getAsString(contractAddress), VWBL.abi, signer);
          await vwblContract.transferFrom(userAddress, walletAddress, parseInt(getAsString(tokenId)));
        }
        setIsComplete(true);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [vwbl, router, checkNetwork, openToast],
  );

  const onRefresh = async () => {
    await router.push('/account');
    setIsComplete(false);
    router.replace('/account');
    router.refresh();
  };

  return (
    <TransferModalComponent
      isOpenModal={isOpen}
      isComplete={isComplete}
      isLoading={isLoading}
      onSubmit={onSubmit}
      onCloseModal={onClose}
      onRefresh={onRefresh}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      nft={nft}
    />
  );
};
