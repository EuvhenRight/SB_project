import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { PostReducer } from './Posts/PostSlice';
import { FilterReducer } from './Filter/FilterSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const store = configureStore({
  reducer: {
    posts: PostReducer,
    filter: FilterReducer,
  },
});

export default store;
