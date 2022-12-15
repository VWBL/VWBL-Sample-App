import { Box, Container } from '@chakra-ui/react';
import { Metadata } from 'vwbl-sdk';
import { ItemList } from '../../common/item-list';
import { CustomLoading } from '../../common/custom-loading';
import { NotificationModal, notifications } from '../../common/notification-modal';
import { SortMenu } from '../../common/sort-menu';
import { MEDIA_TYPE } from '../../../utils';

type Props = {
  nfts: (Metadata | undefined)[];
  isOpenModal: boolean;
  onCloseModal: () => void;
  sortType: string;
  changeSortType: (arg0: string) => void;
};

export const NFTListComponent: React.FC<Props> = ({ nfts, isOpenModal, onCloseModal, sortType, changeSortType }) => {
  if (!nfts || nfts.length === 0) {
    return <CustomLoading />;
  }

  return (
    <Container maxW='container.lg' pt={12}>
      <NotificationModal isOpen={isOpenModal} onClose={onCloseModal} notification={notifications.load_failed} />
      <Box display='flex' justifyContent='right' px={4}>
        <SortMenu name='Media' sortType={sortType} changeSortType={changeSortType} typeOptions={MEDIA_TYPE} />
      </Box>
      <ItemList nfts={nfts} />
    </Container>
  );
};
