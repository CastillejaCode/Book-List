import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Toast {
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
    addToast: (state, action: PayloadAction<Toast>) => {
      const toast: Toast = {
        type: "notification",
        ...action.payload,
      };
      state.push(toast);
    },
    removeToast: (state) => {
      state.shift();
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
