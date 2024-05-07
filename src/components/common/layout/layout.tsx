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
import { useRouter } from 'next/router';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

type Link = {
  title: string;
  to: string;
  target?: string;
};

const NavLink = ({ title, to }: Link) => {
  const isExternal = to.startsWith('https://');

  return (
    <Link as={!isExternal ? NextLink : undefined} href={to} isExternal={isExternal}>
      {title} {isExternal && <ExternalLinkIcon mx='2px' />}
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connectWallet, userAddress } = VwblContainer.useContainer();
  const router = useRouter();
  const { t } = useTranslation();

  const HeaderLinks: Link[] = [
    {
      title: t('header.nav.0'),
      to: 'https://vwbl-protocol.org/',
    },
    {
      title: t('header.nav.1'),
      to: '/create',
    },
  ];

  const FooterLinks: Link[] = [
    {
      title: t('footer.nav.0'),
      to: 'https://vwbl-protocol.org/',
    },
    {
      title: t('footer.nav.1'),
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
        <Flex
          as='header'
          h={{ base: '70px', md: '80px' }}
          alignItems={'center'}
          justifyContent={'space-between'}
          px={{ base: '0px', md: '5vw' }}
        >
          <Link href='/' as={NextLink}>
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
                <Link href='/account' as={NextLink}>
                  <Button as='a' text={t('header.myWalletButton')} borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} />
                </Link>
              </HStack>
            ) : (
              <Button text={t('header.connectButton')} borderRadius={'3xl'} icon={MdOutlineAccountBalanceWallet} onClick={connectWallet} />
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
                    <Link href='/account' as={NextLink}>
                      <Button
                        as='a'
                        text={t('moobileMenu.myWalletButton')}
                        borderRadius={'3xl'}
                        icon={MdOutlineAccountBalanceWallet}
                        height='40px'
                        isReversed
                      />
                    </Link>
                  </VStack>
                ) : (
                  <HStack>
                    <Button
                      text={t('moobileMenu.connectButton')}
                      borderRadius={'3xl'}
                      icon={MdOutlineAccountBalanceWallet}
                      onClick={connectWallet}
                      isReversed
                      height='40px'
                    />
                  </HStack>
                )}
                <Box fontSize='sm'>
                  {t('moobileMenu.notice')}
                </Box>
              </Stack>
            </VStack>
          </DrawerContent>
        </Drawer>
      </Box>

      {/* hidden element to adjust hight */}
      <Box minH='calc(100vh - 160px)'>{children}</Box>
      <Container as='footer' h={{ base: '320px', md: '100px' }} role='contentinfo' maxW='100%' borderTop='2px' px='5vw'>
        <Stack
          justifyContent={{ base: 'center', md: 'space-between' }}
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'start', md: 'center' }}
          h='100%'
        >
          <Stack
            spacing={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            fontWeight='bold'
            fontSize={{ base: '2xl', md: 'md' }}
          >
            {FooterLinks.map((link, i) => (
              <NavLink key={i} title={link.title} to={link.to} />
            ))}
            {userAddress && <NavLink title='My Wallet' to='/account' />}
          </Stack>
          <Box py={6}>
            <Text fontSize='sm' color='#AEAEB2'>
              &copy; {new Date().getFullYear()} {t('footer.copyLight')}
            </Text>
          </Box>
        </Stack>
      </Container>
    </>
  );
};
