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
        if (getAsString(contractAddress).toLowerCase() === process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS!.toLowerCase()) {
          await vwbl.safeTransfer(walletAddress, parseInt(getAsString(tokenId)), process.env.NEXT_PUBLIC_TRANSFER_API_ID!);
          await vwbl.safeTransfer(walletAddress, parseInt(getAsString(tokenId)), process.env.NEXT_PUBLIC_TRANSFER_API_ID!);
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
