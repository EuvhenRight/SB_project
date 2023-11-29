import { Container, Text } from '@chakra-ui/react';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Container
      as={'footer'}
      maxW="full"
      h="32px"
      display={'flex'}
      justifyContent={'center'}
      bg={'#262626'}
      mt={12}
    >
      <Text color={'white'}>Copyright Social Brothers - 2023</Text>
    </Container>
  );
};

export default Footer;
