import { createSlice } from "@reduxjs/toolkit";

interface Toast {
  type: "error" | "notification";
  message: string;
}

const initialState: Toast = {
  type: "notification",
  message: "",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setToast: (state, action) => {
      const { type, message } = action.payload;
      return (state = {
        type: type ?? "notification",
        message,
      });
    },
    resetToast: (state) => {
      state.message = "";
    },
  },
});

export const { setToast, resetToast } = notificationSlice.actions;

export default notificationSlice.reducer;
