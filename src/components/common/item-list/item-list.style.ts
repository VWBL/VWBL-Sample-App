export const style = {
  wrapItem: {
    borderBottom: '4px black solid',
    margin: '15px 0',
    padding: 15,
  },
  wrapper: {
    '@media (max-width: 674px)': {
      'li:nth-of-type(n)': {
        padding: '15px 0 !important',
      },
      'li:nth-of-type(n + 1):nth-last-of-type(-n + 1),li:nth-of-type(n + 1):nth-last-of-type(-n + 1) ~ li': {
        borderBottom: 'none !important',
      },
    },
    '@media (min-width: 675px) and (max-width: 1004px)': {
      'li:nth-of-type(2n-1)': {
        paddingLeft: '0 !important',
      },
      'li:nth-of-type(2n)': {
        paddingRight: '0 !important',
      },
      'li:nth-of-type(2n + 1):nth-last-of-type(-n + 2),li:nth-of-type(2n + 1):nth-last-of-type(-n + 2) ~ li': {
        borderBottom: 'none !important',
      },
    },
    '@media (min-width: 1005px)': {
      'li:nth-of-type(3n-2)': {
        paddingLeft: '0 !important',
      },
      'li:nth-of-type(3n)': {
        paddingRight: '0 !important',
      },
      'li:nth-of-type(3n + 1):nth-last-of-type(-n + 3),li:nth-of-type(3n + 1):nth-last-of-type(-n + 3) ~ li': {
        borderBottom: 'none !important',
      },
    },
  },
};
