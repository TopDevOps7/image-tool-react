import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import TitleComponent from "./title";
import { BACKEND_URL } from "../helper/constants";
import bg from "../assets/img/Picture-Frame-on-Desk-Mockup.jpg";
import "../assets/css/auth.css";
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
      <div>
        <TitleComponent title="Image Tool"></TitleComponent>
        <div>
          <div className="row">
            <div className="col-8">
              <img className="background-image" src={bg} alt="" />
            </div>
            <div className="col-4 right-side">asdasds</div>
          </div>
        </div>
        {this.renderRedirect()}
      </div>
    );
  }
}
