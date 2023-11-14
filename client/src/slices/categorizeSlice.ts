import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "../types";

interface Initial {
  sort: Sort;
  filter: boolean | null;
  order: boolean;
}

const initialState: Initial = {
  sort: "Title",
  filter: true,
  order: true,
};

export const categorizeSliceSlice = createSlice({
  name: "categorize",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setFilter: (state, action: PayloadAction<boolean | null>) => {
      state.filter = action.payload;
    },
    setOrder: (state, action: PayloadAction<boolean>) => {
      state.order = action.payload;
    },
  },
});

export const { setSort, setFilter, setOrder } = categorizeSliceSlice.actions;
export default categorizeSliceSlice.reducer;
