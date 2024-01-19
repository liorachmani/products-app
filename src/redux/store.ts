import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { baseApi, productsApi } from "@redux/api";
import { combineReducers } from "@reduxjs/toolkit";
import { productsSlice, searchSlice } from "@redux/slices";

const rootReducer = combineReducers({
  [productsSlice.name]: productsSlice.reducer,
  [searchSlice.name]: searchSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
