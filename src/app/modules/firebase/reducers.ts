import { AUTH, FirebaseState } from './types';

export const INITIAL_STATE: FirebaseState = {
  user: undefined
};

export default (state: FirebaseState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AUTH.FETCH_USER:
      return {
        ...state,
        user: action.payload
      };
    case AUTH.SIGN_OUT:
      return {
        ...state,
        user: undefined
      };
    default:
      return state;
  }
};
