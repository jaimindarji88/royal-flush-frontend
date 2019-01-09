import * as React from 'react';
// @ts-ignore
import { StyledFirebaseAuth } from 'react-firebaseui';

import firebase, { uiConfig } from './config';


export { firebase };

export default class FirebaseSignIn extends React.Component {
  public render() {
    return (
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
    );
  }
}
