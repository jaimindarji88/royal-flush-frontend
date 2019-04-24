// import * as crypto from 'crypto'
import { Dispatch } from 'redux';

import myFirebase from './config';
import { AUTH } from './types';

const auth = myFirebase.auth();
const users = myFirebase.firestore().collection('users');

export const fetchUser = () => (dispatch: Dispatch) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      users
        .doc(user.uid)
        .get()
        .then((doc: firebase.firestore.DocumentSnapshot) => {
          if (doc.exists) {
            return;
          } else {
            users.doc(user.uid).set({
              games: []
            });
          }
        });

      dispatch({
        payload: user,
        type: AUTH.FETCH_USER
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
