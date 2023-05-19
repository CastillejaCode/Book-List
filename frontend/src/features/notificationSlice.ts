import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: { error: "", notif: "" },
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
  },
});

export const { setError, resetError, setNotif, resetNotif } =
  notificationSlice.actions;

export default notificationSlice.reducer;
