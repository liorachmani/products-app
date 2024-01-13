import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@src/models";
import { productsApi } from "../api";

type ProductsState = {
  products: Product[];
};

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push({ ...action.payload }); // check about the id
    },

    removeProduct(state, action: PayloadAction<string>) {
      const idToRemove = action.payload;
      state.products.filter((product) => product.id !== idToRemove);
    },
  },
  extraReducers: (builder) => {
    //     builder.addMatcher(
    //       productsApi.endpoints.getAllProducts.matchPending,
    //       (state) => {
    //         state.loading = true;
    //       }
    //     );
    builder.addMatcher(
      productsApi.endpoints.getAllProducts.matchFulfilled,
      (state, action) => {
        state.products = action.payload;
        // state.loading = false;
      }
    );
    //     builder.addMatcher(
    //       productsApi.endpoints.getAllProducts.matchRejected,
    //       (state, action) => {
    //         state.error = action.payload;
    //         state.loading = false;
    //       }
    //     );
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;
