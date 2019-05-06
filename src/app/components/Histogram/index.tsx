import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import {
  FlexibleXYPlot,
  HorizontalBarSeries,
  LabelSeries,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';

import * as boardActions from '../../modules/board/actions';
import { GameState } from '../../modules/board/types';
import { AppState } from '../../store/reducers';

interface DispatchProps {
  updateHistogram: typeof boardActions['updateHistogram'];
}
interface StateProps {
  game: GameState;
}

type Props = DispatchProps & StateProps;

class PokerHistogram extends React.Component<Props> {
  public render() {
    const { histogram } = this.props.game;
    return (
      <FlexibleXYPlot
        xDomain={[0, 100]}
        width={400}
        yType="ordinal"
        margin={{ left: 100 }}
        animated={true}
      >
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        <HorizontalBarSeries data={histogram} />
        <LabelSeries
          data={histogram.map(d => ({
            ...d,
            label: d.x.toString(),
            style: {
              fontSize: 10,
              display: d.x === 0 ? 'none' : 'inherit'
            },
            xOffset: 5
          }))}
          labelAnchorX="text-after-edge"
          labelAnchorY="middle"
          animation={true}
        />
      </FlexibleXYPlot>
    );
  }
  public componentDidUpdate(oldProps: Props) {
    const { game, updateHistogram } = this.props;

    if (!_.isEqual(game.player, oldProps.game.player)) {
      const { player, others, board } = game;
      updateHistogram({
        hand: player,
        others,
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
    updateHistogram: boardActions.updateHistogram
  }
)(PokerHistogram);
