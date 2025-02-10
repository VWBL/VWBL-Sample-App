'use client';

import { Link } from '@chakra-ui/next-js';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type Props = {
  title: string;
  to: string;
  isExternal: boolean;
};

export const NavLink: React.FC<Props> = ({ title, to, isExternal }) => {
  return (
    <Link href={to} isExternal={isExternal} {...(isExternal && { rel: 'noopener noreferrer', target: '_blank' })}>
      {title} {isExternal && <ExternalLinkIcon mb='4px' mx='2px' />}
    </Link>
  );
};
