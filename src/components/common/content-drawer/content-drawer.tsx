import { Drawer, DrawerHeader, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';
import { ExtractMetadata } from 'vwbl-sdk';
import { FetchedNFT } from '../../types';
import { FileViewer } from '../file-viewer';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  nft: ExtractMetadata | FetchedNFT;
};

export const ContentDrawer: React.FC<Props> = ({ isOpen, onClose, nft }) => {
  return (
    <Drawer isOpen={isOpen} size='xl' onClose={onClose} placement='top'>
    <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px'>View Data</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody bg='black' h='100%' position='relative'>
          <FileViewer nft={nft} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
