import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Collapsible from "react-collapsible";
import "../styles/style_PastGames.css";

class PastGames extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamURL: window.location.pathname.split("/")[2],
      year: this.props.match.params.year,
      isLoading: false,
      error: null,
      games: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get(
        "https://api.collegefootballdata.com/games?year=" +
          this.state.year +
          "&seasonType=regular&team=" +
          this.state.teamURL
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

  handleCollaps = () => {
    document.getElementById(".collapsible").collapse("toggle");
  };

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
        <div className="col-sm-12 header">
          <Link to="/">
            <h4>Home</h4>
          </Link>
          <Link to={"/games/" + this.state.teamURL}>
            <h1>{this.props.match.params.team}</h1>
          </Link>
          <h3>{this.state.year}</h3>
        </div>

        <div className="past-games-container">
          {games.length === 0 ? (
            <span className="no-games-msg">
              This team did not play any games this year.
            </span>
          ) : (
            games.map((game, index) => (
              <div key={index} className="col-sm-3 past-games-card">
                <span>{new Date(game.start_date).toDateString()}</span>
                <h6>
                  {game.home_team} - {game.away_team}
                </h6>
                <h4>
                  {game.home_points} - {game.away_points}
                </h4>

                <Collapsible trigger="Game Details" triggerWhenOpen="Close">
                  <div className="card card-body">
                    <span className="detail-title">Venue:</span>
                    <span>{game.venue}</span>
                    <span className="detail-title">Attendance:</span>
                    <span>{game.attendance.toLocaleString()}</span>
                  </div>
                </Collapsible>
              </div>
            ))
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default PastGames;
