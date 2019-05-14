import * as _ from 'lodash';

import { FirestoreGame, FirestoreHand } from '../modules/firebase/types';
import { Card, GameState } from '../modules/game/types';

export const cardsToString = (cards: Card[]) => {
  if (cards.length === 2) {
    if (cards[0].suit === 'os') {
      return cards[0].card + cards[1].card + 'o';
    } else if (cards[0].suit === 'ss') {
      return cards[0].card + cards[1].card + 's';
    }
  }

  return cards.reduce((prev, curr) => prev + curr.str, '');
};

export const firestoreToGame = (fsGame: FirestoreGame): GameState => {
  return {
    ...fsGame,
    player: firestoreHandToCards(fsGame.player),
    board: fsGame.board.map(stringToCard),
    others: fsGame.others.map(firestoreHandToCards)
  };
};

export const gameToFirestore = (game: GameState): FirestoreGame => {
  return {
    ...game,
    player: cardsToFirestoreHand(game.player),
    board: game.board.map(card => card.str),
    others: game.others.map(cardsToFirestoreHand)
  };
};

const cardsToFirestoreHand = (cards: Card[]): FirestoreHand => {
  if (cards.length === 2) {
    return {
      0: cards[0].str,
      1: cards[1].str
    };
  }
  throw Error('invalid input');
};

const firestoreHandToCards = (hand: FirestoreHand): Card[] => {
  return [stringToCard(hand[0]), stringToCard(hand[1])];
};

export const stringToCard = (str: string): Card => {
  return {
    card: str[0],
    suit: str[1],
    str
  };
};
