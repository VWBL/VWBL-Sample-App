'use client';

import { Flex, Stack, Container, Text } from '@chakra-ui/react';
import { VwblContainer } from '../../../container';
import { NavLink } from '../nav-link';

const Footer: React.FC = () => {
  const { vwbl } = VwblContainer.useContainer();

  const FooterLinks = [
    { title: 'Explore', to: 'https://vwbl-protocol.org/', isExternal: true },
    { title: 'Create', to: '/create', isExternal: false },
    { title: 'Receive', to: '/receive', isExternal: false },
  ];

  return (
    <Container
      as='footer'
      pt={{ base: 8, md: 10 }}
      pb={{ base: 6, md: 10 }}
      px={{ base: 6, md: 8 }}
      role='contentinfo'
      maxW='100%'
      borderTop='2px'
    >
      <Flex
        justifyContent={{ base: 'center', md: 'space-between' }}
        direction={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'start', md: 'center' }}
        h='100%'
        w='100%'
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
            <NavLink key={i} title={link.title} to={link.to} isExternal={link.isExternal} />
          ))}
          {vwbl && <NavLink title='My Wallet' to='/account' isExternal={false} />}
        </Stack>
        <Text fontSize='sm' color='#AEAEB2'>
          &copy; {new Date().getFullYear()} Ango-ya, LLC. All rights reserved.
        </Text>
      </Flex>
    </Container>
  );
};

export default Footer;
