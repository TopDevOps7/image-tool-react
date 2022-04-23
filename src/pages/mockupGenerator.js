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

  isValidated() {
    return true;
  }

  render() {
    return (
      <div className="row">
        {this.state.files.map((files, index) => (
          <div
            className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3"
            key={files.id}
          >
            <img
              src={this.url + "/uploads/students/" + files.name}
              style={{ width: "100%" }}
              alt={files.name}
            />
          </div>
        ))}
      </div>
    );
  }
}

class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondStep: "second step here",
    };
  }

  componentDidMount() {
    // console.log(this.props.prop2);
  }

  isValidated() {
    return true;
  }

  render() {
    return <div>Hey from Second</div>;
  }
}

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thirdStep: "third step here",
    };
  }

  render() {
    return <div>Hey from Third</div>;
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
