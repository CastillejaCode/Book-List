import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: { value: "" },
  reducers: {
    setError: (state, action) => {
      state.value = action.payload;
    },
    resetError: (state) => {
      state.value = "";
    },
  },
});

export const { setError, resetError } = errorSlice.actions;

export default errorSlice.reducer;
