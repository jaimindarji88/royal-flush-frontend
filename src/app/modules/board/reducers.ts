import { histogramKeys, titleize } from '../../constants';
import { GAME, GameState } from './types';

export const INITIAL_STATE: GameState = {
  board: [],
  others: [],
  player: {
    cards: [],
    stats: {}
  },
  player_count: 2,
  histogram: histogramKeys.map(hand => ({ x: 0, y: titleize(hand) }))
};

export default (state: GameState = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GAME.UPDATE_PLAYER_CARDS:
      return {
        ...state,
        player: {
          ...state.player,
          cards: action.payload
        }
      };
    case GAME.NUMBER_OF_PLAYERS:
      return {
        ...state,
        player_count: action.payload
      };
    case GAME.ADD_BOARD:
      return {
        ...state,
        game: action.payload
      };
    case GAME.ADD_OTHER_CARDS:
      return {
        ...state,
        others: [...state.others, action.payload]
      };
    case GAME.UPDATE_HISTOGRAM:
      return {
        ...state,
        histogram: action.payload
      };
    default:
      return state;
  }
};
