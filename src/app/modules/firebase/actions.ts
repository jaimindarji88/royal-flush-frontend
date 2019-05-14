import * as _ from 'lodash';
import { Dispatch } from 'redux';

import { firestore } from 'firebase';
import { firestoreToGame } from '../../utilities';
import { INITIAL_STATE as gameInit } from '../game/index';
import { GAME } from '../game/types';
import myFirebase from './config';
import { FIREBASE, FirestoreGame } from './types';

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
              createdAt: firestore.FieldValue.serverTimestamp()
            })
            .then(game => {
              dispatch({
                type: FIREBASE.UPDATE_KEY,
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
                  type: FIREBASE.UPDATE_KEY,
                  payload: d.id
                });

                // update redux data if needed
                const data = d.data();
                if (!_.isEmpty(data.odds)) {
                  dispatch({
                    type: GAME.UPDATE_ODDS,
                    payload: data.odds
                  });
                }
              });
            });
        }
      });

      dispatch({
        payload: user,
        type: FIREBASE.FETCH_USER
      });
    }
  });
};

export const signOut = () => (dispatch: Dispatch) => {
  auth.signOut().then(() => {
    dispatch({
      type: FIREBASE.SIGN_OUT
    });
  });
};

export const getGames = (userId: string) => (dispatch: Dispatch) => {
  users
    .doc(userId)
    .collection('games')
    .get()
    .then(snapshot => {
      const newGames = snapshot.docs.map(d => d.data()).map(firestoreToGame);

      dispatch({
        type: FIREBASE.UPDATE_GAMES,
        payload: newGames
      });
    });
};

export const setGame = (userId: string, game: FirestoreGame) => (
  dispatch: Dispatch
) => {
  users
    .doc(userId)
    .collection('games')
    .doc(game.id)
    .set(game);
};

export const newGame = (userId: string) => (dispatch: Dispatch) => {
  const gamesRef = users.doc(userId).collection('games');
  const ref = gamesRef.doc();

  const game = {
    ...gameInit,
    id: ref.id,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedAt: null
  };
  gamesRef
    .doc(ref.id)
    .set(game)
    .then(() => {
      dispatch({
        type: GAME.UPDATE,
        payload: newGame
      });
    });
};
