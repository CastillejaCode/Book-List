import { configureStore } from "@reduxjs/toolkit";
import { bookApi, bookSearchApi } from "./services/books.js";
import categorizeReducer from "./slices/categorizeSlice.js";
import undoReducer from "./slices/undoSlice.js";
import searchReducer from "./slices/searchSlice.js";
import toastSlice from "./slices/toastSlice.js";

export const store = configureStore({
  reducer: {
    toast: toastSlice,
    search: searchReducer,
    undo: undoReducer,
    categorize: categorizeReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [bookSearchApi.reducerPath]: bookSearchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware, bookSearchApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
