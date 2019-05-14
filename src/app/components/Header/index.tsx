import { Button, Navbar, NavbarEnd, NavbarItem, NavbarStart } from 'bloomer';
import * as React from 'react';
import { connect } from 'react-redux';

import * as firebaseActions from '../../modules/firebase/actions';
import FirebaseSignIn from '../../modules/firebase/component';
import { AppState } from '../../store/reducers';

import './header.css';

interface DispatchProps {
  signOut: typeof firebaseActions['signOut'];
}

interface StateProps {
  user: firebase.User;
}

interface Props extends DispatchProps, StateProps {
  handleNewGame: () => void;
}

export class Header extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { user } = this.props;
    let name;
    if (user) {
      name = user.displayName;
    }

    return (
      <div className='header'>
        <Navbar style={{ backgroundColor: 'lightgrey' }}>
          <NavbarStart>
            <NavbarItem>Poker</NavbarItem>
            <NavbarItem>
              <b>{name}</b>
            </NavbarItem>
          </NavbarStart>
          <NavbarEnd>
            <NavbarItem>{this.getNewGameButton()}</NavbarItem>
            <NavbarItem>{this.getAuthButton()}</NavbarItem>
          </NavbarEnd>
        </Navbar>
      </div>
    );
  }
  private getNewGameButton(): JSX.Element {
    const { user, handleNewGame } = this.props;
    if (user) {
      return (
        <Button onClick={handleNewGame} isColor='dark'>
          New Game
        </Button>
      );
    }
    return <React.Fragment />;
  }

  private getAuthButton(): JSX.Element {
    const { user, signOut } = this.props;
    if (user) {
      return (
        <Button onClick={signOut} className='sign-out' isColor='primary'>
          Sign Out
        </Button>
      );
    }
    return <FirebaseSignIn />;
  }
}

export default connect(
  (state: AppState) => ({
    user: state.firebase.user
  }),
  {
    signOut: firebaseActions.signOut
  }
)(Header);
