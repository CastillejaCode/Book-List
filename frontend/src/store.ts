import { configureStore } from "@reduxjs/toolkit";
import { bookApi, bookSearchApi } from "./services/books";
import toggleReducer from "./features/toggleSlice";

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
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
