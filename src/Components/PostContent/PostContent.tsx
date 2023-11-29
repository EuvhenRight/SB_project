import {
  Flex,
  SimpleGrid,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { memo, useEffect } from 'react';
import PostCard from '../Card/Card';
import { PaginationInfo } from '../../Redux/types';

interface PostContentProps {
  data: PaginationInfo
}

const PostContent: React.FC<PostContentProps> = memo(({data}) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex alignItems="center" flexDirection={'column'}>
      <SimpleGrid columns={[1, null, 2]} row={2} spacing={6}>
        {data?.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
    </Flex>
  );
});

export default PostContent;
