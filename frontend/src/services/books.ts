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
  useGetAllBooksQuery,
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
    getBookId: builder.query({
      query: ({ title, author }) => {
        const formattedTitle = title.split(" ").join("+").toLowerCase();
        const formattedAuthor = author.toLowerCase();
        return {
          url: `/search.json?title=${formattedTitle}&author=${formattedAuthor}`,
          method: "GET",
        };
      },
      transformResponse: (res: object) => res.docs.filter((doc) => doc.cover_i),
    }),
  }),
});

// export const bookCoverApi = createApi({
//   reducerPath: "bookCoverApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://covers.openlibrary.org",
//   }),
//   endpoints: (builder) => ({
//     getBookCover: builder.query({
//       query: ({ data, coverNumber, key, size }) => {
//         return {
//           url: `https://covers.openlibrary.org/b/${key}/${data[coverNumber].cover_i}-${size}.jpg`,
//           method: "GET",
//         };
//       },
//     }),
//   }),
// });

export const { useGetBookIdQuery } = bookSearchApi;
// export const { useGetBookCoverQuery } = bookCoverApi;
