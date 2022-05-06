import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import TitleComponent from "./title";
import { BACKEND_URL } from "../helper/constants";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    redirect: false,
    authError: false,
    isLoading: false,
    location: {},
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handlePwdChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(`${BACKEND_URL}auth/signin`, data)
      .then((result) => {
        if (result.data.success) {
          localStorage.setItem("token", result.data.data.accessToken);
          this.setState({ redirect: true, isLoading: false });
          localStorage.setItem("isLoggedIn", true);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ authError: true, isLoading: false });
      });
  };

  componentDidMount() {
    localStorage.removeItem("token");
    localStorage.setItem("isLoggedIn", false);
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
  };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div className="container">
        <TitleComponent title="Image Tool"></TitleComponent>
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">
            <h3>Login</h3>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    className={"form-control " + (this.state.authError ? "is-invalid" : "")}
                    id="inputEmail"
                    placeholder="Email address"
                    type="text"
                    name="email"
                    onChange={this.handleEmailChange}
                    autoFocus
                    required
                  />
                  <label htmlFor="inputEmail">Email address</label>
                  <div className="invalid-feedback">Please provide a valid Email.</div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <input
                    type="password"
                    className={"form-control " + (this.state.authError ? "is-invalid" : "")}
                    id="inputPassword"
                    placeholder="******"
                    name="password"
                    onChange={this.handlePwdChange}
                    required
                  />
                  <label htmlFor="inputPassword">Password</label>
                  <div className="invalid-feedback">Please provide a valid Password.</div>
                </div>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>
                  Login &nbsp;&nbsp;&nbsp;
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    <span></span>
                  )}
                </button>
              </div>
              {/* <div className="form-group">
                <div className="form-group">
                  <b>email:</b> imagetooladmin@gmail.com
                </div>
                <div className="form-group">
                  <b>password :</b> adminpassword
                </div>
              </div> */}
            </form>
            <div className="text-center">
              <Link className="d-block small mt-3" to={"register"}>
                Register an Account
              </Link>
            </div>
          </div>
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
}
