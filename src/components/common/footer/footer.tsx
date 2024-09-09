'use client';

import { Flex, Stack, Container, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { VwblContainer } from '../../../container';

const NavLink = ({ title, to }: { title: string; to: string }) => <Link href={to}>{title}</Link>;

const Footer: React.FC = () => {
  const { vwbl } = VwblContainer.useContainer();

  const FooterLinks = [
    { title: 'Explore', to: 'https://vwbl-protocol.org/' },
    { title: 'Create', to: '/create' },
    { title: 'Receive', to: '/receive' },
  ];

  return (
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
        {FooterLinks.map((link, i) => (
          <Link key={i} title={link.title} href={link.to} />
        ))}
        <Stack
          spacing={{ base: 4, md: 6 }}
          direction={{ base: 'column', md: 'row' }}
          pb={{ base: 8, md: 0 }}
          fontWeight='bold'
          fontSize={{ base: '2xl', md: 'md' }}
        >
          {FooterLinks.map((link, i) => (
            <Link key={i} title={link.title} href={link.to} />
          ))}
          {vwbl && <NavLink title='My Wallet' to='/account' />}
        </Stack>

        <Text fontSize='sm' color='#AEAEB2'>
          &copy; {new Date().getFullYear()} Ango-ya, LLC. All rights reserved.
        </Text>
      </Flex>
    </Container>
  );
};

export default Footer;
