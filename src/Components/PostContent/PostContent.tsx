import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchPostData } from '../../Redux/Posts/PostSlice';
import PostCard from '../Card/Card';

const PostContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.posts);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPostData());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Flex alignItems="center" flexDirection={'column'}>
      <SimpleGrid columns={[1, 2]} row={2} spacing={6}>
        {data?.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
      <Button
        mt={isMobile ? 6 : 40}
        colorScheme="orange"
        variant="custom"
        borderRadius="3xl"
      >
        Load more
      </Button>
    </Flex>
  );
};

export default PostContent;
