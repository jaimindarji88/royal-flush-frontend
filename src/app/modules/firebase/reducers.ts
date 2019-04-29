import { FIREBASE, FirebaseState } from './types';

export const INITIAL_STATE: FirebaseState = {
  user: undefined,
  key: undefined,
  games: []
};

export default (state: FirebaseState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FIREBASE.FETCH_USER:
      return {
        ...state,
        user: action.payload
      };
    case FIREBASE.SIGN_OUT:
      return {
        ...state,
        user: undefined
      };
    case FIREBASE.UPDATE_KEY:
      return {
        ...state,
        key: action.payload
      };
    case FIREBASE.UPDATE_GAMES:
      return {
        ...state,
        games: action.payload
      };
    default:
      return state;
  }
};
