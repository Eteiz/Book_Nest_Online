import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const initialState = {
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  isTokenChecked: false,
};

const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000;
};

const isAdmin = (token) => {
  if (!token) return false;
  const { role } = jwtDecode(token);
  return role === 'ADMIN';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isTokenChecked = false;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    clearCredentials: (state) => {
      state.token = null;
      state.user = null;
      state.isTokenChecked = true;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    checkTokenExpiration: (state) => {
      if (isTokenExpired(state.token)) {
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      state.isTokenChecked = true;
    },
    checkAdminRole: (state) => {
      state.isAdmin = isAdmin(state.token);
    },
  },
});

export const { setCredentials, clearCredentials, checkTokenExpiration, checkAdminRole } = authSlice.actions;
export default authSlice.reducer;
