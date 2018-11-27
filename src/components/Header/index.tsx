import { 
  Navbar, NavbarEnd, NavbarItem, NavbarStart
} from 'bloomer';
import * as React from 'react';

import FirebaseSignIn from '../../firebase'

interface IProps {
  name?: string;
  signOut: () => void
}

export default function Header(props: IProps) {
  const {
    name,
    signOut
  } = props;

  function getAuthButton():JSX.Element {
    if (name) {
      return (
        <button
          className='button is-primary'
          onClick={signOut}
          >
          Sign Out
        </button>
      )
    }
    return (
      <FirebaseSignIn />
    )
  }

  return (
    <Navbar style={{backgroundColor: 'lightgrey'}}>
      <NavbarStart>
        <NavbarItem>
          Poker
        </NavbarItem>
        <NavbarItem>
          <b>{name}</b>
        </NavbarItem>
      </NavbarStart>
      <NavbarEnd>
        <NavbarItem>
          {getAuthButton()}
        </NavbarItem>
      </NavbarEnd>
    </Navbar>
  );
}