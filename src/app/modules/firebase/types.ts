export enum AUTH {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  ERROR = 'ERROR'
}

export interface AuthMap {
  [key: string]: string;
}

export type AuthState = AuthMap;
