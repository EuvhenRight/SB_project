import { format } from 'date-fns';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  PaginationInfo,
  Post,
  Category,
  FormValues,
  PostsState,
} from '../types';
import axios from 'axios';
import { AxiosError } from 'axios';

const apiKey: string = 'token';
const apiKeyValue: string = 'pj11daaQRz7zUIH56B9Z';

export const fetchPostData = createAsyncThunk<PaginationInfo>(
  'get/fetchAllPostData',
  async () => {
    const apiUrl = `https://frontend-case-api.sbdev.nl/api/posts?page=1&perPage=4&sortBy=title&sortDirection=asc&searchPhrase=yevhen&categoryId=1`;

    try {
      const response = await axios.get<PaginationInfo>(apiUrl, {
        headers: {
          [apiKey]: apiKeyValue,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCategoryData = createAsyncThunk<Category[]>(
  'get/fetchAllCategoryData',
  async () => {
    const apiUrl = `https://frontend-case-api.sbdev.nl/api/categories`;

    try {
      const response = await axios.get<Category[]>(apiUrl, {
        headers: {
          [apiKey]: apiKeyValue,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchNewPostData = createAsyncThunk<Post, FormValues>(
  'post/fetchNewPostData',
  async (formValues, { rejectWithValue }) => {
    const apiUrl = `https://frontend-case-api.sbdev.nl/api/posts`;

    try {
      const response = await axios.post<Post>(apiUrl, formValues, {
        headers: {
          [apiKey]: apiKeyValue,
          'Content-type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error: any) {
      // Use rejectWithValue to include additional data in the rejection
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

export const fetchUploadImage = createAsyncThunk<Post, string>(
  'post/fetchUploadImage',
  async (currentImage) => {
    const apiUrl = `https://frontend-case-api.sbdev.nl/storage/${currentImage}`;

    try {
      const response = await axios.get<Post>(apiUrl, {
        headers: {
          [apiKey]: apiKeyValue,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

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
