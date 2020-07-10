import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "../src/App.css";
import Home from "./containers/Home";
import Team from "./containers/Team";

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/games/:team" component={Team} />
        </Switch>
      </div>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
