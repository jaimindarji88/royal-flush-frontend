import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";

export interface IAppState {
  firebase: firebase.app.App;
}

export default combineReducers<IAppState>({
  firebase: firebaseReducer
});
