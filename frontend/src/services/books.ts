import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "books",
      providesTags: ["Books"],
    }),

    addBook: builder.mutation({
      query: (body) => {
        return {
          url: "books",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => {
        return {
          url: "books",
          method: "DELETE",
          body: id,
        };
      },
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useAddBookMutation,
  useDeleteBookMutation,
} = bookApi;
