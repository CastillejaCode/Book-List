import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/books" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "",
      providesTags: ["Books"],
    }),

    addBook: builder.mutation({
      query: (body) => {
        return {
          url: "",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
  }),
});

export const { useGetAllBooksQuery, useAddBookMutation } = bookApi;
