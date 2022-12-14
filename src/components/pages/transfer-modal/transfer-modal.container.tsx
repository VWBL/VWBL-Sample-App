import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { TransferModalComponent } from './transfer-modal';
import { ExtractMetadata } from 'vwbl-sdk';
import { VwblContainer, ToastContainer } from '../../../container';
import { getAsString } from '../../../utils/helper';
import { ChainId, NETWORKS } from '../../../utils';
import { initBiconomy, sendTransferMetaTx } from '../../../hooks/biconomy';

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
  const { vwbl, checkNetwork } = VwblContainer.useContainer();
  const { openToast } = ToastContainer.useContainer();
  const properChainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!) as ChainId;

  const onSubmit = useCallback(
    async (data: FormInputs) => {
      const { tokenId } = router.query;
      if (!tokenId) return;
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
        const { biconomy, ethersProvider, walletProvider, userAddress } = await initBiconomy();
        console.log('biconomy init:', biconomy);
        await sendTransferMetaTx(biconomy, userAddress, walletAddress, parseInt(getAsString(tokenId)), ethersProvider, walletProvider);

        // await vwbl.safeTransfer(walletAddress, parseInt(getAsString(tokenId)));
        setIsComplete(true);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    },
    [vwbl, router, checkNetwork, openToast],
  );

  const onRefresh = () => {
    router.reload();
    setIsComplete(false);
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
