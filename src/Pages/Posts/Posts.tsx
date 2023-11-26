import {
  Container,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import React from 'react';
import PostForm from '../../Components/FormikForm/PostForm';
import PostContent from '../../Components/PostContent/PostContent';

const Posts = () => {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, lg: true });
  return (
    <Container as="main" maxW="container.lg" my={16}>
      <Grid
        gap={6}
        templateAreas={isMobile ? '"form" "post"' : '"form post"'}
        templateColumns={isMobile ? '1fr' : '450px 650px'}
      >
        <GridItem
          colSpan={isMobile ? 1 : 1}
          rowSpan={isMobile ? 1 : 2}
          as={'section'}
          fontSize="lg"
          fontWeight="bold"
          p={6}
          area="form"
          bgColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
        >
          Write the Post
          <PostForm />
        </GridItem>
        <GridItem
          colSpan={isMobile ? 1 : 2}
          as={'section'}
          p={6}
          bgColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          area="post"
        >
          <PostContent />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Posts;
