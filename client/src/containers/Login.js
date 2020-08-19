import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../styles/style_Auth.css";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      identifier: "",
      password: "",
      rememberMe: false,
      redirect: false,
      token: "",
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  handleChange = (event) => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;
    this.setState({ [input.name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });

    axios
      .post("http://localhost:1337/auth/local", {
        identifier: this.state.identifier,
        password: this.state.password,
      })
      .then((response) => {
        console.log(
          "User data",
          response.data.user,
          "User token",
          response.data.jwt
        );

        this.state.rememberMe
          ? localStorage.setItem("token", response.data.jwt)
          : sessionStorage.setItem("token", response.data.jwt);

        this.setState({
          isLoading: false,
          redirect: true,
          token: response.data.jwt,
        });
      })
      .catch((error) => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  };

  render() {
    const { isLoading, error, redirect } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <form className="col-md-4" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="identifier"
              placeholder="Enter email or username"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="rememberMe"
              id="exampleCheck1"
              checked={this.state.rememberMe}
              onChange={this.handleChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Remember me
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AuthPage;
