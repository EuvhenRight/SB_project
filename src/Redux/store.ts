import { configureStore } from '@reduxjs/toolkit';
import { PostReducer } from './PostSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    posts: PostReducer,
  },
});

export default store;
