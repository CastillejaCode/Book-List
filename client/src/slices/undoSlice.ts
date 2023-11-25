import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "src/types";

interface InitalState {
  value: Book | null;
}

const initialState: InitalState = {
  value: null,
};

export const undoSlice = createSlice({
  name: "undo",
  initialState,
  reducers: {
    saveUndo: (state, action: PayloadAction<Book | null>) => {
      state.value = action.payload;
    },
  },
});

export const { saveUndo } = undoSlice.actions;

export default undoSlice.reducer;
