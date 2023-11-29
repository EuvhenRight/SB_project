import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationInfo, filterValues } from '../types';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const apiKeyValue = process.env.REACT_APP_API_KEY_VALUE;

export const universalPostData = createAsyncThunk<PaginationInfo, filterValues>(
  'get/fetchAllPostData',
  async (params) => {
    const {
      page,
      perPage,
      sortBy,
      sortDirection,
      categoryId,
      searchPhrase,
    } = params;
    const apiUrl = `https://frontend-case-api.sbdev.nl/api/posts?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortDirection=${sortDirection}&searchPhrase=${searchPhrase}&categoryId=${categoryId}`;

    try {
      const response = await axios.get<PaginationInfo>(apiUrl, {
        headers: {
          [apiKey!]: apiKeyValue,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const homePostData = createAsyncThunk<PaginationInfo, number>(
  'get/fetchAllPostData',
  async (page) => {
    const apiUrl = `https://frontend-case-api.sbdev.nl/api/posts?page=${page}&perPage=4&sortDirection=desc`;

    try {
      const response = await axios.get<PaginationInfo>(apiUrl, {
        headers: {
          [apiKey!]: apiKeyValue,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
