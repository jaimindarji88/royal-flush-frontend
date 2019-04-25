export enum AUTH {
  FETCH_USER = 'FETCH_USER',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_KEY = 'UPDATE_KEY'
}

export interface AuthMap {
  [key: string]: string;
}

export interface FirebaseState {
  user?: firebase.User;
  key?: string;
}

export type AuthState = AuthMap;
