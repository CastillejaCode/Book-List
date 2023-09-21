import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { credential: null, verification: false },
  reducers: {
    setCredential: (state, action) => {
      state.credential = action.payload;
    },
    resetCredential: (state) => {
      state.credential = null;
    },
    setVerification: (state, action) => {
      state.verification = action.payload;
    },
  },
});

export const { setCredential, resetCredential, setVerification } =
  userSlice.actions;

export default userSlice.reducer;
