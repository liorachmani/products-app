import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Search } from "@src/components";

interface SearchState extends Search {}

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

    editCategory(state, action: PayloadAction<Search["category"]>) {
      state.category = action.payload;
    },
  },
});

export const { editFilterText, editCategory } = searchSlice.actions;
