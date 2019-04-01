import * as _ from 'lodash';
import * as React from 'react';
import * as GridLayout from 'react-grid-layout';
// import * as UUID from 'uuid';

export default function(props: {}) {
  return (
    <GridLayout className="players" cols={5}>
      <div data-grid={{ x: 5, y: 0, w: 4, h: 3, static: true }}>
        <b>Players</b>
        <br />
        {_.range(2, 9).map(val => (
          <div>{val}</div>
        ))}
      </div>
    </GridLayout>
  );
}
