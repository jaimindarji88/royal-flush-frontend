import { Column } from 'bloomer';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import * as firebaseActions from '../../modules/firebase/actions';
import { FirebaseState } from '../../modules/firebase/types';
import * as gameActions from '../../modules/game/actions';
import { GameState } from '../../modules/game/types';
import { AppState } from '../../store/reducers';
import GameCard from './GameCard';

import './history.css';

interface DispatchProps {
  getGames: typeof firebaseActions['getGames'];
  setGame: typeof firebaseActions['setGame'];
  updateGame: typeof gameActions['updateGame'];
}

interface StateProps {
  firebase: FirebaseState;
  game: GameState;
}

type Props = StateProps & DispatchProps;

class History extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public componentDidUpdate(oldProps: Props) {
    const { user, games } = this.props.firebase;

    if (user && this.isChanged(oldProps)) {
      this.props.getGames(user.uid);
    }

    if (games.length && _.isEmpty(this.props.game.player)) {
      this.props.updateGame(games[0]);
    }
  }

  public render() {
    const { games } = this.props.firebase;

    return (
      <div className='history' style={{ overflow: 'auto', height: '350px' }}>
        <Column className='games'>
          {games.map(game => (
            <GameCard game={game} key={game.id} />
          ))}
        </Column>
      </div>
    );
  }

  private isChanged(oldProps: Props) {
    const { user } = this.props.firebase;
    return !_.isEqual(user, oldProps.firebase.user);
  }
}

export default connect(
  (state: AppState) => ({
    firebase: state.firebase,
    game: state.game
  }),
  {
    getGames: firebaseActions.getGames,
    setGame: firebaseActions.setGame,
    updateGame: gameActions.updateGame
  }
)(History);
