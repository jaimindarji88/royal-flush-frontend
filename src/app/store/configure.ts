import { applyMiddleware, compose, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer, { AppState, combineInitialState } from './reducers';

const middleWare = compose(
  applyMiddleware(thunk),
  composeWithDevTools()
);

const store: Store<AppState> = createStore(
  rootReducer,
  combineInitialState as any,
  middleWare
);

export default store;
