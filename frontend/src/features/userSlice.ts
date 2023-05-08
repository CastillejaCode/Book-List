import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { id: "" },
  reducers: {
    setUID: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setUID } = userSlice.actions;

export default userSlice.reducer;
