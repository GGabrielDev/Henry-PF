import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import productReducer from '../features/products/productSlice'
export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

