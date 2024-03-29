import { FIREBASE, FirebaseState } from './types';

export const INITIAL_STATE: FirebaseState = {
  user: undefined,
  key: undefined,
  games: [],
  newGame: false
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
    case FIREBASE.ADD_GAME:
      return {
        ...state,
        games: state.games.map(game => {
          if (game.id === action.payload.id) {
            return {
              ...game,
              ...action.payload
            };
          }
          return game;
        })
      };
    case FIREBASE.TOGGLE_NEW_GAME:
      return {
        ...state,
        newGame: !state.newGame
      };
    case FIREBASE.NEW_GAME_TRUE:
      return {
        ...state,
        newGame: true
      };
    case FIREBASE.NEW_GAME_FALSE:
      return {
        ...state,
        newGame: false
      };
    default:
      return state;
  }
};
