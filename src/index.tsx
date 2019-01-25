import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import App from "./app";
import firebase from "./app/modules/firebase/config";
import store from "./app/store/configure";

import registerServiceWorker from "./registerServiceWorker";

import "bulma/css/bulma.css";

const rrfProps = {
  config: {},
  dispatch: store.dispatch,
  firebase
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
