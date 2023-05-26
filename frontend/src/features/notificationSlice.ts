import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: { error: "", notif: "", toast: "" },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = "";
    },
    setNotif: (state, action) => {
      state.notif = action.payload;
    },
    resetNotif: (state) => {
      state.notif = "";
    },
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    resetToast: (state) => {
      state.toast = "";
    },
  },
});

export const {
  setError,
  resetError,
  setNotif,
  resetNotif,
  setToast,
  resetToast,
} = notificationSlice.actions;

export default notificationSlice.reducer;
