import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookTypesApiSlice = createApi({
  reducerPath: 'bookTypesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getBookTypes: builder.query({
      query: () => 'bookTypes/getBookTypes',
    }),
  }),
});

export const { useGetBookTypesQuery } = bookTypesApiSlice;
