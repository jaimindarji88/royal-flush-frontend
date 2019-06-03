import { firestore } from 'firebase';
import { GameOdds, GameState, IHistogram } from '../game/types';

export enum FIREBASE {
  FETCH_USER = 'FETCH_USER',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_KEY = 'UPDATE_KEY',
  UPDATE_GAMES = 'UPDATE_GAMES',
  ADD_GAME = 'ADD_GAME',
  TOGGLE_NEW_GAME = 'TOGGLE_NEW_GAME',
  NEW_GAME_TRUE = 'NEW_GAME_TRUE',
  NEW_GAME_FALSE = 'NEW_GAME_FALSE'
}

export interface AuthMap {
  [key: string]: string;
}

export interface FirebaseState {
  user?: firebase.User;
  key?: string;
  games: GameState[];
  newGame: boolean;
}

export interface FirestoreHand {
  0: string;
  1: string;
}

export interface FirestoreGame {
  board: string[];
  others: FirestoreHand[];
  player: FirestoreHand;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp | null;
  player_count: number;
  histogram: IHistogram[];
  odds: GameOdds[];
  id: string;
}

export type AuthState = AuthMap;
