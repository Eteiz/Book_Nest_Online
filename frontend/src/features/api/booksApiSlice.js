import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const booksApiSlice = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ bookFilterData, page = 0, size = 10 }) => ({
        url: 'books/getBooks',
        method: 'POST',
        body: bookFilterData,
        params: { page, size },
      }),
    }),
    getBook: builder.query({
      query: (bookId) => `books/getBook/${bookId}`,
    }),
    createBook: builder.mutation({
      query: ({ bookData, token }) => ({
        url: 'books/addBook',
        method: 'POST',
        body: bookData,
        responseHandler: 'text',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    withdrawnBook: builder.mutation({
      query: ({ bookId, token }) => ({
        url: `books/withdrawnBook/${bookId}`,
        method: 'DELETE',
        responseHandler: 'text',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useLazyGetBooksQuery, useLazyGetBookQuery, useCreateBookMutation, useWithdrawnBookMutation } =
  booksApiSlice;
