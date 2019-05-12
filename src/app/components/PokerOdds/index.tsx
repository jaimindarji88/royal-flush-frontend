import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import * as UUID from 'uuid';

import * as boardActions from '../../modules/game/actions';
import { GameOdds, GameState } from '../../modules/game/types';
import { AppState } from '../../store/reducers';
import { cardsToString } from '../../utilities';

interface DispatchProps {
  updateOdds: typeof boardActions['updateOdds'];
}
interface StateProps {
  game: GameState;
}

interface OddsProps {
  odds: GameOdds;
  player: string;
}

function OddsComponent(props: OddsProps) {
  return (
    <div style={{ marginLeft: '10px' }}>
      <b>
        {props.player} ({props.odds.hand})
      </b>
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

    if (_.isEmpty(odds)) {
      return <div>Loading...</div>;
    }

    const playerString = cardsToString(player);

    const playerOdds = odds.find(odd => odd.hand === playerString) as GameOdds;
    const otherOdds = odds.filter(odd => odd.hand !== playerString);

    return (
      <div style={{ display: 'flex', flexWrap: 'nowrap', marginLeft: '5px' }}>
        <h6 className='title is-6'>Game Odds</h6>
        {!_.isEmpty(playerOdds) && (
          <OddsComponent odds={playerOdds} player='Player' />
        )}
        {!_.isEmpty(otherOdds) &&
          otherOdds.map((odd, idx) => (
            <OddsComponent
              key={UUID.v4()}
              odds={odd}
              player={'Other ' + (idx + 1)}
            />
          ))}
      </div>
    );
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

      updateOdds(hands, board);
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
