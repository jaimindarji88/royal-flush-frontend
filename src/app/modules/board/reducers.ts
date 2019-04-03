import { BOARD, BoardState } from './types';

export const INITIAL_STATE: BoardState = {
  board: undefined,
  others: [],
  player: {
    cards: [],
    stats: {}
  },
  player_count: 2
};

export default (state: BoardState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case BOARD.ADD_PLAYER_CARDS:
      return {
        ...state,
        user: {
          ...state.player,
          cards: action.payload
        }
      };
    case BOARD.NUMBER_OF_PLAYERS:
      return {
        ...state,
        player_count: action.payload
      };
    case BOARD.ADD_BOARD:
      return {
        ...state,
        board: action.payload
      };
    case BOARD.ADD_OTHER_CARDS:
      return {
        ...state,
        others: [...state.others, action.payload]
      };
    default:
      return state;
  }
};