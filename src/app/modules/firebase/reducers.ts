import { firebaseReducer, reactReduxFirebase } from "react-redux-firebase";
import { combineReducers, compose, createStore } from "redux";

import firebase from "./config";

const storeFirebase = compose(reactReduxFirebase(firebase, {}))(createStore);

export default combineReducers({
  firebase: firebaseReducer
});
