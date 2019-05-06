import * as _ from 'lodash';
import * as React from 'react';
import * as GridLayout from 'react-grid-layout';

import CardMatrix from './CardMatrix';
import PokerHistogram from './Histogram';
import History from './History';
import Players from './Players';
import PokerOdds from './PokerOdds';

export default function(props: {}) {
  return (
    <GridLayout
      className='layout'
      cols={12}
      rowHeight={30}
      width={window.innerWidth}
    >
      <div
        key='history'
        data-grid={{
          x: 0,
          y: 0,
          w: 5,
          h: 10,
          static: true
        }}
      >
        <History />
      </div>
      <div key='card-matrix' data-grid={{ x: 5, y: 0, w: 7, h: 12 }}>
        <CardMatrix />
      </div>
      <div key='players' data-grid={{ x: 10, y: 0, w: 1, h: 5 }}>
        <Players />
      </div>
      <div key='histogram' data-grid={{ x: 5, y: 12, w: 5, h: 10 }}>
        <PokerHistogram />
      </div>
      <div key='odds' data-grid={{ x: 0, y: 1, w: 4, h: 2 * 2 }}>
        <PokerOdds />
      </div>
    </GridLayout>
  );
}
