import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { id: "", name: "" },
  reducers: {
    setUID: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setUID, setName } = userSlice.actions;

export default userSlice.reducer;
