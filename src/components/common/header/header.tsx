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

import { Button } from '../button';
import { closeButton, hamburgerMenu } from './header.style';
import { VwblContainer } from '../../../container';
import { NavLink } from '../nav-link';

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
  const { connectWallet, userAddress } = VwblContainer.useContainer();

  const HeaderLinks = [
    { title: 'Explore', to: 'https://vwbl-protocol.org/', isExternal: true },
    { title: 'Create', to: '/create', isExternal: false },
    { title: 'Receive', to: '/receive', isExternal: false },
  ];

  return (
    <Container px={{ base: 6, md: 8 }} maxW='100%' as='header'>
      <Flex h={{ base: '70px', md: '80px' }} alignItems={'center'} justifyContent={'space-between'} maxW='container.lg' w='100%' mx='auto'>
        <Link href='/'>
          <Image src='/header-logo.svg' alt='VWBL Sample App' h={7} />
        </Link>
        <HamburgerMenu onClick={onOpen} sx={hamburgerMenu} />

        <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
          <HStack as={'nav'} spacing={6} mr={6}>
            {HeaderLinks.map((link, i) => (
              <NavLink key={i} title={link.title} to={link.to} isExternal={link.isExternal} />
            ))}
          </HStack>
          {userAddress ? (
            <HStack spacing={6}>
              <Button text='Disconnect' borderRadius={'3xl'} isReversed onClick={onClose} />
              <Link
                bg='black'
                color='white'
                borderRadius={'3xl'}
                _hover={{ opacity: 0.7 }}
                h={10}
                px={4}
                py={2}
                href='/account'
                fontWeight='bold'
              >
                My Wallet
              </Link>
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
              <Stack spacing={6} fontSize='2xl' alignSelf='start' fontWeight='bold'>
                <Stack as={'nav'} spacing={4}>
                  {HeaderLinks.map((link, i) => (
                    <NavLink key={i} title={link.title} to={link.to} isExternal={link.isExternal} />
                  ))}
                </Stack>
                {userAddress ? (
                  <VStack spacing={4} alignItems='start'>
                    <Link
                      bg='white'
                      color='black'
                      borderRadius={'3xl'}
                      _hover={{ opacity: 0.7 }}
                      h={10}
                      w={40}
                      px={6}
                      py='2px'
                      href='/account'
                      fontWeight='bold'
                      fontSize='2xl'
                    >
                      My Wallet
                    </Link>
                    <Button px={6} text='Disconnect' borderRadius={'3xl'} fontSize='2xl' onClick={onClose} border='solid 1px white' />

                    {/* <Link href='/account'>
                      <Button as='a' text='My Wallet' borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} height='40px' />
                    </Link> */}
                  </VStack>
                ) : (
                  <HStack>
                    <Button
                      text='Connect Wallet'
                      borderRadius={'3xl'}
                      icon={MdOutlineAccountBalanceWallet}
                      onClick={connectWallet}
                      isReversed
                      width={60}
                      height={10}
                      fontSize='xl'
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
