import { createSlice } from "@reduxjs/toolkit";

export interface Toggle {
  review: boolean;
  options: boolean;
}

const initialState: Toggle = {
  review: false,
  options: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleReview: (state) => {
      state.review = !state.review;
    },
    toggleOptions: (state) => {
      state.options = !state.options;
    },
  },
});

export const { toggleReview, toggleOptions } = toggleSlice.actions;

export default toggleSlice.reducer
