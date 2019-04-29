import * as react from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../store/reducers';

class History extends react.Component<{}, {}> {}

export default connect((state: AppState) => ({
  games: state.firebase.games,
  gameKey: state.firebase.key
}))(History);
