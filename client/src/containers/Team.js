import React, { Component } from "react";
import axios from "axios";
import "../styles/style_Team.css";
import { Link } from "react-router-dom";

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamURL: window.location.pathname.split("/")[2],
      teamName: this.props.match.params.team,
      isLoading: false,
      error: null,
      games: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : sessionStorage.getItem("token");

    axios
      .get(
        "http://localhost:1337/games?year.year=2020&team.school=" +
          this.state.teamURL,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  createList = () => {
    let years = [
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
      "2014",
      "2013",
      "2012",
      "2011",
      "2010",
    ];
    let list = [];

    years.forEach((year, index) =>
      list.push(
        <li key={index}>
          <Link
            to={{
              pathname: "/games/" + this.state.teamURL + "/" + year,
              team: this.state.teamName,
              year: year,
            }}
          >
            {year}
          </Link>
        </li>
      )
    );
    return <ul className="year-list">{list}</ul>;
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
        <Link to="/">
          <h4>Home</h4>
        </Link>
        <h1 className="col-sm-12 team-header">{this.state.teamName}</h1>

        <div className="col-sm-12 games-container">
          <div className="col-sm-6 past-container">
            <h4>Past games</h4>
            {this.createList()}
          </div>
          <div className="col-sm-6 future-container">
            <h4>Upcoming games</h4>
            <div>
              {games.length === 0 ? (
                <span className="no-games-msg">
                  This team does not have any future games.
                </span>
              ) : (
                games.map((game, index) => (
                  <div key={index} className="future-games-card">
                    <span>{new Date(game.start_date).toDateString()}</span>
                    <h6>
                      {game.home_team} - {game.away_team}
                    </h6>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Team;
