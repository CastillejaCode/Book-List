import { createSlice } from "@reduxjs/toolkit";
import { Toggle } from "../types";

const initialState: Toggle = {
  sort: false,
  menu: false,
  addForm: false,
  search: false,
  create: false,
  user: false,
  resetPassword: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleSort: (state) => {
      state.sort = !state.sort;
      state.menu = false;
    },
    toggleMenu: (state) => {
      state.menu = !state.menu;
      state.sort = false;
      state.search = false;
    },
    setShowAddForm: (state, action) => {
      state.addForm = action.payload;
      state.menu = false;
    },
    toggleSearch: (state, action) => {
      state.search = action.payload;
    },
    toggleCreate: (state) => {
      state.create = !state.create;
    },
    toggleResetPassword: (state) => {
      state.resetPassword = !state.resetPassword;
    },
    toggleUser: (state) => {
      state.user = !state.user;
      state.menu = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  toggleSort,
  toggleMenu,
  setShowAddForm,
  toggleSearch,
  toggleCreate,
  toggleUser,
  toggleResetPassword,
  setUser,
} = toggleSlice.actions;

export default toggleSlice.reducer;
