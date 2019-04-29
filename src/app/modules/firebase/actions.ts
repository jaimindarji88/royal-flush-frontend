// import * as crypto from 'crypto'
import { Dispatch } from 'redux';

import { GAME } from '../board/types';
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
          // create a new game theres no games for this user
          games
            .add({
              createdAt: myFirebase.firestore.FieldValue.serverTimestamp()
            })
            .then(game => {
              dispatch({
                type: AUTH.UPDATE_KEY,
                payload: game.id
              });
            });
        } else {
          // get the last created game
          games
            .orderBy('createdAt')
            .limit(1)
            .get()
            .then(latestDoc => {
              latestDoc.forEach(d => {
                dispatch({
                  type: AUTH.UPDATE_KEY,
                  payload: d.id
                });

                const data = d.data();
                if (data.player) {
                  dispatch({
                    type: GAME.UPDATE_ODDS,
                    payload: data
                  });
                }
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
