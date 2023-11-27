import { Box, Container, SimpleGrid } from '@chakra-ui/react';
import React, { memo, useCallback, useEffect } from 'react';
import PostCard from '../../Components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '../../Redux/store';
import { fetchPostData } from '../../Redux/Posts/PostSlice';
import { PaginationInfo } from '../../Redux/types';
import Pagination from '../../Components/Pagination/Pagination';
import CategoryPopUp from '../../Components/Caregory/CategoryPopUp';
import { universalPostData } from '../../Redux/Filter/AsyncAction';
import {
  selectFilter,
  setCategoryId,
  setPage,
  setPerPage,
  setSortDirection,
} from '../../Redux/Filter/FilterSlice';
import PerPagePopUp from '../../Components/PerPage.ts/PerPage';
import FilterPopUp from '../../Components/Filter/Filter';

const Blog: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const { sortBy, sortDirection, perPage, page, categoryId } =
    useSelector(selectFilter);

  const { data } = useSelector((state: RootState) => state.posts);

  const onChangePerPage = useCallback((idx: number) => {
    dispatch(setPerPage(idx));
  }, []);

  const onChangePage = useCallback((idx: number) => {
    dispatch(setPage(idx));
  }, []);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangeDirection = useCallback((idx: string) => {
    dispatch(setSortDirection(idx));
  }, []);

  const paginationInfo: PaginationInfo = {
    current_page: data?.current_page ?? 1,
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

  const getFilterPosts = async () => {
    dispatch(
      universalPostData({
        sortBy,
        sortDirection,
        categoryId,
        page,
        perPage,
      })
    );
  };

  useEffect(() => {
    getFilterPosts();
  }, [categoryId, sortBy, sortDirection, page, perPage]);

  return (
    <Container as="main" maxW="container.lg" mt="4em" h="100vh">
      <CategoryPopUp onChangeCategory={onChangeCategory} />
      <PerPagePopUp onChangePerPage={onChangePerPage} />
      <FilterPopUp onChangeDirection={onChangeDirection} />
      <SimpleGrid columns={[1, 2, 4]} row={2} spacing={6}>
        {data?.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </SimpleGrid>
      <Box>
        <Pagination
          pageNumber={page}
          paginationInfo={paginationInfo}
          onPageChange={onChangePage}
        />
      </Box>
    </Container>
  );
});

export default Blog;
