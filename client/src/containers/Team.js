import React, { Component } from "react";
import axios from "axios";
import "../styles/style_Team.css";

const teamURL = window.location.pathname.split("/")[2];

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      games: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get(
        "https://api.collegefootballdata.com/games?year=2019&seasonType=regular&team=" +
          teamURL
      )
      .then((result) =>
        this.setState({
          games: result.data,
          isLoading: false,
        })
      )
      .catch((error) =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  render() {
    const { games, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <React.Fragment>
        <div className="col-sm-12 team-container">
          <h1 className="col-sm-12 team-header">
            {this.props.match.params.team}
          </h1>
          <div className="cols-sm-6 past-container">
            <span>Past games</span>
          </div>
          <div className="cols-sm-6 future-container">
            <span>Future games</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Team;
