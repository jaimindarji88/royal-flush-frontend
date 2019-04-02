import { Dispatch } from 'redux';
import { BOARD } from './types';

export const addPlayerCards = (cards: string) => (dispatch: Dispatch) => {
  dispatch({
    payload: cards,
    type: BOARD.ADD_PLAYER_CARDS
  });
};
