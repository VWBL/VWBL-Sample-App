import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { TransferModalComponent } from './transfer-modal';
import { ExtractMetadata } from 'vwbl-sdk';
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
      const { contractAddress, tokenId } = router.query;
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
        if (getAsString(contractAddress) === process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
          await vwbl.safeTransfer(walletAddress, parseInt(getAsString(tokenId)), process.env.NEXT_PUBLIC_TRANSFER_API_ID!);
        } else {
          const ethProvider = new ethers.providers.Web3Provider(provider);
          const vwblContract = new ethers.Contract(getAsString(contractAddress), VWBL.abi, ethProvider);
          await vwblContract.connect(ethProvider.getSigner()).transferFrom(userAddress, walletAddress, parseInt(getAsString(tokenId)));
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
    router.reload();
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
