import { useState, useCallback } from 'react';
import { switchChain, uploadEncryptedFileToLighthouse, uploadThumbnailToLighthouse, uploadMetadataToLighthouse } from '../../../utils';
import { ExtendedMetadeta } from 'vwbl-sdk';
import { ToastContainer, VwblContainer } from '../../../container';
import { ReceiveNFTComponent } from './receive-nft';
import { useRouter } from 'next/router';
import { WalletInfo } from './wallet-info';
import { LoadingModal } from './loading-modal';
import { Link, Text, Container } from '@chakra-ui/react';
import NextLink from 'next/link';

type Props = {
  nft: ExtendedMetadeta;
  contents: {
    title: string;
    description: string[];
  };
  fetchContentUrl: string;
  fetchThumbnailUrl: string;
  successMessage: string;
  redirectUrl: string;
};

export const ReceiveNFTContainer: React.FC<Props> = ({
  nft,
  contents,
  fetchContentUrl,
  fetchThumbnailUrl,
  successMessage,
  redirectUrl,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { vwbl, checkNetwork, provider } = VwblContainer.useContainer();
  const { openToast } = ToastContainer.useContainer();
  const nftReceivedKey = `nft_received_${nft.name}`;
  const isReceived = typeof window !== 'undefined' ? localStorage.getItem(nftReceivedKey) === 'true' : false;

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    if (!provider) {
      openToast({
        title: 'Wallet Not Connected',
        status: 'error',
        message: 'Please connect your wallet in order to create your NFT.',
      });
      setIsLoading(false);
      return;
    }

    if (!vwbl) {
      setIsLoading(false);
      return;
    }

    checkNetwork(() => switchChain(provider));

    try {
      await vwbl.sign();

      const content = await fetch(fetchContentUrl);
      const contentFile = new File([await content.blob()], 'sample-nft-content', { type: nft.mimeType });

      const thumbnail = await fetch(fetchThumbnailUrl);
      const thumbnailFile = new File([await thumbnail.blob()], 'sample-nft-thumbnail.png', { type: 'image/png' });

      await vwbl.managedCreateTokenForIPFS(
        nft.name,
        nft.description,
        contentFile,
        thumbnailFile,
        0,
        'base64',
        process.env.NEXT_PUBLIC_MINT_API_ID!,
        uploadEncryptedFileToLighthouse,
        uploadThumbnailToLighthouse,
        uploadMetadataToLighthouse,
      );

      openToast({
        title: 'Successfully received',
        status: 'success',
        message: successMessage,
      });
      localStorage.setItem(nftReceivedKey, 'true');
      setTimeout(() => router.push(redirectUrl), 1000);
    } catch (err: any) {
      if (err.message && err.message.includes('User denied')) {
        openToast({
          title: 'User Denied Sign',
          status: 'error',
          message: 'In order to create your NFT, please sign',
        });
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [vwbl, router, provider, openToast, fetchContentUrl, fetchThumbnailUrl, nft, successMessage, redirectUrl]);
  return (
    <>
      {isLoading && <LoadingModal isOpen={isLoading} />}
      {isReceived ? (
        <Container maxW='container.md' centerContent>
          <Text my={2}>NFTを発行済です。</Text>
          <Text my={2}>
            NFTは
            <Link color='blue.600' href='/account' as={NextLink}>
              My Walletのページ
            </Link>
            で閲覧できます。
          </Text>
        </Container>
      ) : (
        <>
          <ReceiveNFTComponent
            onSubmit={onSubmit}
            contents={contents}
            isLoading={isLoading}
            title={contents.title}
            description={contents.description}
            nft={nft}
          />
          <WalletInfo />
        </>
      )}
    </>
  );
};
