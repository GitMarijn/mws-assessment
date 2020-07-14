import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/style_Home.css";
import defaultLogo from "../images/default.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      filteredTeams: [],
      searchValue: "",
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get("https://api.collegefootballdata.com/teams")
      .then((result) =>
        this.setState({
          isLoading: false,
          teams: result.data,
        })
      )
      .catch((error) =>
        this.setState({
          error,
          isLoading: false,
        })
      );
  }

  handleChange = (event) => {
    const search = event.target.value.toLowerCase();

    this.setState({
      searchValue: search,
      filteredTeams: this.state.teams.filter(
        (team) =>
          (team.school && team.school.toLowerCase().includes(search)) ||
          (team.mascot && team.mascot.toLowerCase().includes(search))
      ),
    });
  };

  render() {
    const { filteredTeams, teams, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <React.Fragment>
        <div className="input-group input-group-lg col-sm-12">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <span className="fas fa-search"></span>
            </span>
          </div>
          <input
            type="search"
            className="form-control"
            placeholder="Search teams..."
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
        </div>

        <div className="col-sm-12 team-container">
          {!this.state.searchValue
            ? teams.map((team, index) => (
                <Link
                  key={index}
                  className="col-sm-2 team-card"
                  to={{
                    pathname: "/games/" + encodeURIComponent(team.school),
                    team: team.school,
                  }}
                >
                  <span>{team.school}</span>
                  <span>{team.mascot}</span>

                  <img
                    className="team-logo"
                    alt="logo"
                    src={team.logos === null ? defaultLogo : team.logos[1]}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultLogo;
                    }}
                  />
                </Link>
              ))
            : filteredTeams.map((team, index) => (
                <Link
                  key={index}
                  className="col-sm-2 team-card"
                  to={{
                    pathname: "/games/" + encodeURIComponent(team.school),
                    team: team.school,
                  }}
                >
                  <span>{team.school}</span>
                  <span>{team.mascot}</span>

                  <img
                    className="team-logo"
                    src={team.logos === null ? defaultLogo : team.logos[1]}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultLogo;
                    }}
                  />
                </Link>
              ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
