import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const rentalsApiSlice = createApi({
  reducerPath: 'rentalsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    // Rents a book for given in rentalRequestData user and authorizes with token
    rentBook: builder.mutation({
      query: ({ rentalRequestData, token }) => ({
        url: 'rentals/rent',
        method: 'POST',
        body: rentalRequestData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseHandler: 'text',
      }),
    }),
    // Fetches rentals for given filteras (and optionally user) and authorizes with token
    getRentals: builder.query({
      query: ({ userEmail, rentalFilterData, token, page = 0, size = 10 }) => {
        let url = `rentals/getRentals`;
        if (userEmail) {
          url += `/${userEmail}`;
        }
        return {
          url,
          method: 'POST',
          body: rentalFilterData,
          params: { page, size },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    // Returns rentalStatuses enum in text array
    getRentalStatuses: builder.query({
      query: () => 'rentals/getRentalStatuses',
    }),
    // Returns a book for given rentalId and authorizes with token
    returnBook: builder.mutation({
      query: ({ userEmail, rentalId, token }) => ({
        url: `rentals/return/${userEmail}/${rentalId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseHandler: 'text',
      }),
    }),
  }),
});

export const { useRentBookMutation, useLazyGetRentalsQuery, useGetRentalStatusesQuery, useReturnBookMutation } =
  rentalsApiSlice;
