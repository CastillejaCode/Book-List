import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { credential: null },
  reducers: {
    setCredential: (state, action) => {
      state.credential = action.payload;
    },
    resetCredential: (state) => {
      state.credential = null;
    },
  },
});

export const { setCredential, resetCredential } = userSlice.actions;

export default userSlice.reducer;
