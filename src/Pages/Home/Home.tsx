import { Box, Container, Heading, Highlight } from '@chakra-ui/react';
import React from 'react';

export default function Home() {
  return (
    <Container as="main" maxW="container.xl">
      <Box
        my={6}
        bgImage={`url('${process.env.PUBLIC_URL}/main_picture.jpeg')`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        width="100%"
        height="100vh"
        borderRadius="10px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Heading
          as="h1"
          color="orange.600"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
          fontSize="9xl"
        >
          Hi Everyone!
        </Heading>
      </Box>
    </Container>
  );
}
