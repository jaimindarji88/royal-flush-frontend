import * as _ from 'lodash';

import { titleize } from '../constants';
import { Card } from '../modules/game/types';
import { cardsToString } from '../utilities';
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

interface IOdd {
  win: number;
  tie: number;
  hand: string;
}
const twoDecimals = (num: number) => Math.round(num * 100 * 100) / 100;

export async function getOdds(
  hands: Card[][],
  board: Card[],
  numRequests: number = 5
) {
  const RANDOM = '.';

  interface Body {
    hands: string[];
    board?: string;
  }

  const body: Body = {
    hands: hands.map(hand => (_.isEmpty(hand) ? RANDOM : cardsToString(hand)))
  };

  const numRandom = hands.filter(_.isEmpty).length;

  if (board.length) {
    body.board = cardsToString(board);
  }

  try {
    if ([0, 1].includes(numRandom)) {
      const { odds } = await postJSON(routes.odds(), body);

      return odds.map((odd: IOdd) => {
        return {
          hand: odd.hand,
          win: twoDecimals(odd.win),
          tie: twoDecimals(odd.tie)
        };
      });
    }

    // nit api goes very slowly for > 2 random hands
    // so we're doing many requests with low number of iterations
    // in parallel
    const requests = [];
    for (let i = 0; i < numRequests; i++) {
      requests.push(postJSON(routes.odds('10'), body));
    }

    const allOdds = await Promise.all(requests);
    const oddsTemplate: IOdd[] = hands.map(hand => ({
      win: 0,
      tie: 0,
      hand: _.isEmpty(hand) ? 'random' : cardsToString(hand)
    }));

    return parseOdds(allOdds, oddsTemplate, numRandom);
  } catch (e) {
    throw Error('Could not complete request');
  }
}

const parseOdds = (
  allOdds: Array<{ odds: IOdd[] }>,
  template: IOdd[],
  numRandom: number
) => {
  const newOdds: any = template.map(x => []);

  allOdds.forEach((odd, index) => {
    odd.odds.forEach((o, i) => {
      newOdds[i][index] = o;
    });
  });

  const parsedOdds = newOdds.map((o: IOdd[], idx: number) => {
    return o.reduce((acc: IOdd, odd: IOdd) => {
      return {
        win: acc.win + odd.win,
        tie: acc.tie + odd.tie,
        hand: odd.hand
      };
    }, template[idx]);
  });

  return parsedOdds.map((o: IOdd) => {
    if (o.hand === 'random') {
      return {
        win: twoDecimals(o.win / allOdds.length / numRandom),
        tie: twoDecimals(o.tie / allOdds.length / numRandom),
        hand: o.hand
      };
    }
    return {
      win: twoDecimals(o.win / allOdds.length),
      tie: twoDecimals(o.tie / allOdds.length),
      hand: o.hand
    };
  });
};
