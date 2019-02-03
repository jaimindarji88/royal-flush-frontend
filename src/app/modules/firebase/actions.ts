import { AUTH, AuthMap } from './types';

export const authLogin = (payload: AuthMap) => ({
  payload,
  type: AUTH.LOGIN
});
export const authLogout = () => ({ type: AUTH.LOGOUT });
export const authError = () => ({ type: AUTH.ERROR });
