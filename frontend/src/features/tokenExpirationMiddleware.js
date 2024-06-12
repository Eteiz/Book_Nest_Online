import { checkTokenExpiration, clearCredentials } from './api/authSlice';

const tokenExpirationMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();
  const token = state.auth.token;

  if (token && !state.auth.isTokenChecked) {
    store.dispatch(checkTokenExpiration());
  }

  if (state.auth.token === null && action.type !== clearCredentials.type) {
    store.dispatch(clearCredentials());
  }

  return result;
};

export default tokenExpirationMiddleware;
