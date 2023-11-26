import { buttonTheme } from './button-theme';
import { extendTheme } from '@chakra-ui/react';
import { cardTheme } from './card-theme';

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'gray.50',
        dark: {
          bg: 'gray.800',
        },
      },
      fonts: {
        body: 'font-family: Inter, sans-serif',
        heading: 'font-family: Inter, sans-serif',
      },
    },
  },
  sizes: {
    container: {
      lg: '1116px',
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components: {
    Button: buttonTheme,
    Card: cardTheme,
  },
});

export default theme;
