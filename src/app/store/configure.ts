import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers";

export default createStore(reducer, {}, composeWithDevTools());
