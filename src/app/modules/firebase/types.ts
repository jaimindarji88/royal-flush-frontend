export enum AUTH {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ERROR = 'ERROR',
  FETCH_USER = 'FETCH_USER',
  SIGN_OUT = 'SIGN_OUT'
}

export interface AuthMap {
  [key: string]: string;
}

export interface FirebaseState {
  user: null | firebase.User;
}

export type AuthState = AuthMap;
