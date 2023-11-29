import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  PaginationInfo,
  Post,
  Category,
  FormValues,
  PostsState,
} from '../types';
import axios, { AxiosError } from 'axios';

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
    } catch (error) {
      // Use rejectWithValue to include additional data in the rejection
      return rejectWithValue((error as AxiosError).response?.data);
    }
  }
);

//CORS Problem

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
