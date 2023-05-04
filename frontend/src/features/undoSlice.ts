import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  value: {
    title: null,
    author: null,
    rating: null,
    id: null,
    date: null,
    review: null,
  },
};

export const undoSlice = createSlice({
  name: "undo",
  initialState,
  reducers: {
    saveUndo: (state, action) => {
      state.value = action.payload;
    },
    toggleUndoStatus: (state) => {
      state.status = !state.status;
    },
    setUndoStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { saveUndo, toggleUndoStatus, setUndoStatus } = undoSlice.actions;

export default undoSlice.reducer;
