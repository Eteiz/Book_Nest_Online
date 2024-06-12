import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApiSlice } from './features/api/usersApiSlice';
import { authorsApiSlice } from './features/api/authorsApiSlice';
import { bookTypesApiSlice } from './features/api/bookTypesApiSlice';
import { categoriesApiSlice } from './features/api/categoriesApiSlice';
import { booksApiSlice } from './features/api/booksApiSlice';
import authReducer from './features/api/authSlice';
import tokenExpirationMiddleware from './features/tokenExpirationMiddleware';
import { rentalsApiSlice } from './features/api/rentalsApiSlice';

export const store = configureStore({
  reducer: {
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [authorsApiSlice.reducerPath]: authorsApiSlice.reducer,
    [bookTypesApiSlice.reducerPath]: bookTypesApiSlice.reducer,
    [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
    [booksApiSlice.reducerPath]: booksApiSlice.reducer,
    [rentalsApiSlice.reducerPath]: rentalsApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tokenExpirationMiddleware,
      usersApiSlice.middleware,
      authorsApiSlice.middleware,
      bookTypesApiSlice.middleware,
      categoriesApiSlice.middleware,
      booksApiSlice.middleware,
      rentalsApiSlice.middleware,
    ),
});

setupListeners(store.dispatch);
export default store;
