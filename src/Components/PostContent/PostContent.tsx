import { Flex, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import React, { memo } from 'react';
import PostCard from '../Card/PostCard';
import { PaginationInfo } from '../../Redux/types';

interface PostContentProps {
  data: PaginationInfo;
}

const PostContent: React.FC<PostContentProps> = memo(({ data }) => {
  const typeForPost = data?.per_page === '4' ? [1, 2, 2] : [1, 2, 2, 4];
  return (
    <Flex alignItems="center" flexDirection={'column'}>
      <SimpleGrid columns={typeForPost} spacing={6}>
        {data?.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
    </Flex>
  );
});

export default PostContent;
