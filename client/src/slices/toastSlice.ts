import { createSlice } from "@reduxjs/toolkit";

interface Toast {
  type?: "error" | "notification";
  message: string;
}

const initialState: Toast[] = [
  {
    type: "notification",
    message: "first",
  },
  {
    message: "second",
  },
];

export const toastSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setToast: (state, action) => {
      const toast = {
        type: "notification",
        ...action.payload,
      };
      state.push(toast);
    },
    removeToast: (state) => {
      state.shift();
    },
    resetToast: (state) => state,
  },
});

export const { removeToast, setToast, resetToast } = toastSlice.actions;

export default toastSlice.reducer;
