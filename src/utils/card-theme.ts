import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const postCard = definePartsStyle({
  container: {
    height: '217px',
    width: '285px',
    backgroundColor: 'white',
    _dark: {
      backgroundColor: 'gray.600',
    },
  },
  header: {
    paddingBottom: '2px',
  },
  body: {
    height: '72px',
    width: '285px',
  },
  footer: {
    padding: 0,
    margin: 0,
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
