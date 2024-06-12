import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authorsApiSlice = createApi({
  reducerPath: 'authorsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getAuthors: builder.query({
      query: () => 'authors/getAuthors',
    }),
  }),
});

export const { useGetAuthorsQuery } = authorsApiSlice;
