import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductsSearch } from "@src/components";

interface SearchState extends ProductsSearch {}

const initialState: SearchState = {
  category: "name",
  filterText: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    editFilterText(state, action: PayloadAction<string>) {
      state.filterText = action.payload;
    },

    editCategory(state, action: PayloadAction<ProductsSearch["category"]>) {
      state.category = action.payload;
    },
  },
});

export const { editFilterText, editCategory } = searchSlice.actions;
