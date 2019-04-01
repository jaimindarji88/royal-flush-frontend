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
  public componentDidMount() {
    const { fetchUser } = this.props;
    console.log('lets do ti');
    fetchUser();
  }

  public render() {
    const { signOut } = this.props;

    return (
      <div className="App">
        <Header handleSignOut={signOut} />
        <CardMatrix />
      </div>
    );
  }
}

export default connect(
  undefined,
  {
    fetchUser: firebaseActions.fetchUser,
    signOut: firebaseActions.signOut
  }
)(App);
