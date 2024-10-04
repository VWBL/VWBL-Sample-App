import { LoadingModal } from '../../pages/receive/components/loading-modal';
import { Text, Container, Link } from '@chakra-ui/react';

import NextLink from 'next/link';
import { WalletInfo } from '../../pages/receive/components/wallet-info';
import { ReceiveNFTItemComponent } from '../receive-nft-item';
import { ExtendedMetadata } from 'vwbl-sdk';

type Props = {
  nft: ExtendedMetadata;
  isLoading: boolean;
  isReceived: boolean;
  onSubmit: () => Promise<void>;
  contents: {
    title: string;
    description: string[];
  };
};

export const ReceiveNFTComponent: React.FC<Props> = ({ nft, isLoading, isReceived, onSubmit, contents }) => {
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
          <ReceiveNFTItemComponent
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
