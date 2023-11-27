import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const postCard = definePartsStyle({
  container: {
    height: '217px',
    width: '261px',
    borderRadius: 'none',
    backgroundColor: 'white',
    _dark: {
      backgroundColor: 'gray.600',
    },
  },
  header: {},
  body: { overflowY: 'scroll' },
  footer: {
    p: 4,
    m: 0,
    height: '72px',
  },
});

const sizes = {
  md: postCard,
};

export const cardTheme = defineMultiStyleConfig({
  sizes,
  variants: {
    custom: postCard,
  },
});
