import * as _ from 'lodash';

import { Card, Player } from '../modules/board/types';
import { routes } from './constants';

async function postJSON(url: string, body: any) {
  return fetch(url, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  }).then(data => data.json());
}

interface Body {
  hand: string;
  others?: string[];
  board?: string;
}

const cardsToString = (cards: Card[]) => {
  const suits = ['s', 'c', 'd', 'h'];

  const sameSuit = _.sample(suits) as string;
  let str = '';
  cards.forEach(card => {
    if (card.suit === 'ss') {
      card.suit = sameSuit;
    } else if (card.suit === 'os') {
      const s = _.sample(suits) as string;
      _.remove(suits, f => f === s);
      card.suit = s;
    }
    str += card.card + card.suit;
  });
  return str;
};

export async function getHistogram(
  hand: Card[],
  others: Player[],
  board: Card[]
) {
  const body: Body = {
    hand: cardsToString(hand)
  };

  if (others.length) {
    body.others = others.map(other => cardsToString(other.cards));
  }

  if (board.length) {
    body.board = cardsToString(board);
  }
  try {
    const { histogram } = await postJSON(routes.histogram('10000'), body);

    return Object.keys(histogram).map(key => ({
      x: histogram[key],
      y: key
    }));
  } catch (e) {
    throw Error('Could not get to the server for histogram');
  }
}
