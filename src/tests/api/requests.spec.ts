import * as seedrandom from 'seedrandom';

import { cardsToString } from '../../app/api/requests';

describe('should turn card object to a string', () => {
  beforeEach(() => {
    seedrandom('so random', { global: true });
  });

  test('same suited hand', () => {
    const cards = [
      { card: 'A', suit: 'ss', str: '' },
      { card: 'K', suit: 'ss', str: '' }
    ];

    const cardString = cardsToString(cards);

    expect(cardString).toEqual('AhKh');
  });

  test('off suit hand', () => {
    const cards = [
      { card: 'A', suit: 'os', str: '' },
      { card: 'K', suit: 'os', str: '' }
    ];

    const cardString = cardsToString(cards);

    expect(cardString).toEqual('AdKc');
  });

  test('board', () => {
    const cards = [
      { card: 'A', suit: 's', str: 'As' },
      { card: 'A', suit: 'c', str: 'Ac' },
      { card: 'A', suit: 'h', str: 'Ah' }
    ];

    const cardString = cardsToString(cards);

    expect(cardString).toEqual('AsAcAh');
  });
});
