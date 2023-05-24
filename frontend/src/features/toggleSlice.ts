import { createSlice } from "@reduxjs/toolkit";
import { Toggle } from "../types";

const initialState: Toggle = {
  sort: false,
  menu: false,
  modal: false,
  search: false,
  create: false,
  user: false,
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
      state.user = false;
    },
    toggleModal: (state) => {
      state.modal = !state.modal;
      state.menu = false;
    },
    toggleSearch: (state) => {
      state.search = !state.search;
      state.menu = false;
    },
    toggleCreate: (state) => {
      state.create = !state.create;
    },
    toggleUser: (state) => {
      state.user = !state.user;
      state.menu = false;
    },
  },
});

export const {
  toggleSort,
  toggleMenu,
  toggleModal,
  toggleSearch,
  toggleCreate,
  toggleUser,
} = toggleSlice.actions;

export default toggleSlice.reducer;
