import { ChevronDownIcon, CheckIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, Text, MenuList, MenuItem } from '@chakra-ui/react';

type stringObject = {
  [key: string]: string;
};

type Props = {
  name: string;
  sortType: string;
  changeSortType: (value: string) => void;
  typeOptions: stringObject;
};

export const SortMenu: React.FC<Props> = ({ name, sortType, changeSortType, typeOptions }) => {
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
        {name}
      </MenuButton>
      <MenuList w={180} p={4} border='solid 1px black' borderRadius='0px' _active={{ bg: 'white' }}>
        {Object.keys(typeOptions).map((key) => {
          return (
            <MenuItem
              key={key}
              pl={sortType === typeOptions[key] ? 0 : 6}
              gap={2}
              _hover={{ bg: 'white' }}
              _focus={{ bg: 'white' }}
              onClick={() => {
                changeSortType(typeOptions[key]);
              }}
            >
              {sortType === typeOptions[key] && <CheckIcon fontSize={16} />}
              <Text fontWeight='bold'>{key}</Text>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
