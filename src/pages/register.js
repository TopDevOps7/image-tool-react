import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { BACKEND_URL } from "../helper/constants";

export default class Register extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    redirect: false,
    authError: false,
    isLoading: false,
  };

  componentDidMount() {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", false);
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handlePwdChange = (event) => {
    this.setState({ password: event.target.value });
  };
  handleFirstNameChange = (event) => {
    this.setState({ firstname: event.target.value });
  };
  handleLastNameChange = (event) => {
    this.setState({ lastname: event.target.value });
  };
  handleUserNameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(`${BACKEND_URL}auth/signup`, data)
      .then((result) => {
        this.setState({ isLoading: false });
        if (result.data.status !== "fail") {
          this.setState({ redirect: true, authError: true });
        } else {
          this.setState({ redirect: false, authError: true });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ authError: true, isLoading: false });
      });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Register</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputFirstName"
                    className="form-control"
                    placeholder="first name"
                    name="firstName"
                    onChange={this.handleFirstNameChange}
                    required
                  />
                  <label htmlFor="inputFirstName">First Name</label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputLastName"
                    className="form-control"
                    placeholder="last name"
                    name="lastname"
                    onChange={this.handleLastNameChange}
                    required
                  />
                  <label htmlFor="inputLastName">Last Name</label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="text"
                    id="inputUserName"
                    className="form-control"
                    placeholder="user name"
                    name="username"
                    onChange={this.handleUserNameChange}
                    required
                  />
                  <label htmlFor="inputUserName">User Name</label>
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <input
                    id="inputEmail"
                    className={"form-control " + (this.state.authError ? "is-invalid" : "")}
                    placeholder="Email address"
                    type="text"
                    name="email"
                    onChange={this.handleEmailChange}
                    autoFocus
                    required
                  />
                  <label htmlFor="inputEmail">Email address</label>
                  <div className="invalid-feedback">Please provide a valid Email. or Email Exis</div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="******"
                    name="password"
                    onChange={this.handlePwdChange}
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                </div>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>
                  Register &nbsp;&nbsp;&nbsp;
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    <span></span>
                  )}
                </button>
              </div>
            </form>
            <div className="text-center">
              <Link className="d-block small mt-3" to={""}>
                Login Your Account
              </Link>
              {/* <Link className="d-block small" to={"#"}>
                Forgot Password?
              </Link> */}
            </div>
          </div>
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
}
