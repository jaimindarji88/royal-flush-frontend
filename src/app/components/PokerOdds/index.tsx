import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';

import { cardsToString } from '../../api/requests';
import * as boardActions from '../../modules/board/actions';
import { GameState } from '../../modules/board/types';
import { AppState } from '../../store/reducers';

interface DispatchProps {
  updateOdds: typeof boardActions['updateOdds'];
}
interface StateProps {
  game: GameState;
}

function OddsComponent(props: any) {
  return (
    <div>
      <b>Player ({props.odds.hand})</b>
      <br />
      <span>Win %: {props.odds.win}</span>
      <br />
      <span>Tie %: {props.odds.tie}</span>
    </div>
  );
}

type Props = DispatchProps & StateProps;

class PokerOdds extends React.Component<Props> {
  public render() {
    const { odds, player } = this.props.game;

    const playerString = cardsToString(player);

    const playerOdds = odds.find(odd => odd.hand === playerString);
    console.log(playerOdds);

    return !_.isEmpty(playerOdds) && <OddsComponent odds={playerOdds} />;
  }
  public componentDidUpdate(oldProps: Props) {
    const { game, updateOdds } = this.props;

    if (!_.isEqual(game.player, oldProps.game.player)) {
      const { player, others, board, player_count } = game;

      const hands = [player];

      for (let i = 0; i < player_count - 1; i++) {
        if (others[i]) {
          hands.push(others[i]);
        } else {
          hands.push({} as any);
        }
      }

      updateOdds({
        hands,
        board
      });
    }
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
