import { Container } from '@chakra-ui/react';
import { Metadata } from 'vwbl-sdk';

import { ItemList } from '../../common/item-list';
import { CustomLoading } from '../../common/custom-loading';
import { NotificationModal, notifications } from '../../common/notification-modal';

type Props = {
  nfts: (Metadata | undefined)[];
  isOpenModal: boolean;
  onCloseModal: () => void;
};

export const NFTListComponent: React.FC<Props> = ({ nfts, isOpenModal, onCloseModal }) => {
  if (!nfts || nfts.length === 0) {
    return <CustomLoading />;
  }

  return (
    <Container maxW='container.lg' pt={12}>
      <NotificationModal isOpen={isOpenModal} onClose={onCloseModal} notification={notifications.load_failed} />
      <ItemList nfts={nfts} />
    </Container>
  );
};
