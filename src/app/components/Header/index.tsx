import { Navbar, NavbarEnd, NavbarItem, NavbarStart } from 'bloomer';
import * as React from 'react';
import { connect } from 'react-redux';

import FirebaseSignIn from '../../modules/firebase/component';
import { AppState } from '../../store/reducers';

import './header.css';

interface Props {
  user: firebase.User;
  handleSignOut: () => void;
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
      <div className="header">
        <Navbar style={{ backgroundColor: 'lightgrey' }}>
          <NavbarStart>
            <NavbarItem>Poker</NavbarItem>
            <NavbarItem>
              <b>{name}</b>
            </NavbarItem>
          </NavbarStart>
          <NavbarEnd>
            <NavbarItem>{this.getAuthButton()}</NavbarItem>
          </NavbarEnd>
        </Navbar>
      </div>
    );
  }
  private getAuthButton(): JSX.Element {
    const { user, handleSignOut } = this.props;
    if (user) {
      return (
        <button onClick={handleSignOut} className="sign-out button is-primary">
          Sign Out
        </button>
      );
    }
    return <FirebaseSignIn />;
  }
}

export default connect((state: AppState) => ({
  user: state.firebase.user
}))(Header);
