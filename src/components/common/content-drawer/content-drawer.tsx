import { Drawer, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Box } from '@chakra-ui/react';
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
    <Drawer isOpen={isOpen} size='full' onClose={onClose} placement='top'>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth='1px' px={8} display='flex' alignItems='center' justifyContent='space-between' w='100%'>
          View Data
          <DrawerCloseButton position='static' justifyContent='space-between' px={2} />
        </DrawerHeader>
        <Box bg='black' h='100%' position='relative'>
          <Box position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)' w='80%'>
            <FileViewer nft={nft} />
          </Box>
        </Box>
      </DrawerContent>
    </Drawer>
  );
};
