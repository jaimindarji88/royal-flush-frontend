import * as React from 'react';

import { firebase } from '../firebase';

import CardContainer from './CardContainer';
import Header from './Header';

interface IStateProps {
  signedIn: boolean;
}

class App extends React.Component<any,IStateProps> {
  private unregisterAuthObserver: () => void;
  
  constructor(props: any) {
    super(props);
    this.state = {
      signedIn: false
    }
  }

  public componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      user => this.setState({signedIn: !!user})
    );
  }

  public componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  public getUser():string {
    if (this.state.signedIn === true) {
      const user = firebase.auth().currentUser;
      if (user && user.displayName) {
        return user.displayName;
      }
    }
    return '';
  }

  public handleSignOut():void {
    firebase.auth().signOut();
  }

  public render() {
    return (
      <div className="App">
        <Header signOut={this.handleSignOut} name={this.getUser()}/>
        <CardContainer />
      </div>
    );
  }
}

export default App;
