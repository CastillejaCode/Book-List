import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Sort } from "../types";

const initialState: { value: Sort } = { value: "recent" };

export const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSort: (state: { value: Sort }, action: PayloadAction<Sort>) => {
      state.value = action.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;
