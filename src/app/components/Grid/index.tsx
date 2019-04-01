import * as React from 'react';
import * as GridLayout from 'react-grid-layout';

import Matrix from '../CardMatrix';

export default class Grid extends React.Component {
  public render() {
    return (
      <GridLayout className="layout" cols={12} rowHeight={150} width={1400}>
        <Matrix />
      </GridLayout>
    );
  }
}
