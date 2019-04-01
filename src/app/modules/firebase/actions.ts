import { Dispatch } from 'redux';

import firebase from './config';
import { AUTH } from './types';

const auth = firebase.auth();

export const fetchUser = () => (dispatch: Dispatch) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      dispatch({
        payload: user,
        type: AUTH.FETCH
      });
    }
  });
};

export const signOut = () => (dispatch: Dispatch) => {
  auth.signOut().then(() => {
    dispatch({
      type: AUTH.SIGN_OUT
    });
  });
};
