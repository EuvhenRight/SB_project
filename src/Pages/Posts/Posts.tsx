import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import React, { memo, useEffect } from 'react';
import PostForm from '../../Components/FormikForm/PostForm';
import PostContent from '../../Components/PostContent/PostContent';

const Posts: React.FC = memo(() => {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Container as="main" maxW="container.lg" my={16}>
      <Grid
        gap={6}
        templateAreas={isMobile ? '"form" "post"' : '"form post"'}
        templateColumns={isMobile ? '1fr' : '450px 650px'}
      >
        {isOpen === true ? (
          <>
            <GridItem
              colSpan={isMobile ? 1 : 1}
              rowSpan={isMobile ? 1 : 2}
              as={'section'}
              fontSize="lg"
              fontWeight="bold"
              p={6}
              area="form"
              bgColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Heading as="h1" textAlign={'center'}>
                New post created successfully!
              </Heading>
              <Button
                colorScheme="orange"
                variant="custom"
                mt={6}
                onClick={() => setIsOpen(!isOpen)}
              >
                Create new post
              </Button>
            </GridItem>
          </>
        ) : (
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
            <PostForm setIsOpen={setIsOpen} isOpen={isOpen} />
          </GridItem>
        )}
        <GridItem
          colSpan={isMobile ? 1 : 1}
          rowSpan={isMobile ? 1 : 2}
          as={'section'}
          p={6}
          bgColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'flex-end'}
          area="post"
        >
          <PostContent />
        </GridItem>
      </Grid>
    </Container>
  );
});

export default Posts;
