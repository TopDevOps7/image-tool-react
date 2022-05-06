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
    designs: [],
    blankList: [],
    files: [],
    startBlankFlag: -1,
    startDesignFlag: -1,
    startMockupFlag: -1,
    results: "",
  };

  componentDidMount() {
    this.setState({ isLoading: false });
    if (
      !(
        localStorage.getItem("designs") === null ||
        localStorage.getItem("designs") === "" ||
        localStorage.getItem("designs") === []
      )
    ) {
      this.state.designs = JSON.parse(localStorage.getItem("designs"));
    }

    if (
      !(
        localStorage.getItem("files") === null ||
        localStorage.getItem("files") === "" ||
        localStorage.getItem("files") === []
      )
    ) {
      this.state.files = JSON.parse(localStorage.getItem("files"));
    }

    if (
      !(
        localStorage.getItem("blankList") === null ||
        localStorage.getItem("blankList") === "" ||
        localStorage.getItem("blankList") === []
      )
    ) {
      this.state.blankList = JSON.parse(localStorage.getItem("blankList"));
    }
    this.setState({
      startBlankFlag: -1,
      startDesignFlag: -1,
      startMockupFlag: -1,
    });
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

    // axios
    //   .get(this.url + "fileupload", { params: { token: this.token } })
    //   .then((response) => {
    //     const files = response.data.data.files;
    //     this.setState({ files: files });
    //   })
    //   .catch((error) => {
    //     this.setState({ toDashboard: true });
    //     console.log(error);
    //   });
  }

  handleNext = () => {
    const { activeStep } = this.state;
    let nextFlag = false;

    switch (activeStep) {
      case 0:
        this.state.startBlankFlag >= 0 && (nextFlag = true);
        break;

      case 1:
        this.state.startDesignFlag >= 0 && (nextFlag = true);
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
    this.setState({
      activeStep: 0,
      startBlankFlag: -1,
      startDesignFlag: -1,
      startMockupFlag: -1,
    });
  };

  isValidated(img, type) {
    if (type === 0) {
      if (img) {
        // if (this.state.startBlankFlag>=0) {
        document.getElementById(`blank_${this.state.startBlankFlag}`) &&
          (document.getElementById(
            `blank_${this.state.startBlankFlag}`
          ).style.display = "none");
        document.getElementById(`blank_${img.id}`).style.display = "inline";

        this.setState({ startBlankFlag: img.id });
      }
    } else {
      if (img) {
        document.getElementById(`design_${this.state.startDesignFlag}`) &&
          (document.getElementById(
            `design_${this.state.startDesignFlag}`
          ).style.display = "none");
        document.getElementById(`design_${img.id}`).style.display = "inline";

        this.setState({ startDesignFlag: img.id });
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
              {this.state.files.map((file) => (
                <div
                  className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3"
                  key={file.id}
                >
                  <img
                    src={file.file}
                    style={{ width: "100%", height: "100%", cursor: "pointer" }}
                    alt={file.id}
                    onClick={() => this.isValidated(file, 0)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="green"
                    className="bi bi-bookmark-check"
                    viewBox="0 0 16 16"
                    style={{
                      position: "absolute",
                      margin: "3px -30px",
                      display:
                        this.state.startBlankFlag === file.id
                          ? "inline"
                          : "none",
                    }}
                    id={"blank_" + file.id}
                  >
                    <path
                      fillRule="evenodd"
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
              {this.state.designs.map((design) => (
                <div
                  className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3"
                  key={design.id}
                >
                  <img
                    src={design.design}
                    style={{ width: "100%", height: "100%", cursor: "pointer" }}
                    alt={design.id}
                    onClick={() => this.isValidated(design, 1)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="green"
                    className="bi bi-bookmark-check"
                    viewBox="0 0 16 16"
                    style={{
                      position: "absolute",
                      margin: "3px -30px",
                      display:
                        this.state.startDesignFlag === design.id
                          ? "inline"
                          : "none",
                    }}
                    id={"design_" + design.id}
                  >
                    <path
                      fillRule="evenodd"
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
          let selectedBlankFile =
            this.state.files[this.state.startBlankFlag].file;
          let selectedBlank =
            this.state.blankList[this.state.startBlankFlag].blank;
          let selectedDesign =
            this.state.designs[this.state.startDesignFlag].design;

          fabric.Image.fromURL(selectedBlankFile, function (img) {
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
              scaleX: (canvas.width * 0.9) / img.width,
              scaleY: (canvas.width * 0.9) / img.width,
            });
          });
          fabric.Image.fromURL(selectedDesign, function (myImg) {
            canvas.setOverlayImage(myImg, canvas.renderAll.bind(canvas), {
              left: selectedBlank.details.left,
              top: selectedBlank.details.top,
              scaleX: (selectedBlank.details.zoomX * 80) / myImg.width,
              scaleY: (selectedBlank.details.zoomY * 80) / myImg.width,
              originX: "center",
              originY: "center",
            });
          });
          let results = [];
          if (
            !(
              localStorage.getItem("results") === null ||
              localStorage.getItem("results") === "" ||
              localStorage.getItem("results") === []
            )
          )
            results = JSON.parse(localStorage.getItem("results"));

          results.push(canvas.toDataURL("image/png", 1.0));
          localStorage.setItem("results", JSON.stringify(results));
        }, 50);

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
                {this.state.startBlankFlag >= 0 &&
                  this.state.startDesignFlag >= 0 && (
                    <div className="row">
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                        <img
                          src={this.state.files[this.state.startBlankFlag].file}
                          style={{ width: "100%", height: "100%" }}
                          alt="blank"
                        />
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 mb-3">
                        <img
                          src={
                            this.state.designs[this.state.startDesignFlag]
                              .design
                          }
                          style={{ width: "100%", height: "100%" }}
                          alt="design"
                        />
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        );
        break;
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
