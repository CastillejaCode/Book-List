import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book } from "../types";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], void>({
      query: () => "/books",
      providesTags: ["Books"],
    }),

    addBook: builder.mutation({
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
  }),
});

export const {
  useGetAllBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
} = bookApi;

export const bookSearchApi = createApi({
  reducerPath: "bookSearchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://openlibrary.org/search.json",
  }),
  endpoints: (builder) => ({
    getBookId: builder.query({
      query: (title: string) => {
        const formattedTitle = title.split(" ").join("+").toLowerCase();
        return {
          url: `?title=${formattedTitle}`,
          method: "GET",
        };
      },
      transformResponse: (response: any) => response.docs[0].cover_i,
    }),
  }),
});

export const { useGetBookIdQuery } = bookSearchApi;
