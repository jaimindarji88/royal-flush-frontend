import { combineReducers, DeepPartial } from 'redux';

import firebase, {
  INITIAL_STATE as firebaseInitial
} from '../modules/firebase';
import { FirebaseState } from '../modules/firebase/types';

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
