import { combineReducers, DeepPartial } from 'redux';

import { INITIAL_STATE as firebaseInitial } from '../modules/firebase';
import firebase, { FirebaseState } from '../modules/firebase/reducers';

import board, { INITIAL_STATE as boardInitial } from '../modules/board';
import { BoardState } from '../modules/board/types';

export interface AppState {
  firebase: FirebaseState;
  board: BoardState;
}

export const combineInitialState: DeepPartial<AppState> = {
  board: boardInitial,
  firebase: firebaseInitial
};

export default combineReducers<any>({
  board,
  firebase
});
