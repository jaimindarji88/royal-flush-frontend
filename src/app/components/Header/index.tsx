import { Navbar, NavbarEnd, NavbarItem, NavbarStart } from "bloomer";
import * as React from "react";
import { withFirebase } from "react-redux-firebase";

import FirebaseSignIn from "../../modules/firebase/component";

function Header(props: any) {
  function getAuthButton(): JSX.Element {
    if (name) {
      return <button className="button is-primary">Sign Out</button>;
    }
    return <FirebaseSignIn />;
  }

  return (
    <Navbar style={{ backgroundColor: "lightgrey" }}>
      <NavbarStart>
        <NavbarItem>Poker</NavbarItem>
        <NavbarItem>
          <b>{name}</b>
        </NavbarItem>
      </NavbarStart>
      <NavbarEnd>
        <NavbarItem>{getAuthButton()}</NavbarItem>
      </NavbarEnd>
    </Navbar>
  );
}

export default withFirebase(Header);
