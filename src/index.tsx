import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import 'bulma/css/bulma.css'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
