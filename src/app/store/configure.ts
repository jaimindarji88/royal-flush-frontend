import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { Dispatch } from "react";
import reducer from "./reducers";

export interface IConnectedProps<S> {
  dispatch: Dispatch<S>;
  firebase: firebase.app.App;
}

export default createStore(reducer, {}, composeWithDevTools());
