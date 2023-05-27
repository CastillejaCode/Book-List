import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "../types";

interface Initial {
  value: Sort;
  filter: { read: boolean; notRead: boolean };
}

const initialState: Initial = {
  value: "recent",
  filter: { read: true, notRead: false },
};

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort: (state: { value: Sort }, action: PayloadAction<Sort>) => {
      state.value = action.payload;
    },
    toggleRead: (state) => {
      state.filter.read = !state.filter.read;
    },
    toggleNotRead: (state) => {
      state.filter.notRead = !state.filter.notRead;
    },
  },
});

export const { setSort, toggleRead, toggleNotRead } = sortSlice.actions;
export default sortSlice.reducer;
