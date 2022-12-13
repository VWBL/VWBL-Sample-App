import { ChevronDownIcon, CheckIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, Text, MenuList, MenuItem } from '@chakra-ui/react';

type stringObject = {
  [key: string]: string;
};

type Props = {
  state: string;
  changeState: (value: string) => void;
  selectOptions: stringObject;
};

export const SortMenu: React.FC<Props> = ({ state, changeState, selectOptions }) => {
  const keys = Object.keys(selectOptions);
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontWeight='normal'
        bg='white'
        _hover={{ bg: 'white' }}
        _active={{ bg: 'white' }}
      >
        Media
      </MenuButton>
      <MenuList w={180} p={4} border='solid 1px black' borderRadius='0px' _active={{ bg: 'white' }}>
        {keys.map((key) => {
          return (
            <MenuItem
              key={key}
              pl={state === selectOptions[key] ? 0 : 6}
              gap={2}
              _hover={{ bg: 'white' }}
              _focus={{ bg: 'white' }}
              onClick={() => changeState(selectOptions[key])}
            >
              {state === selectOptions[key] && <CheckIcon fontSize={16} />}
              <Text fontWeight='bold'>{key}</Text>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
