import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app';
// import firebase from './app/modules/firebase/config';
import store from './app/store/configure';

import registerServiceWorker from './registerServiceWorker';

import 'bulma/css/bulma.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
