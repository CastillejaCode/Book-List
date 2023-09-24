import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "../types";

interface Initial {
  value: Sort;
  filter: { read: boolean | null };
}

const initialState: Initial = {
  value: "recent",
  filter: { read: true },
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort: (state: { value: Sort }, action: PayloadAction<Sort>) => {
      state.value = action.payload;
    },
    setRead: (state, action: PayloadAction<boolean | null>) => {
      state.filter.read = action.payload;
    },
  },
});

export const { setSort, setRead } = sortSlice.actions;
export default sortSlice.reducer;
