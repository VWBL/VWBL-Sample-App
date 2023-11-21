import { useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  VStack,
  useDisclosure,
  Stack,
  Container,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  Button as ChakraButton,
  CSSObject,
  Image,
} from '@chakra-ui/react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { VwblContainer } from '../../../container/vwbl-container';
import { Button } from '../button';
import { hamburgerMenu, closeButton } from './layout.style';
import { useRouter } from 'next/router';

type Link = {
  title: string;
  to: string;
  target?: string;
};

const NavLink = ({ title, to, target }: Link) => (
  <Link href={to} passHref>
    <ChakraLink
      rounded={'md'}
      _hover={{
        opacity: 0.7,
      }}
      _focus={{
        boxShadow: 'none',
      }}
      target={target}
      rel='noopener noreferrer'
    >
      <HStack>
        {target === '_blank' && <BsBoxArrowUpRight />}
        <Text>{title}</Text>
      </HStack>
    </ChakraLink>
  </Link>
);

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connectWallet, userAddress } = VwblContainer.useContainer();
  const router = useRouter();

  const HeaderLinks: Link[] = [
    {
      title: 'Explore',
      to: 'https://vwbl-protocol.org/',
      target: '_blank',
    },
    {
      title: 'Create',
      to: '/create',
    },
  ];

  const FooterLinks: Link[] = [
    {
      title: 'Explore',
      to: 'https://vwbl-protocol.org/',
      target: '_blank',
    },
    {
      title: 'Create',
      to: '/create',
    },
  ];

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    onClose();
  }, [router]);

  return (
    <>
      <Box px={8}>
        <Flex h='76px' alignItems={'center'} justifyContent={'space-between'} mx='auto' maxW={{ md: '80%' }}>
          <Link href='/' passHref>
            <Image src='/header-logo.svg' alt='VWBL Sample App' h={7} />
          </Link>
          <HStack />
          <HamburgerMenu onClick={onOpen} sx={hamburgerMenu} />

          <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
            <HStack as={'nav'} spacing={6} mr={6}>
              {HeaderLinks.map((link, i) => (
                <NavLink key={i} title={link.title} to={link.to} target={link.target} />
              ))}
            </HStack>
            {userAddress ? (
              <HStack spacing={6}>
                <Link href='/account' passHref>
                  <Button as='a' text='My Wallet' borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} />
                </Link>
              </HStack>
            ) : (
              <Button text='Connect Wallet' borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} onClick={connectWallet} />
            )}
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
                {userAddress ? (
                  <VStack spacing={6} alignItems='start'>
                    <Link href='/account' passHref>
                      <Button as='a' text='My Wallet' borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} isReversed fontSize='2xl' />
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
                      fontSize='2xl'
                    />
                  </HStack>
                )}
                <Box fontSize='sm'>＊pcの方はmetamask chrome extention、mobileの方はmetamask appをご利用ください。</Box>
              </Stack>
            </VStack>
          </DrawerContent>
        </Drawer>
      </Box>

      {/* hidden element to adjust hight */}
      <Box minH='calc(100vh - 160px)'>{children}</Box>

      <Container as='footer' h={{ base: '320px', md: '100px' }} role='contentinfo' px={{ base: '10vw' }} maxW='100%' borderTop='2px'>
        <Stack
          justifyContent={{ base: 'center', md: 'space-between' }}
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'start', md: 'center' }}
          h='100%'
        >
          <Stack spacing={6} direction={{ base: 'column', md: 'row' }} fontWeight='bold' fontSize={{ base: '3xl', md: 'sm' }}>
            {FooterLinks.map((link, i) => (
              <NavLink key={i} title={link.title} to={link.to} />
            ))}
            {userAddress && <NavLink title='My Wallet' to='/account' />}
          </Stack>
          <Box py={6}>
            <Text fontSize='sm' color='#AEAEB2'>
              &copy; {new Date().getFullYear()} Ango-ya, LLC. All rights reserved.
            </Text>
          </Box>
        </Stack>
      </Container>
    </>
  );
};
