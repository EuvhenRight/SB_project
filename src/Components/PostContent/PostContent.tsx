import { Flex, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import React, { memo } from 'react';
import PostCard from '../Card/PostCard';
import { PaginationInfo } from '../../Redux/types';

interface PostContentProps {
  data: PaginationInfo;
}

const PostContent: React.FC<PostContentProps> = memo(({ data }) => {
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });
  return (
    <Flex alignItems="center" flexDirection={'column'}>
      <SimpleGrid columns={isMobile ? [1, 2, 2] : [1, 2, 4]} spacing={6}>
        {data?.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
    </Flex>
  );
});

export default PostContent;
