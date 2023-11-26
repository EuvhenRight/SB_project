import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PostCard from '../../Components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchPostData, PaginationInfo } from '../../Redux/PostSlice';
import Pagination from '../../Components/Pagination/Pagination';

const Blog: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);

  const paginationInfo: PaginationInfo = {
    current_page: currentPage ?? 1,
    data: data?.data ?? [],
    last_page: data?.last_page ?? 0,
    next_page_url: data?.next_page_url ?? null,
    prev_page_url: data?.prev_page_url ?? null,
    total: data?.total ?? 0,
    first_page_url: data?.first_page_url ?? '',
    last_page_url: data?.last_page_url ?? '',
    from: data?.from ?? 0,
    to: data?.to ?? 0,
    links: data?.links ?? [],
    path: data?.path ?? '',
    per_page: data?.per_page ?? '',
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    // Dispatch the action with the new page number
    dispatch(fetchPostData(pageNumber));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPostData(1));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Container as="main" maxW="container.lg" mt="4em">
      <SimpleGrid columns={[1, 2, 4]} row={2} spacing={10}>
        {data?.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
      <Box>
        <Pagination
          paginationInfo={paginationInfo}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default Blog;
