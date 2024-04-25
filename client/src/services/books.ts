import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book, BookSearchAPI } from "../types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://tome-tracker.fly.dev/api" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getUserBooks: builder.query({
      query: (uid: string) => `/books/${uid}`,
      providesTags: ["Books"],
    }),

    addBook: builder.mutation<Book, Book>({
      query: (body) => {
        return {
          url: "/books",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => {
        return {
          url: `/books/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/books/${id}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
    deleteAllBooks: builder.mutation({
      query: (body) => {
        return {
          url: `/books/all`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetUserBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useDeleteAllBooksMutation,
} = bookApi;

export const bookSearchApi = createApi({
  reducerPath: "bookSearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://openlibrary.org",
  }),
  endpoints: (builder) => ({
    getBookImageURL: builder.query({
      query: ({ title, author }) => {
        const formattedTitle = title.split(" ").join("+").toLowerCase();
        const formattedAuthor = author.toLowerCase();
        return {
          url: `/search.json?title=${formattedTitle}&author=${formattedAuthor}`,
          method: "GET",
        };
      },
      transformResponse: (res: BookSearchAPI) =>
        res.docs.filter((doc) => doc.cover_i),
    }),
  }),
});

export const { useGetBookImageURLQuery } = bookSearchApi;
