import * as _ from 'lodash';

import { titleize } from '../constants';
import { Card } from '../modules/board/types';
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

export const cardsToString = (cards: Card[]) => {
  // @ts-ignore
  // needed to run seeded rng
  _ = _.runInContext();
  const suits = _.shuffle(['s', 'c', 'd', 'h']);

  const sameSuit = _.sample(suits) as string;
  let str = '';
  cards.forEach(card => {
    if (card.suit === 'ss') {
      card.suit = sameSuit;
    } else if (card.suit === 'os') {
      const s = suits.pop() as string;
      card.suit = s;
    }
    str += card.card + card.suit;
    card.str = str;
  });
  return str;
};

export async function getHistogram(
  hand: Card[],
  others: Card[][],
  board: Card[]
) {
  interface Body {
    hand: string;
    others?: string[];
    board?: string;
  }

  const body: Body = {
    hand: cardsToString(hand)
  };

  if (others.length) {
    body.others = others.map(other => cardsToString(other));
  }

  if (board.length) {
    body.board = cardsToString(board);
  }
  try {
    const { histogram } = await postJSON(routes.histogram('10000'), body);

    return Object.keys(histogram).map(key => ({
      x: histogram[key],
      y: titleize(key)
    }));
  } catch (e) {
    throw Error('Could not get to the server for histogram');
  }
}

export async function getOdds(hands: Card[][], board: Card[]) {
  const RANDOM = '.';

  interface Body {
    hands: string[];
    board?: string;
  }

  const body: Body = {
    hands: hands.map(hand => (_.isEmpty(hand) ? RANDOM : cardsToString(hand)))
  };

  if (board.length) {
    body.board = cardsToString(board);
  }

  interface Odd {
    win: number;
    tie: number;
    hand: string;
  }

  try {
    const { odds } = await postJSON(routes.odds('10'), body);
    const twoDecimals = (num: number) => Math.round(num * 100 * 100) / 100;

    return odds.map((odd: Odd) => {
      return {
        hand: odd.hand,
        win: twoDecimals(odd.win),
        tie: twoDecimals(odd.tie)
      };
    });
  } catch (e) {
    throw Error('Could not complete request');
  }
}
