import { Dispatch } from 'redux';
import { BOARD } from './types';

export const addPlayerCards = (cards: string) => (dispatch: Dispatch) => {
  dispatch({
    payload: cards,
    type: BOARD.ADD_PLAYER_CARDS
  });
};

export const editNumPlayers = (num: number) => (dispatch: Dispatch) => {
  dispatch({
    payload: num,
    type: BOARD.NUMBER_OF_PLAYERS
  });
};
