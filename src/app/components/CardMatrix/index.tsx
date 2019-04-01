import { Container } from 'bloomer';
import * as _ from 'lodash';
import * as React from 'react';
import * as UUID from 'uuid';

import { cards } from '../../constants/cards';
import CardButton from '../CardButton';

export default class Matrix extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      selected: null
    };
  }

  public render() {
    return (
      <div data-grid={{ x: 0, y: 0, w: 4, h: 3 }}>
        {cards.map((row: string[]) => {
          return (
            <Container style={{ margin: 0 }} key={UUID.v4()}>
              {row.map(card => (
                <CardButton
                  key={card}
                  card_text={card}
                  handleClick={this.handleClick}
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
