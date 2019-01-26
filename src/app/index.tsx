import * as React from "react";
import { connect } from "react-redux";

// import CardContainer from "./components/CardContainer";

import Header from "./components/Header";

interface IStateProps {
  firebase: firebase.app.App;
}

type Props = IStateProps;

class App extends React.Component<Props, any> {
  public render() {
    // tslint:disable-next-line:no-console
    console.log(this.props);
    return (
      <div className="App">
        <Header name={name} />
      </div>
    );
  }
}

export default connect<IStateProps>((state: Props) => state)(App);
