import { Button, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type Props = {
  title: string;
  icon?: IconType;
  action?: (() => Promise<void>) | (() => void);
  linkTo?: string;
};

export const GradationButton: React.FC<Props> = ({ title, icon, action }) => {
  return (
    <Button bgGradient='linear(277.14deg, #D5F7F7 3.97%, #1A84B4 47.98%, #004097 100%)' color='white' display='flex' onClick={action}>
      <Icon as={icon} mr={2} />
      {title}
    </Button>
  );
};
