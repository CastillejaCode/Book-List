import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.value = action.payload;
    },
    resetSearch: (state) => {
      state.value = "";
    },
  },
});

export const { setSearch, resetSearch } = searchSlice.actions;

export default searchSlice.reducer;
