import { Button } from 'bloomer';
import * as _ from 'lodash';
import * as React from 'react';
// import * as UUID from 'uuid';

export default function(props: {}) {
  return (
    <div className="players">
      <b>Players</b>
      <br />
      {_.range(2, 9).map(val => (
        <Button>{val}</Button>
      ))}
    </div>
  );
}
