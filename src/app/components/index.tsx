import * as _ from 'lodash';
import * as React from 'react';
import * as GridLayout from 'react-grid-layout';

import CardMatrix from './CardMatrix';
import PokerHistogram from './Histogram';
import Players from './Players';
import PokerOdds from './PokerAdds';

export default function(props: {}) {
  return (
    <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
      <div
        key="card-matrix"
        data-grid={{ x: 0, y: 0, w: 5, h: 12, static: true }}
      >
        <CardMatrix />
      </div>
      <div key="players" data-grid={{ x: 5, y: 0, w: 1, h: 5 }}>
        <Players />
      </div>
      <div key="histogram" data-grid={{ x: 6, y: 0, w: 5, h: 10 }}>
        <PokerHistogram />
      </div>
      <div key="odds" data-grid={{ x: 0, y: 1, w: 3, h: 2 * 2 }}>
        <PokerOdds />
      </div>
    </GridLayout>
  );
}
