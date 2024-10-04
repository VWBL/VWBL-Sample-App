'use client';

import { Button as ChakraButton, SystemStyleObject } from '@chakra-ui/react';

const HamburgerMenu = ({ onClick, sx }: { onClick: () => void; sx: SystemStyleObject }) => (
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
export default HamburgerMenu;
