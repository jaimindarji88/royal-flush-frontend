import * as _ from 'lodash';
import { Dispatch } from 'redux';

// import { fireStoreHandToString } from '../../utilities';
import { firestoreHandToCards, stringToCard } from '../../utilities';
import { GAME, GameState } from '../game/types';
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
              createdAt: myFirebase.firestore.FieldValue.serverTimestamp()
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
      // dispatch({
      //   type: FIREBASE.UPDATE_GAMES,
      //   payload: snapshot.docs.map(d => d.data())
      // });
      const newGames = snapshot.docs
        .map(d => d.data())
        .map(
          (game: FirestoreGame): GameState => {
            return {
              ...game,
              player: firestoreHandToCards(game.player),
              board: game.board.map(str => stringToCard(str)),
              others: game.others.map(hand => firestoreHandToCards(hand))
            };
          }
        );

      dispatch({
        type: FIREBASE.UPDATE_GAMES,
        payload: newGames
      });
    });
};

export const setGame = (userId: string, game: GameState) => (
  dispatch: Dispatch
) => {
  users
    .doc(userId)
    .collection('games')
    .doc(game.id)
    .set(game)
    .then(() => {
      dispatch({
        type: FIREBASE.ADD_GAME,
        payload: game
      });
    });
};
