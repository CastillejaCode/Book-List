import { configureStore } from "@reduxjs/toolkit";
import { bookApi, bookSearchApi } from "./services/books";

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, bookSearchApi.middleware),
});
