export const hamburgerMenu = {
  span: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: 'black',
    borderRadius: '4px',
  },
  'span:nth-of-type(1)': {
    top: 0,
  },
  'span:nth-of-type(2)': {
    top: '10px',
  },
};

export const closeButton = {
  span: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: 'white',
    borderRadius: '4px',
  },
  'span:nth-of-type(1)': {
    top: 0,
    transform: 'translateY(5px) rotate(-15deg)',
  },
  'span:nth-of-type(2)': {
    top: '10px',
    transform: 'translateY(-5px) rotate(15deg)',
  },
};
