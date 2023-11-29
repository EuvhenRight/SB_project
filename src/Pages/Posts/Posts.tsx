import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Spinner,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostForm from '../../Components/FormikForm/PostForm';
import PostContent from '../../Components/PostContent/PostContent';
import { homePostData } from '../../Redux/Filter/AsyncAction';
import { RootState, useAppDispatch } from '../../Redux/store';

const Posts: React.FC = memo(() => {
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.posts);
  const [page, setPage] = useState(1);

  const onChangePage = useCallback((newPage: number) => {
    dispatch(homePostData(newPage));
    setPage(newPage);
  }, []);

  const handleNewPost = async () => {
    await dispatch(homePostData(1));
  };

  useEffect(() => {
    if (isOpen) {
      handleNewPost();
    } else {
      onChangePage(page);
    }
  }, [isOpen, page, onChangePage]);

  return (
    <Container as="main" maxW="container.lg" my={16}>
      <Grid
        gap={6}
        templateAreas={isMobile ? '"form" "post"' : '"form post"'}
        templateColumns={isMobile ? '1fr' : '500px 600px'}
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
                onClick={() => setIsOpen(false)}
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
          justifyContent={'space-between'}
          alignItems={'center'}
          flexDirection={'column'}
          area="post"
        >
          {!data ? <Spinner /> : <PostContent data={data} />}
          <Button
            mt={isMobile ? 6 : 40}
            colorScheme="orange"
            variant="custom"
            borderRadius="3xl"
            onClick={() => onChangePage(page + 1)}
          >
            Load more
          </Button>
        </GridItem>
      </Grid>
    </Container>
  );
});

export default Posts;
