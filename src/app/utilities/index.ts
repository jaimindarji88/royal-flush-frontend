import * as _ from 'lodash';

import { FirestoreHand } from '../modules/firebase/types';
import { Card } from '../modules/game/types';

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

export const firestoreHandToCards = (hand: FirestoreHand): Card[] => {
  return [stringToCard(hand[0]), stringToCard(hand[1])];
};

export const stringToCard = (str: string): Card => {
  return {
    card: str[0],
    suit: str[1],
    str
  };
};
