import { createSlice } from "@reduxjs/toolkit";

export interface Toggle {
  review: boolean;
  options: boolean;
  sort: boolean;
  menu: boolean;
  modal: boolean;
  search: boolean;
}

const initialState: Toggle = {
  review: false,
  options: false,
  sort: false,
  menu: false,
  modal: false,
  search: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleReview: (state) => {
      state.review = !state.review;
      state.sort = state.menu = false;
    },
    toggleOptions: (state) => {
      state.options = !state.options;
      state.sort = state.menu = false;
    },
    toggleSort: (state) => {
      state.sort = !state.sort;
      state.menu = false;
    },
    toggleMenu: (state) => {
      state.menu = !state.menu;
      state.sort = false;
      state.search = false;
    },
    toggleModal: (state) => {
      state.modal = !state.modal;
      state.menu = false;
    },
    toggleSearch: (state) => {
      state.search = !state.search;
      state.menu = false;
    },
  },
});

export const {
  toggleReview,
  toggleOptions,
  toggleSort,
  toggleMenu,
  toggleModal,
  toggleSearch,
} = toggleSlice.actions;

export default toggleSlice.reducer;
