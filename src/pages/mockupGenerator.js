import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import Footer from "../elements/footer";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { fabric } from "fabric";

const styles = (theme) => ({
  button: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ["Select Blank", "Select Design", "Generate Mockup"];
}

class MockupGenerator extends Component {
  constructor(props) {
    super(props);
    this.url = "https://gowtham-rest-api-crud.herokuapp.com/";
    this.token = localStorage.getItem("token");
  }

  static propTypes = {
    classes: PropTypes.object,
  };

  state = {
    activeStep: 0,
    files: [],
    startBlankFlag: false,
    startDesignFlag: false,
    startMockupFlag: false,
  };

  componentDidMount() {
    localStorage.removeItem("selectedBlank");
    localStorage.removeItem("selectedDesign");

    let header = document.getElementById("sidebarContent");
    let navs = header.getElementsByClassName("nav-item");
    for (let i = 0; i < navs.length; i++) {
      navs[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0] &&
          (current[0].className = current[0].className.replace(" active", ""));
      });
    }
    document.getElementById("navMockup").classList.add("active");

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

  handleNext = () => {
    const { activeStep } = this.state;
    let nextFlag = false;

    switch (activeStep) {
      case 0:
        localStorage.getItem("selectedBlank") && (nextFlag = true);
        break;

      case 1:
        localStorage.getItem("selectedDesign") && (nextFlag = true);
        break;

      case 2:
        nextFlag = true;
        break;

      default:
        break;
    }

    nextFlag &&
      this.setState({
        activeStep: activeStep + 1,
      });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    localStorage.removeItem("selectedBlank");
    localStorage.removeItem("selectedDesign");

    this.setState({
      activeStep: 0,
      startBlankFlag: false,
      startDesignFlag: false,
    });
  };

  isValidated(img, type) {
    if (type === 0) {
      if (img) {
        if (this.state.startBlankFlag) {
          let blankId = JSON.parse(localStorage.getItem("selectedBlank")).id;
          document.getElementById(`blank_${img.id}`).style.display = "inline";
          document.getElementById(`blank_${blankId}`).style.display = "none";
        } else {
          document.getElementById(`blank_${img.id}`).style.display = "inline";
        }

        localStorage.setItem("selectedBlank", JSON.stringify(img));
      }

      if (localStorage.getItem("selectedBlank")) {
        this.setState({ startBlankFlag: true });
        return true;
      } else {
        this.setState({ startBlankFlag: false });
        return false;
      }
    } else {
      if (img) {
        if (this.state.startDesignFlag) {
          let designId = JSON.parse(localStorage.getItem("selectedDesign")).id;
          document.getElementById(`design_${img.id}`).style.display = "inline";
          document.getElementById(`design_${designId}`).style.display = "none";
        } else {
          document.getElementById(`design_${img.id}`).style.display = "inline";
        }

        localStorage.setItem("selectedDesign", JSON.stringify(img));
      }

      if (localStorage.getItem("selectedDesign")) {
        this.setState({ startDesignFlag: true });
        return true;
      } else {
        this.setState({ startDesignFlag: false });
        return false;
      }
    }
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <h3>Select Blank</h3>
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
                    onClick={() => this.isValidated(files, 0)}
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
                      display:
                        localStorage.getItem("selectedBlank") &&
                        JSON.parse(localStorage.getItem("selectedBlank")).id ===
                          files.id
                          ? "inline"
                          : "none",
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
          </div>
        );

      case 1:
        return (
          <div>
            <h3>Select Design</h3>
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
                    onClick={() => this.isValidated(files, 1)}
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
                      display:
                        localStorage.getItem("selectedDesign") &&
                        JSON.parse(localStorage.getItem("selectedDesign"))
                          .id === files.id
                          ? "inline"
                          : "none",
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
          </div>
        );

      case 2:
        setTimeout(() => {
          const canvas = new fabric.Canvas("canvas");
          canvas.setDimensions({
            width: canvas.width,
            height: canvas.width,
          });
          let blank_url =
            this.url +
            "/uploads/students/" +
            JSON.parse(localStorage.getItem("selectedBlank")).name;
          let design_url =
            this.url +
            "/uploads/students/" +
            JSON.parse(localStorage.getItem("selectedDesign")).name;
          fabric.Image.fromURL(blank_url, function (img) {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
              scaleX: canvas.width / img.width,
              scaleY: canvas.width / img.width,
            });
          });

          fabric.Image.fromURL(design_url, function (myImg) {
            const bg = myImg.set({
              scaleX: canvas.width / myImg.width / 2,
              scaleY: canvas.width / myImg.height / 2,
              left: canvas.width / 2 - 75,
              top: 80,
              width: myImg.width,
              angle: 0,
              height: myImg.height,
              layer: 0,
            });
            canvas.add(bg);
          });
        }, 100);

        return (
          <div>
            <h3>Generate Mockup</h3>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-3">
                <canvas
                  id="canvas"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid #000",
                  }}
                />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mb-3">
                {localStorage.getItem("selectedBlank") &&
                  localStorage.getItem("selectedDesign") && (
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                        <img
                          src={
                            this.url +
                            "/uploads/students/" +
                            JSON.parse(localStorage.getItem("selectedBlank"))
                              .name
                          }
                          style={{ width: "100%", height: "100%" }}
                          alt={
                            JSON.parse(localStorage.getItem("selectedBlank"))
                              .name
                          }
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                        <img
                          src={
                            this.url +
                            "/uploads/students/" +
                            JSON.parse(localStorage.getItem("selectedDesign"))
                              .name
                          }
                          style={{ width: "100%", height: "100%" }}
                          alt={
                            JSON.parse(localStorage.getItem("selectedDesign"))
                              .name
                          }
                        />
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        );

      default:
        return "Unknown step";
    }
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    if (this.state.toDashboard === true) {
      return <Redirect to="/" />;
    }

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

              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&quot;re finished
                    </Typography>
                    <Button
                      onClick={this.handleReset}
                      className={classes.button}
                    >
                      Reset
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      {this.getStepContent(activeStep)}
                    </Typography>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(MockupGenerator);
