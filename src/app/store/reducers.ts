import { combineReducers, DeepPartial } from 'redux';

import firebase, {
  INITIAL_STATE as firebaseInitial
} from '../modules/firebase';
import { FirebaseState } from '../modules/firebase/types';

import game, { INITIAL_STATE as gameInitial } from '../modules/game';
import { GameState } from '../modules/game/types';

export interface AppState {
  firebase: FirebaseState;
  game: GameState;
}

export const combineInitialState: DeepPartial<AppState> = {
  game: gameInitial,
  firebase: firebaseInitial
};

export default combineReducers<any>({
  game,
  firebase
});
