import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderTitle,
  Column,
  Columns,
  Content
} from 'bloomer';
import * as moment from 'moment';
import * as React from 'react';
import * as uuid from 'uuid';

import { GameState } from '../../modules/game/types';
import { cardsToString } from '../../utilities';

const DATE_FORMAT = 'L LT';

interface CardProps {
  game: GameState;
}

export default function GameCard({ game }: CardProps) {
  const time = game.updatedAt ? game.updatedAt : game.createdAt;
  const date = moment.unix(time.seconds);

  return (
    <Card className='game'>
      <CardHeader>
        <CardHeaderTitle>Hand: {cardsToString(game.player)}</CardHeaderTitle>
        <CardHeaderTitle>({date.format(DATE_FORMAT)})</CardHeaderTitle>
      </CardHeader>
      <CardContent>
        <Columns>
          {game.others.map((hand, index) => (
            <Column key={uuid.v4()}>
              {`P${index + 2}: ${cardsToString(hand)}`}
            </Column>
          ))}
        </Columns>
        <Content>Board: {cardsToString(game.board)}</Content>
      </CardContent>
    </Card>
  );
}
