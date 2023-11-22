import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'font-family: Carlito, sans-serif',
    heading: 'font-family: Carlito, sans-serif',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  //   components: {
  //     Card: cardTheme,
  //     Button: buttonTheme,
  //   },
});

export default theme;
