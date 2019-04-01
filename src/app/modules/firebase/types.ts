export enum AUTH {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ERROR = 'ERROR',
  FETCH = 'FETCH',
  SIGN_OUT = 'SIGN_OUT'
}

export interface AuthMap {
  [key: string]: string;
}

export interface FirebaseState {
  user: null | firebase.User;
}

export type AuthState = AuthMap;
