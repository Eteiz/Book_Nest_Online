import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: 'users/register',
        method: 'POST',
        body: userData,
        responseHandler: 'text',
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: 'users/login',
        method: 'POST',
        body: userData,
        responseHandler: 'text',
      }),
    }),
    loginAdmin: builder.mutation({
      query: (userData) => ({
        url: 'users/loginAdmin',
        method: 'POST',
        body: userData,
        responseHandler: 'text',
      }),
    }),
    getUser: builder.query({
      query: ({ userEmail, token }) => ({
        url: `users/getUser/${userEmail}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    archiveUser: builder.mutation({
      query: ({ userEmail, token }) => ({
        url: `users/archiveUser/${userEmail}`,
        method: 'DELETE',
        responseHandler: 'text',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ userEmail, userData, token }) => ({
        url: `users/updateUser/${userEmail}`,
        method: 'POST',
        body: userData,
        responseHandler: 'text',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
export const {
  useLoginAdminMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useArchiveUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
