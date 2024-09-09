'use client';

import { useEffect } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  HStack,
  VStack,
  useDisclosure,
  Stack,
  Container,
  Text,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Button as ChakraButton,
  CSSObject,
  Image,
} from '@chakra-ui/react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { VwblContainer } from '../../../container/vwbl-container';
import { Button } from '../button';
import { hamburgerMenu, closeButton } from './layout.style';
import { useRouter } from 'next/navigation';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useDisconnect, useWeb3Modal } from '@web3modal/ethers/react';

type Link = {
  title: string;
  to: string;
  target?: string;
};

const NavLink = ({ title, to }: Link) => {
  const isExternal = to.startsWith('https://');
  return (
    <Link as={!isExternal ? NextLink : undefined} href={to} isExternal={isExternal}>
      {title} {isExternal && <ExternalLinkIcon mb='4px' mx='2px' />}
    </Link>
  );
};

const HamburgerMenu = ({ onClick, sx }: { onClick: () => void; sx: CSSObject }) => {
  return (
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
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const { open } = useWeb3Modal();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connectWallet } = VwblContainer.useContainer();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const HeaderLinks: Link[] = [
    {
      title: 'Explore',
      to: 'https://vwbl-protocol.org/',
    },
    {
      title: 'Create',
      to: '/create',
    },
    {
      title: 'Receive',
      to: '/receive',
    },
  ];

  const FooterLinks: Link[] = [
    {
      title: 'Explore',
      to: 'https://vwbl-protocol.org/',
    },
    {
      title: 'Create',
      to: '/create',
    },
    {
      title: 'Receive',
      to: '/receive',
    },
  ];

  useEffect(() => {
    onClose();
  }, [router]);

  const handleConnectWallet = async () => {
    await open();
  };

  const handleDisconnecttWallet = async () => {
    await disconnect();
  };

  return (
    <>
      <Container px={{ base: 6, md: 8 }} maxW='container.lg'>
        <Flex as='header' h={{ base: '70px', md: '80px' }} alignItems={'center'} justifyContent={'space-between'}>
          <Link href='/' as={NextLink}>
            <Image src='/header-logo.svg' alt='VWBL Sample App' h={7} />
          </Link>
          <HamburgerMenu onClick={onOpen} sx={hamburgerMenu} />

          <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
            <HStack as={'nav'} spacing={6} mr={6}>
              {HeaderLinks.map((link, i) => (
                <NavLink key={i} title={link.title} to={link.to} target={link.target} />
              ))}
            </HStack>
            {/* {isConnected ? (
              <HStack spacing={6}>
                <Link href='/account' as={NextLink}>
                  <Button text='My Wallet' borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} />
                </Link>
                <Button text='Disconnect' borderRadius={'3xl'} isReversed onClick={handleDisconnecttWallet} />
              </HStack>
            ) : (
              <Button text='Connect Wallet' borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} onClick={handleConnectWallet} />
            )} */}
          </Flex>
        </Flex>

        <Drawer isOpen={isOpen} onClose={onClose} size='full'>
          <DrawerOverlay />
          <DrawerContent bg='black' color='white' py={6} px={8}>
            <VStack alignItems='end'>
              <HamburgerMenu onClick={onClose} sx={closeButton} />
              <Stack spacing={6} fontSize='3xl' alignSelf='start' fontWeight='bold'>
                <Stack as={'nav'} spacing={4}>
                  {HeaderLinks.map((link, i) => (
                    <NavLink key={i} title={link.title} to={link.to} target={link.target} />
                  ))}
                </Stack>
                {/* {isConnected ? (
                  <VStack spacing={6} alignItems='start'>
                    <Button text='Disconnect' borderRadius={'3xl'} isReversed fontSize={'md'} onClick={handleDisconnecttWallet} />
                    <Link href='/account' as={NextLink}>
                      <Button as='a' text='My Wallet' borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} height='40px' />
                    </Link>
                  </VStack>
                ) : (
                  <HStack>
                    <Button
                      text='Connect Wallet'
                      borderRadius={'3xl'}
                      icon={MdOutlineAccountBalanceWallet}
                      onClick={handleConnectWallet}
                      isReversed
                      height='40px'
                    />
                  </HStack>
                )} */}
                <Box fontSize='sm'>＊pcの方はmetamask chrome extention、mobileの方はmetamask appをご利用ください。</Box>
              </Stack>
            </VStack>
          </DrawerContent>
        </Drawer>
      </Container>

      {/* hidden element to adjust height */}
      <Box minH='calc(100vh - 160px)'>{children}</Box>
      <Container
        as='footer'
        pt={{ base: 8, md: 10 }}
        pb={{ base: 6, md: 10 }}
        role='contentinfo'
        maxW='100%'
        borderTop='2px'
        px={{ base: 6, md: 8 }}
      >
        <Flex
          justifyContent={{ base: 'center', md: 'space-between' }}
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'start', md: 'center' }}
          h='100%'
          maxW='container.lg'
          mx='auto'
        >
          <Stack
            spacing={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            pb={{ base: 8, md: 0 }}
            fontWeight='bold'
            fontSize={{ base: '2xl', md: 'md' }}
          >
            {FooterLinks.map((link, i) => (
              <NavLink key={i} title={link.title} to={link.to} />
            ))}
            {/* {isConnected && <NavLink title='My Wallet' to='/account' />} */}
          </Stack>

          <Text fontSize='sm' color='#AEAEB2'>
            &copy; {new Date().getFullYear()} Ango-ya, LLC. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </>
  );
};
