import { AUTH } from './types';

export interface FirebaseState {
  user: null | firebase.UserInfo;
}

export const INITIAL_STATE: FirebaseState = {
  user: null
};

export default (state: FirebaseState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case AUTH.FETCH:
      return {
        ...state,
        user: action.payload
      };
    case AUTH.SIGN_OUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};
