import { histogram } from '../../src/app/api/requests';

test('get the histogram for a starting hand and 1 other hand', async () => {
  const hand = 'AsAc';
  const others = ['KsKc'];

  const hist = await histogram(hand, others);

  console.log(hist);

  expect(1).toBe(2);
});
