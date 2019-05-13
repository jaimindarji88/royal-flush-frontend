import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import Wrapper from './components';
import Header from './components/Header';
import { firebaseActions } from './modules/firebase';
import { GameState } from './modules/game/types';
import { AppState } from './store/reducers';

interface DispatchProps {
  fetchUser: typeof firebaseActions['fetchUser'];
  signOut: typeof firebaseActions['signOut'];
  setGame: typeof firebaseActions['setGame'];
}

interface StateProps {
  user: firebase.User;
  game: GameState;
}

type Props = DispatchProps & StateProps;

class App extends React.Component<Props, any> {
  public async componentDidMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

  public render() {
    const { signOut } = this.props;

    return (
      <div className='App'>
        <Header handleSignOut={signOut} />
        <Wrapper />
      </div>
    );
  }

  public componentDidUpdate(oldProps: Props) {
    const { user, game } = this.props;
    if (user && !_.isEmpty(game.player)) {
      this.props.setGame(user.uid, game);
    }
  }
}

export default connect(
  (state: AppState) => ({
    game: state.game,
    user: state.firebase.user
  }),
  {
    fetchUser: firebaseActions.fetchUser,
    signOut: firebaseActions.signOut,
    setGame: firebaseActions.setGame
  }
)(App);
