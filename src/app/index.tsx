import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import Wrapper from './components';
import Header from './components/Header';
import { firebaseActions } from './modules/firebase';
import { GameState } from './modules/game/types';
import { AppState } from './store/reducers';
import { gameToFirestore } from './utilities';

interface DispatchProps {
  fetchUser: typeof firebaseActions['fetchUser'];
  setGame: typeof firebaseActions['setGame'];
  newGame: typeof firebaseActions['newGame'];
}

interface StateProps {
  user: firebase.User;
  game: GameState;
}

type Props = DispatchProps & StateProps;

class App extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.createNewGame = this.createNewGame.bind(this);
  }

  public async componentDidMount() {
    const { fetchUser } = this.props;

    fetchUser();
  }

  public render() {
    return (
      <div className='App'>
        <Header handleNewGame={this.createNewGame} />
        <Wrapper />
      </div>
    );
  }

  public componentDidUpdate(oldProps: Props) {
    const { user, game } = this.props;
    if (user && !_.isEmpty(game.player) && !_.isEqual(game, oldProps.game)) {
      const fsGame = gameToFirestore(game);
      this.props.setGame(user.uid, fsGame);
    }
  }

  public createNewGame() {
    const { user } = this.props;
    if (user) {
      this.props.newGame(user.uid);
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
    setGame: firebaseActions.setGame,
    newGame: firebaseActions.newGame
  }
)(App);
