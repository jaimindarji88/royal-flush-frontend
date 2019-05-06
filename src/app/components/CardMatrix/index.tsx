import { Container } from 'bloomer';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import * as UUID from 'uuid';

import { cards } from '../../constants';
import { boardActions } from '../../modules/game';
import CardButton from '../CardButton';

interface DispatchProps {
  addPlayerCards: typeof boardActions['addPlayerCards'];
}

interface State {
  selected?: string;
}

type Props = DispatchProps;

class Matrix extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selected: undefined
    };

    this.handleClick = this.handleClick.bind(this);
  }

  public componentDidUpdate() {
    const { selected } = this.state;

    if (selected) {
      this.props.addPlayerCards(selected);
    }
  }

  public render() {
    return (
      <div className="card-matrix">
        {cards.map((row: string[]) => {
          return (
            <Container style={{ margin: 0 }} key={UUID.v4()}>
              {row.map(card => (
                <CardButton
                  key={card}
                  card_text={card}
                  handleClick={this.handleClick}
                  selected={this.state.selected === card}
                />
              ))}
            </Container>
          );
        })}
      </div>
    );
  }

  private handleClick(event: Event) {
    const target = event.target as HTMLButtonElement;

    this.setState({
      selected: target.value
    });
  }
}

export default connect(
  undefined,
  {
    addPlayerCards: boardActions.addPlayerCards
  }
)(Matrix);
