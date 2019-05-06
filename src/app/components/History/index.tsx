import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { firestore } from 'firebase';

import * as firebaseActions from '../../modules/firebase/actions';
import { FirebaseState } from '../../modules/firebase/types';
import { AppState } from '../../store/reducers';

import { Card, CardContent, CardHeader, Content } from 'bloomer';
import { GameState } from '../../modules/game/types';

interface DispatchProps {
  getGames: typeof firebaseActions['getGames'];
}

interface StateProps {
  firebase: FirebaseState;
}

function GameCard(game: GameState) {
  return (
    <Card>
      <CardHeader>Header</CardHeader>
      <CardContent>
        <Content>Content</Content>
      </CardContent>
    </Card>
  );
}

type Props = StateProps & DispatchProps;

class History extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    console.log(firestore.Timestamp.fromDate(new Date()));
  }

  public componentDidUpdate(oldProps: Props) {
    const { user } = this.props.firebase;

    if (user && this.isChanged(oldProps)) {
      this.props.getGames(user.uid);
    }
  }

  public render() {
    const { games } = this.props.firebase;

    return (
      <div className='history'>
        <h6 className='title is-6'>Game History</h6>
        <ul>
          {games.map(game => (
            <li key={game.id}>{GameCard(game)}</li>
          ))}
        </ul>
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
    firebase: state.firebase
  }),
  {
    getGames: firebaseActions.getGames
  }
)(History);
