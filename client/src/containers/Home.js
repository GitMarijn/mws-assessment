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
          teams: result.data,
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
    const { teams, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="col-sm-12 team-container">
        {teams.map((team, index) => (
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

            {/* <img
              className="team-logo"
              src={team.logos === null ? defaultLogo : team.logos[1]}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultLogo;
              }}
            /> */}
          </Link>
        ))}
      </div>
    );
  }
}

export default Home;
