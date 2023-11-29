import {
  fetchPostData,
  fetchCategoryData,
  fetchNewPostData,
  fetchUploadImage,
} from './AsyncAction';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationInfo, Post, Category, PostsState } from '../types';
import { RootState } from '../store';

const initialState: PostsState = {
  data: null,
  categories: null,
  newPost: null,
  image: null,
  status: 'isLoading',
};

const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Posts
      .addCase(fetchPostData.pending, (state) => {
        state.status = 'isLoading';
        state.data = null;
      })
      .addCase(
        fetchPostData.fulfilled,
        (state, action: PayloadAction<PaginationInfo>) => {
          state.status = 'isSuccess';
          state.data = action.payload;
        }
      )
      .addCase(fetchPostData.rejected, (state) => {
        state.status = 'isError';
        state.data = null;
      })
      //Categories
      .addCase(fetchCategoryData.pending, (state) => {
        state.status = 'isLoading';
        state.data = null;
      })
      .addCase(
        fetchCategoryData.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.status = 'isSuccess';
        }
      )
      .addCase(fetchCategoryData.rejected, (state) => {
        state.status = 'isError';
        state.data = null;
      })
      //New Post
      .addCase(fetchNewPostData.pending, (state) => {
        state.status = 'isLoading';
        state.newPost = null;
      })
      .addCase(
        fetchNewPostData.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.newPost = action.payload;
          state.status = 'isSuccess';
        }
      )
      .addCase(fetchNewPostData.rejected, (state) => {
        state.status = 'isError';
        state.newPost = null;
      })
      //Upload Image
      .addCase(fetchUploadImage.pending, (state) => {
        state.status = 'isLoading';
        state.data = null;
      })
      .addCase(
        fetchUploadImage.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.image = action.payload;
          state.status = 'isSuccess';
        }
      )
      .addCase(fetchUploadImage.rejected, (state) => {
        state.status = 'isError';
        state.data = null;
      });
  },
});

export const PostReducer = PostSlice.reducer;

export const selectPosts = (state: RootState) => state.posts;

export const isSuccessSelector = (state: RootState) =>
  state.posts.status === 'isSuccess';
