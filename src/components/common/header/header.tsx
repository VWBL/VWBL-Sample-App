'use client';

import { Link } from '@chakra-ui/next-js';
import {
  Flex,
  HStack,
  Image,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Stack,
  Box,
  Button as ChakraButton,
  CSSObject,
  Container,
} from '@chakra-ui/react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Button } from '../button';
import { closeButton, hamburgerMenu } from './header.style';
import { VwblContainer } from '../../../container';

const NavLink = ({ title, to }: { title: string; to: string }) => {
  const isExternal = to.startsWith('https://');
  return (
    <Link href={to} isExternal={isExternal}>
      {title} {isExternal && <ExternalLinkIcon mb='4px' mx='2px' />}
    </Link>
  );
};

const HamburgerMenu = ({ onClick, sx }: { onClick: () => void; sx: CSSObject }) => (
  <ChakraButton
    position='relative'
    w='40px'
    h='20px'
    background='none'
    border='none'
    appearance='none'
    cursor='pointer'
    sx={sx}
    onClick={onClick}
    display={{ md: 'none' }}
  >
    <span></span>
    <span></span>
  </ChakraButton>
);

const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { vwbl, connectWallet } = VwblContainer.useContainer();

  const HeaderLinks = [
    { title: 'Explore', to: 'https://vwbl-protocol.org/' },
    { title: 'Create', to: '/create' },
    { title: 'Receive', to: '/receive' },
  ];

  return (
    <Container px={{ base: 6, md: 8 }} maxW='container.lg'>
      <Flex as='header' h={{ base: '70px', md: '80px' }} alignItems={'center'} justifyContent={'space-between'}>
        <Link href='/'>
          <Image src='/header-logo.svg' alt='VWBL Sample App' h={7} />
        </Link>
        <HamburgerMenu onClick={onOpen} sx={hamburgerMenu} />

        <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
          <HStack as={'nav'} spacing={6} mr={6}>
            {HeaderLinks.map((link, i) => (
              <NavLink key={i} title={link.title} to={link.to} />
            ))}
          </HStack>
          {vwbl ? (
            <HStack spacing={6}>
              <Link href='/account'>
                <Button text='My Wallet' borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} />
              </Link>
              {/* <Button text='Disconnect' borderRadius={'3xl'} isReversed onClick={handleDisconnectWallet} /> */}
            </HStack>
          ) : (
            <Button text='Connect Wallet' borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} onClick={connectWallet} />
          )}
        </Flex>

        <Drawer isOpen={isOpen} onClose={onClose} size='full'>
          <DrawerOverlay />
          <DrawerContent bg='black' color='white' py={6} px={8}>
            <VStack alignItems='end'>
              <HamburgerMenu onClick={onClose} sx={closeButton} />
              <Stack spacing={6} fontSize='3xl' alignSelf='start' fontWeight='bold'>
                <Stack as={'nav'} spacing={4}>
                  {HeaderLinks.map((link, i) => (
                    <NavLink key={i} title={link.title} to={link.to} />
                  ))}
                </Stack>
                {vwbl ? (
                  <VStack spacing={6} alignItems='start'>
                    {/* <Button text='Disconnect' borderRadius={'3xl'} isReversed fontSize={'md'} onClick={handleDisconnectWallet} /> */}
                    <Link href='/account'>
                      <Button as='a' text='My Wallet' borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} height='40px' />
                    </Link>
                  </VStack>
                ) : (
                  <HStack>
                    <Button
                      text='Connect Wallet'
                      borderRadius={'3xl'}
                      icon={MdOutlineAccountBalanceWallet}
                      onClick={connectWallet}
                      isReversed
                      height='40px'
                    />
                  </HStack>
                )}
                <Box fontSize='sm'>＊pcの方はmetamask chrome extention、mobileの方はmetamask appをご利用ください。</Box>
              </Stack>
            </VStack>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Container>
  );
};

export default Header;
