import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    black: '#090909',
  },
  fonts: {
    heading: 'En700, Ja700, sans-serif',
    body: 'En400, Ja400, sans-serif',
  },
  components: {
    Tabs: {
      baseStyle: {
        // 各 variant （variant なしを含む）共通のスタイルはここ
        tab: {
          _focus: {
            boxShadow: 'none',
          },
        },
      },
      variants: {
        // 各 variant ごとのスタイルはここ
        line: {
          tablist: {
            borderColor: 'black',
            borderBottom: '4px solid',
          },
          tab: {
            borderBottom: '6px solid',
          },
        },
      },
    },
    Badge: {
      sizes: {
        md: {
          fontSize: 'md',
        },
      },
    },
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: '#090909',
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: 'black',
          },
        },
      },
    },
  },
});
