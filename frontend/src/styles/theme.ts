import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    main: {
      green: '#10c4b5',
    },
  },
  styles: {
    global: {
      a: {
        'text-decoration': 'none',
      },
    },
  },
});

export default theme;
