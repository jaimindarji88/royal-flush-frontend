import { firestore } from 'firebase';

export interface Card {
  card: string;
  suit: string;
  str: string;
}

export enum GAME {
  UPDATE = 'UPDATE',
  UPDATE_PLAYER_CARDS = 'UPDATE_PLAYER_CARDS',
  ADD_OTHER_CARDS = 'OTHER_CARDS',
  ADD_BOARD = 'ADD_BOARD',
  NUMBER_OF_PLAYERS = 'NUMBER_OF_PLAYERS',
  UPDATE_HISTOGRAM = 'UPDATE_HISTOGRAM',
  UPDATE_ODDS = 'UPDATE_ODDS',
  UPDATE_ID = 'UPDATE_ID'
}

export interface IHistogram {
  x: number;
  y: string;
}

export interface GameOdds {
  win: number;
  tie: number;
  hand: string;
}

export interface GameState {
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp | null;
  board: Card[];
  others: Card[][];
  player_count: number;
  player: Card[];
  histogram: IHistogram[];
  odds: GameOdds[];
  id: string;
}
