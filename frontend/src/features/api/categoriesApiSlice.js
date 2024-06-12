import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApiSlice = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => 'categories/getCategories',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;
