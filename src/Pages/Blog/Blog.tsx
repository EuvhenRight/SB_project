import {
  Box,
  Container,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '../../Redux/store';
import { PaginationInfo } from '../../Redux/types';
import { universalPostData } from '../../Redux/Filter/AsyncAction';
import {
  selectFilter,
  setCategoryId,
  setPage,
  setPerPage,
  setSearchPhrase,
  setSortDirection,
} from '../../Redux/Filter/FilterSlice';
import FilterPopUp from '../../Components/Filter/Filter';
import Pagination from '../../Components/Pagination/PaginationPrime';
import PostContent from '../../Components/PostContent/PostContent';

const Blog: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const {
    sortBy,
    sortDirection,
    perPage,
    page,
    categoryId,
    searchPhrase,
  } = useSelector(selectFilter);
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

  const onChangeSearchPhrase = useCallback((idx: string) => {
    dispatch(setSearchPhrase(idx));
    console.log(idx);
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
        searchPhrase,
      })
    );
  };

  useEffect(() => {
    getFilterPosts();
  }, [categoryId, sortBy, sortDirection, page, perPage, searchPhrase]);

  console.log(data, 'data');

  return (
    <Container
      as="main"
      maxW="container.lg"
      mt={6}
      boxSizing="border-box"
      display="flex"
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      h="100%"
    >
      <Flex m={4} w="50%">
        <FilterPopUp
          onChangeCategory={onChangeCategory}
          onChangePerPage={onChangePerPage}
          onChangeDirection={onChangeDirection}
          onChangeSearchPhrase={onChangeSearchPhrase}
        />
      </Flex>
      <Box
        minH="calc(100vh - 4rem)"
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
      >
        {data && data?.data.length > 0 ? (
          <>
            <PostContent data={data} />
            <Flex my={6} justify={'center'} height="4rem">
              <Pagination
                perPage={perPage}
                pageNumber={page}
                paginationInfo={paginationInfo}
                onPageChange={onChangePage}
              />
            </Flex>
          </>
        ) : data && data?.data.length === 0 ? (
          <Text>No posts found :(</Text>
        ) : (
          <Spinner emptyColor="gray.200" color="orange.600" size="xl" />
        )}
      </Box>
    </Container>
  );
});

export default Blog;
