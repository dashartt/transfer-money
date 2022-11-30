import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    main: {
      green: '#10c4b5',
      whitesmoke: '#fffefe',
      lightGreen: '#e2e8f0',
    },
  },
  styles: {
    global: {
      svg: {
        'font-size': '2em',
      },
      a: {
        'text-decoration': 'none',
      },
      th: {
        'text-align': 'center !important',
      },
      td: {
        'text-align': 'center !important',
      },
    },
  },
});

export default theme;
