import * as React from 'react';
import { connect } from 'react-redux';

import * as boardActions from '../../modules/board/actions';
import { GameState } from '../../modules/board/types';
import { AppState } from '../../store/reducers';

interface DispatchProps {
  updateOdds: typeof boardActions['updateOdds'];
}
interface StateProps {
  game: GameState;
}

type Props = DispatchProps & StateProps;

class PokerOdds extends React.Component<Props> {
  public render() {
    return <div>Poker Odds</div>;
  }
}

export default connect(
  (state: AppState) => ({
    game: state.game
  }),
  {
    updateOdds: boardActions.updateOdds
  }
)(PokerOdds);
