// import * as crypto from 'crypto'
import { Dispatch } from 'redux';

import myFirebase from './config';
import { AUTH } from './types';

const auth = myFirebase.auth();
const users = myFirebase.firestore().collection('users');

export const fetchUser = () => (dispatch: Dispatch) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      const games = users.doc(user.uid).collection('games');
      games.get().then((doc: firebase.firestore.QuerySnapshot) => {
        if (doc.empty) {
          games
            .add({
              updatedAt: myFirebase.firestore.FieldValue.serverTimestamp()
            })
            .then(game => {
              dispatch({
                type: AUTH.UPDATE_KEY,
                payload: game.id
              });
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
