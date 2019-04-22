const str =
  '[{"odds":[{"win":0.45521639428616156,"tie":0.013990066780763519,"hand":"KcTc"},{"win":0.5089971699274023,"tie":0.020888620423505276,"hand":"random"},{"win":0.5089971699274023,"tie":0.020888620423505276,"hand":"random"}]},{"odds":[{"win":0.533860867814356,"tie":0.023130119951824516,"hand":"KcTc"},{"win":0.4119576719576726,"tie":0.03105134027614691,"hand":"random"},{"win":0.4119576719576726,"tie":0.03105134027614691,"hand":"random"}]}]';
const oddsTemplate: any = [['TsTc'], [], []].map(hand => ({
  win: 0,
  tie: 0,
  hand: hand.length ? 'TsTc' : 'random'
}));

describe('test', () => {
  test('asd', () => {
    const odds = JSON.parse(str);

    const each: any = [[], [], []];

    odds.forEach((odd, index) => {
      odd.odds.forEach((o, i) => {
        each[i][index] = o;
      });
    });

    const parsedOdds = each.map((e, idx) => {
      return e.reduce((acc, odd) => {
        return {
          win: acc.win + odd.win,
          tie: acc.tie + odd.tie,
          hand: odd.hand
        };
      }, oddsTemplate[idx]);
    });

    const normalizedOdds = parsedOdds.map(o => ({
      win: o.win / odds.length,
      tie: o.tie / odds.length,
      hand: o.hand
    }));

    console.log(normalizedOdds);
  });
});
