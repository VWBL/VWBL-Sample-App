import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* Roboto */
      @font-face {
        font-family: 'En700';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/Roboto/Roboto-Bold.ttf') format('ttf')
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* Roboto */
      @font-face {
        font-family: 'En400';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/Roboto/Roboto-Regular.ttf') format('ttf')
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
       /* KintoSans */
      @font-face {
        font-family: 'Ja700';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/KintoSans/KintoSans-Bold.woff2') format('woff2')
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* KintoSans */
      @font-face {
        font-family: 'Ja400';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/KintoSans/KintoSans-Regular.woff2') format('woff2')
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `}
  />
);

export default Fonts;
