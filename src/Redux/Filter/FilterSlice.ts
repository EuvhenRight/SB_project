import { RootState } from './../store';
import { SortPropertyEnum, Sort, filterValues } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: filterValues = {
  page: 1,
  perPage: 4, // Corrected property name
  sortDirection: 'asc',
  categoryId: 1, // Corrected property name
  sortBy: 'title',
};

const FilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload; // Corrected property name
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setSortDirection(state, action: PayloadAction<string>) {
      state.sortDirection = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload; // Corrected property name
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFilters(state, action: PayloadAction<filterValues>) {
      if (Object.keys(action.payload).length) {
        state.sortDirection = action.payload.sortDirection;
        state.perPage = Number(action.payload.perPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sortBy = action.payload.sortBy;
      } else {
        state.sortDirection = 'asc';
        state.perPage = 4;
        state.categoryId = 0;
        state.sortBy = 'title';
      }
    },
  },
});

export const {
  setCategoryId,
  setSortBy,
  setSortDirection,
  setPage,
  setPerPage,
} = FilterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export const FilterReducer = FilterSlice.reducer;
