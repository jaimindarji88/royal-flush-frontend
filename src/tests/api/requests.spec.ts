import * as seedrandom from 'seedrandom';

import { cardsToString, getOdds } from '../../app/api/requests';

describe('should turn card object to a string', () => {
  beforeEach(() => {
    seedrandom('so random', { global: true });
  });

  test('same suited hand', () => {
    const cards = [{ card: 'A', suit: 'ss' }, { card: 'K', suit: 'ss' }];

    const cardString = cardsToString(cards);

    expect(cardString).toEqual('AhKh');
  });

  test('off suit hand', () => {
    const cards = [{ card: 'A', suit: 'os' }, { card: 'K', suit: 'os' }];

    const cardString = cardsToString(cards);

    expect(cardString).toEqual('AdKc');
  });

  test('board', () => {
    const cards = [
      { card: 'A', suit: 's' },
      { card: 'A', suit: 'c' },
      { card: 'A', suit: 'h' }
    ];

    const cardString = cardsToString(cards);

    expect(cardString).toEqual('AsAcAh');
  });
});

// needs to be reworked -> offline requests
describe('should get the odds from api', () => {
  test('get odds of a hand', async () => {
    const hands = [[{ card: 'A', suit: 's' }, { card: 'A', suit: 'c' }], []];

    const odds = await getOdds(hands, []);

    console.log(odds);
  });
});
