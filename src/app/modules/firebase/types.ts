import { GameState } from '../game/types';

export enum FIREBASE {
  FETCH_USER = 'FETCH_USER',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_KEY = 'UPDATE_KEY',
  UPDATE_GAMES = 'UPDATE_GAMES'
}

export interface AuthMap {
  [key: string]: string;
}

export interface FirebaseState {
  user?: firebase.User;
  key?: string;
  games: GameState[];
}

export type AuthState = AuthMap;
