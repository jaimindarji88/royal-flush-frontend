import * as React from 'react';
import { connect } from 'react-redux';

// import CardContainer from "./components/CardContainer";

import CardMatrix from './components/CardMatrix';
import Header from './components/Header';
import { firebaseActions } from './modules/firebase';

interface DispatchProps {
  fetchUser: typeof firebaseActions['fetchUser'];
  signOut: typeof firebaseActions['signOut'];
}

type Props = DispatchProps;

class App extends React.Component<Props, any> {
  public render() {
    const { fetchUser, signOut } = this.props;
    fetchUser();

    return (
      <div className="App">
        <Header handleSignOut={signOut} />
        <CardMatrix />
      </div>
    );
  }
}

export default connect(
  null,
  {
    fetchUser: firebaseActions.fetchUser,
    signOut: firebaseActions.signOut
  }
)(App);
