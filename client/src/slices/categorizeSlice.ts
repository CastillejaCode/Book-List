import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Filter, Order, Sort } from "../types";

interface Initial {
  sort: Sort;
  filter: Filter;
  order: Order;
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
