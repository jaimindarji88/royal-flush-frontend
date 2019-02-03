import { AUTH, AuthState } from './types';

export function authReducer(state: AuthState = {}, action: any) {
  switch (action.type) {
    case AUTH.LOGIN: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
