import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import Footer from "../elements/footer";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactWizard from "react-bootstrap-wizard";

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.url = "https://gowtham-rest-api-crud.herokuapp.com/";
    this.token = localStorage.getItem("token");
  }

  state = {
    files: [],
    startFlag: false,
  };

  componentDidMount() {
    axios
      .get(this.url + "fileupload", { params: { token: this.token } })
      .then((response) => {
        const files = response.data.data.files;
        this.setState({ files: files });
      })
      .catch((error) => {
        this.setState({ toDashboard: true });
        console.log(error);
      });
  }

  isValidated(img) {
    if (img) {
      if (this.state.startFlag) {
        let blankId = JSON.parse(localStorage.getItem("selectedBlank")).id;
        document.getElementById(`blank_${img.id}`).style.display = "inline";
        document.getElementById(`blank_${blankId}`).style.display = "none";
      } else {
        document.getElementById(`blank_${img.id}`).style.display = "inline";
      }

      localStorage.setItem("selectedBlank", JSON.stringify(img));
    }

    if (localStorage.getItem("selectedBlank")) {
      this.setState({ startFlag: true });
      return true;
    } else {
      this.setState({ startFlag: false });
      return false;
    }
  }

  render() {
    return (
      <div className="row">
        {this.state.files.map((files) => (
          <div
            className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3"
            key={files.id}
          >
            <img
              src={this.url + "/uploads/students/" + files.name}
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
              alt={files.name}
              onClick={() => this.isValidated(files)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="green"
              class="bi bi-bookmark-check"
              viewBox="0 0 16 16"
              style={{
                position: "absolute",
                margin: "3px -30px",
                display: "none",
              }}
              id={"blank_" + files.id}
            >
              <path
                fill-rule="evenodd"
                d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
            </svg>
          </div>
        ))}
      </div>
    );
  }
}

class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.url = "https://gowtham-rest-api-crud.herokuapp.com/";
    this.token = localStorage.getItem("token");
  }

  state = {
    files: [],
    startFlag: false,
  };

  componentDidMount() {
    axios
      .get(this.url + "fileupload", { params: { token: this.token } })
      .then((response) => {
        const files = response.data.data.files;
        this.setState({ files: files });
      })
      .catch((error) => {
        this.setState({ toDashboard: true });
        console.log(error);
      });
  }

  isValidated(img) {
    if (img) {
      if (this.state.startFlag) {
        let designId = JSON.parse(localStorage.getItem("selectedDesign")).id;
        document.getElementById(`design_${img.id}`).style.display = "inline";
        document.getElementById(`design_${designId}`).style.display = "none";
      } else {
        document.getElementById(`design_${img.id}`).style.display = "inline";
      }

      localStorage.setItem("selectedDesign", JSON.stringify(img));
    }

    if (localStorage.getItem("selectedDesign")) {
      this.setState({ startFlag: true });
      return true;
    } else {
      this.setState({ startFlag: false });
      return false;
    }
  }

  render() {
    return (
      <div className="row">
        {this.state.files.map((files) => (
          <div
            className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3"
            key={files.id}
          >
            <img
              src={this.url + "/uploads/students/" + files.name}
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
              alt={files.name}
              onClick={() => this.isValidated(files)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="green"
              class="bi bi-bookmark-check"
              viewBox="0 0 16 16"
              style={{
                position: "absolute",
                margin: "3px -30px",
                display: "none",
              }}
              id={"design_" + files.id}
            >
              <path
                fill-rule="evenodd"
                d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
            </svg>
          </div>
        ))}
      </div>
    );
  }
}

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.url = "https://gowtham-rest-api-crud.herokuapp.com/";
  }

  componentDidMount() {
    if (localStorage.getItem("selectedBlank")) {
      let canvas = document.getElementById("viewport");
      let context = canvas.getContext("2d");
      // context.drawImage(document.getElementById("selectedBlankImg"), 0, 0);

      const image = new Image();
      image.src =
        this.url +
        "/uploads/students/" +
        JSON.parse(localStorage.getItem("selectedBlank")).name;
      console.log(
        this.url +
          "/uploads/students/" +
          JSON.parse(localStorage.getItem("selectedBlank")).name
      );
      image.onload = () => {
        context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-3">
          <canvas
            id="viewport"
            style={{ width: "100%", height: "100%" }}
          ></canvas>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-3">
          {localStorage.getItem("selectedBlank") &&
            localStorage.getItem("selectedDesign") && (
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                  <img
                    id="selectedBlankImg"
                    src={
                      this.url +
                      "/uploads/students/" +
                      JSON.parse(localStorage.getItem("selectedBlank")).name
                    }
                    style={{ width: "100%", height: "100%" }}
                    alt={JSON.parse(localStorage.getItem("selectedBlank")).name}
                  />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                  <img
                    src={
                      this.url +
                      "/uploads/students/" +
                      JSON.parse(localStorage.getItem("selectedDesign")).name
                    }
                    style={{ width: "100%", height: "100%" }}
                    alt={
                      JSON.parse(localStorage.getItem("selectedDesign")).name
                    }
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const steps = [
  { stepName: "Select Blank", component: FirstStep },
  { stepName: "Select Design", component: SecondStep },
  { stepName: "Generate Mockup", component: ThirdStep },
];

export default class MockupGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    localStorage.removeItem("selectedBlank");
    localStorage.removeItem("selectedDesign");

    let header = document.getElementById("sidebarContent");
    let navs = header.getElementsByClassName("nav-item");
    for (let i = 0; i < navs.length; i++) {
      navs[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
      });
    }
    document.getElementById("navMockup").classList.add("active");
  }

  finishButtonClick(allStates) {
    console.log(allStates);
  }

  render() {
    return (
      <div>
        <Header />
        <div id="wrapper">
          <Sidebar></Sidebar>
          <div id="content-wrapper">
            <div className="container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/home"}>Home</Link>
                </li>
                <li className="breadcrumb-item active">Mockup Generator</li>
              </ol>

              <div className="row">
                <div className="col-12">
                  <ReactWizard
                    steps={steps}
                    // navSteps
                    // title="this is a title"
                    // description="This is a description"
                    headerTextCenter
                    validate
                    color="primary"
                    finishButtonClick={this.finishButtonClick}
                  />
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
