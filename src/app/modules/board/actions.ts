import { Dispatch } from 'redux';

import { getHistogram, getOdds } from '../../api/requests';
import { Card, GAME } from './types';

export const addPlayerCards = (cards: string) => (dispatch: Dispatch) => {
  let playerCards: Card[] = [];

  if (cards.length === 2 || cards.length === 3) {
    const suit = cards.length === 3 ? cards[cards.length - 1] : 'o';

    playerCards = [
      {
        card: cards[0],
        suit: suit + 's',
        str: ''
      },
      {
        card: cards[1],
        suit: suit + 's',
        str: ''
      }
    ];
  } else if (cards.length === 4) {
    playerCards = [
      {
        card: cards[0],
        suit: cards[1],
        str: cards.substring(0, 2)
      },
      {
        card: cards[2],
        suit: cards[3],
        str: cards.substring(2, 4)
      }
    ];
  }

  dispatch({
    payload: playerCards,
    type: GAME.UPDATE_PLAYER_CARDS
  });
};

export const editNumPlayers = (num: number) => (dispatch: Dispatch) => {
  dispatch({
    payload: num,
    type: GAME.NUMBER_OF_PLAYERS
  });
};

interface HistogramBody {
  hand: Card[];
  others: Card[][];
  board: Card[];
}

export const updateHistogram = (data: HistogramBody) => (
  dispatch: Dispatch
) => {
  getHistogram(data.hand, data.others, data.board).then(hist =>
    dispatch({
      payload: hist,
      type: GAME.UPDATE_HISTOGRAM
    })
  );
};

interface OddsBody {
  hands: Card[][];
  board: Card[];
}

export const updateOdds = (data: OddsBody) => (dispatch: Dispatch) => {
  getOdds(data.hands, data.board).then(odds => {
    dispatch({
      payload: odds,
      type: GAME.UPDATE_ODDS
    });
  });
};
