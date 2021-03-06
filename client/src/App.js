import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../src/App.css";
import Home from "./containers/Home";
import Team from "./containers/Team";
import PastGames from "./containers/PastGames";
import Login from "./containers/Login";
import PrivateRoute from "./containers/PrivateRoute";

class App extends Component {
  render() {
    const App = () => (
      <BrowserRouter>
        <Switch>
          <Route path="/auth/login" component={Login} />
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/games/:team/:year" component={PastGames} />
          <Route path="/games/:team" component={Team} />
        </Switch>
      </BrowserRouter>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
