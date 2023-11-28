import { createSlice } from "@reduxjs/toolkit";

interface Toast {
  type?: "error" | "notification";
  message: string;
}

const initialState: Toast = {
  type: "notification",
  message: "",
};

export const toastSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setToast: (_state, action) => {
      return {
        type: "notification",
        ...action.payload,
      };
    },
    resetToast: (state) => {
      state.message = "";
    },
  },
});

export const { setToast, resetToast } = toastSlice.actions;

export default toastSlice.reducer;
