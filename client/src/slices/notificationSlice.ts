import { createSlice } from "@reduxjs/toolkit";

interface Toast {
  message: string;
  type: "error" | "notification";
}

const initialState: Toast = {
  message: "",
  type: "notification",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setToast: (state, action) => action.payload,
    resetToast: (state) => {
      state.message = "";
    },
  },
});

export const { setToast, resetToast } = notificationSlice.actions;

export default notificationSlice.reducer;
