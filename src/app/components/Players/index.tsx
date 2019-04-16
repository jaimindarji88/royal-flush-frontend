import { Button } from 'bloomer';
import * as _ from 'lodash';
import * as React from 'react';
import * as uuid from 'uuid';

import { connect } from 'react-redux';
import * as boardActions from '../../modules/board/actions';

interface DispatchProps {
  editNumPlayers: typeof boardActions['editNumPlayers'];
}
interface State {
  selected: number;
}

type Props = DispatchProps;

class Players extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      selected: 2
    };
  }

  public componentDidUpdate() {
    const { selected } = this.state;
    if (selected) {
      this.props.editNumPlayers(selected);
    }
  }

  public render() {
    return (
      <div className="players">
        <b>Players</b>
        <br />
        {_.range(2, 9).map(val => (
          <Button
            key={uuid.v4()}
            value={val}
            onClick={this.handleClick}
            style={{
              backgroundColor:
                val === this.state.selected ? '#f3f3f3' : '#ffffff'
            }}
          >
            {val}
          </Button>
        ))}
      </div>
    );
  }

  private handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const { value } = event.target as HTMLButtonElement;

    if (value) {
      this.setState({
        selected: Number(value)
      });
    }
  }
}

export default connect(
  undefined,
  {
    editNumPlayers: boardActions.editNumPlayers
  }
)(Players);
