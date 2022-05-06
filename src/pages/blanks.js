import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import Footer from "../elements/footer";
import toBase64 from "../helper/getBaseImage";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { fabric } from "fabric";

export default class Blanks extends Component {
  constructor(props) {
    super(props);
    this.file = "";
    this.url = "https://gowtham-rest-api-crud.herokuapp.com/";
    this.token = localStorage.getItem("token");
  }

  state = {
    files: [],
    blankList: [],
    redirect: false,
    isLoading: false,
    showModal: false,
    disableInput_file: false,
    disableButton_file: true,
    disableButton_name: true,
    disableButton_x: false,
    disableButton_y: false,
    disableButton_angle: false,
    disableButton_width: false,
    disableButton_height: false,
    canvasData: "",
    newBlank: "",
    blankName: "",
    positionX: 0,
    positionY: 0,
    angle: 0,
    width: 80,
    height: 80,
    zoomX: 1,
    zoomY: 1,
    rect: new fabric.Rect({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      angle: 0,
      fill: "#fff0",
      stroke: "black",
      strokeWidth: 1,
    }),
    canvas: new fabric.Canvas("canvas"),
  };

  componentDidMount() {
    this.setState({ isLoading: false });
    if (
      !(localStorage.getItem("files") === null || localStorage.getItem("files") === "" || localStorage.getItem("files") === [])
    ) {
      this.setState({ files: JSON.parse(localStorage.getItem("files")) });
    }

    if (
      !(
        localStorage.getItem("blankList") === null ||
        localStorage.getItem("blankList") === "" ||
        localStorage.getItem("blankList") === []
      )
    ) {
      this.setState({ blankList: JSON.parse(localStorage.getItem("blankList")) });
    }

    let header = document.getElementById("sidebarContent");
    let navs = header.getElementsByClassName("nav-item");
    for (let i = 0; i < navs.length; i++) {
      navs[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0] && (current[0].className = current[0].className.replace(" active", ""));
      });
    }
    document.getElementById("navBlank").classList.add("active");

    // axios
    //   .get(this.url + "fileupload", { params: { token: this.token } })
    //   .then((response) => {
    //     this.file = "";
    //     const files = response.data.data.files;
    //     this.setState({ files: files });
    //   })
    //   .catch((error) => {
    //     this.setState({ toDashboard: true });
    //     console.log(error);
    //   });
  }

  handleChange = async (event) => {
    this.setState({ disableButton_file: false, disableInput_file: true });
    let _this = this;
    event.preventDefault();
    if (event.target.files[0]) {
      this.file = event.target.files[0];
      document.getElementById("fileLabel").innerHTML = event.target.files[0].name;
      this.setState({ newBlank: await toBase64(this.file) });
      _this.state.canvas = new fabric.Canvas("canvas");

      fabric.Image.fromURL(this.state.newBlank, function (img) {
        _this.state.canvas.setDimensions({
          width: _this.state.canvas.width * 0.9,
          height: img.height * ((_this.state.canvas.width * 0.9) / img.width),
        });

        _this.state.canvas.setBackgroundImage(img, _this.state.canvas.renderAll.bind(_this.state.canvas), {
          scaleX: _this.state.canvas.width / img.width,
          scaleY: _this.state.canvas.width / img.width,
        });

        _this.state.positionX === 0 && (_this.state.positionX = _this.state.canvas.width / 2 - _this.state.width / 2);
        _this.state.positionY === 0 && (_this.state.positionY = _this.state.canvas.height / 2 - _this.state.height / 2);

        _this.state.rect = new fabric.Rect({
          left: _this.state.positionX,
          top: _this.state.positionY,
          width: _this.state.width,
          height: _this.state.height,
          angle: _this.state.angle,
          fill: "#fff0",
          stroke: "black",
          strokeWidth: 1,
        });

        _this.state.canvas.add(_this.state.rect);

        _this.state.rect.drawControls = function () {
          let i = this._calculateCurrentDimensions();

          _this.state.positionX = this.left;
          _this.state.positionY = this.top;
          _this.state.zoomX = this.zoomX;
          _this.state.zoomY = this.zoomY;
          _this.state.angle = this.angle;
          _this.state.width = i.x - this.cornerSize;
          _this.state.height = i.y - this.cornerSize;

          _this.state.canvasData = {
            data: "data",
            details: {
              left: _this.state.positionX + _this.state.width / 2,
              top: _this.state.positionY + _this.state.height / 2,
              zoomX: _this.state.zoomX,
              zoomY: _this.state.zoomY,
            },
          };
        };

        _this.setState({
          canvasData: {
            data: "data",
            details: {
              left: _this.state.positionX + _this.state.width / 2,
              top: _this.state.positionY + _this.state.height / 2,
              zoomX: _this.state.zoomX,
              zoomY: _this.state.zoomY,
            },
          },
        });
        _this.state.canvas.renderAll();

        _this.state.canvas.on("object:modified", function (_event) {
          _this.state.rect.set({
            left: _event.target.left,
            top: _event.target.top,
            zoomX: _event.target.zoomX,
            zoomY: _event.target.zoomY,
          });

          _this.setState({});
          _this.state.canvas.dirty = true;
          _this.state.canvas.renderAll();
        });
      });

      // fabric.Image.fromURL(
      //   this.url + "/uploads/students/PuVZXwcLlq.png",
      //   function (myImg) {
      //     const bg = myImg.set({
      //       scaleX: canvas.width / myImg.width / 2,
      //       scaleY: canvas.width / myImg.height / 2,
      //       left: canvas.width / 2 - 70,
      //       top: 80,
      //       width: myImg.width,
      //       angle: 0,
      //       height: myImg.height,
      //       layer: 0,
      //     });
      //     canvas.add(bg);
      //   }
      // );
    }
  };

  handleSubmit = (event) => {
    console.log(this.state.canvasData);
    event.preventDefault();
    if (this.state.canvasData.data === "") return;
    let new_blanks = this.state.blankList;
    console.log(this.state.blankName);
    new_blanks.push({
      id: this.state.blankList.length,
      blank: this.state.canvasData,
      name: this.state.blankName,
    });
    this.setState({ canvasData: { data: "" } });
    this.setState({ blankList: new_blanks });
    let new_files = this.state.files;
    new_files.push({
      id: this.state.files.length,
      file: this.state.newBlank,
      name: this.state.blankName,
    });
    this.setState({ files: new_files });
    console.log(this.state.blankList);
    localStorage.setItem("blankList", JSON.stringify(this.state.blankList));
    localStorage.setItem("files", JSON.stringify(this.state.files));
    console.log(this.state.blankList);
    this.setState({ isLoading: true });

    // let bodyFormData = new FormData();
    // bodyFormData.append("file", this.file);
    // bodyFormData.set("token", this.token);
    // axios
    //   .post(this.url + "fileupload", bodyFormData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((result) => {
    //     if (result.data.status) {
    this.componentDidMount();
    this.setState({ redirect: true, isLoading: false, showModal: false });
    //     }
    //   })
    //   .catch((error) => {
    //     this.setState({ toDashboard: true });
    //     console.log(error);
    //   });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/blanks" />;
    }
  };

  handleClickDelete = (event) => {
    const id = event.target.value;
    document.getElementById("delete" + id).classList.remove("d-none");
    const preview = document.querySelectorAll(".delete" + id);
    preview[0].setAttribute("disabled", true);

    let filtered_files = this.state.files.filter(function (file, index, arr) {
      return file.id != id;
    });
    filtered_files.map((file, index) => {
      filtered_files[index].id = index;
    });
    this.setState({ files: filtered_files });
    localStorage.setItem("files", JSON.stringify(filtered_files));

    let filtered_blankList = this.state.blankList.filter(function (blank, index, arr) {
      return blank.id != id;
    });
    filtered_blankList.map((blank, index) => {
      filtered_blankList[index].id = index;
    });
    this.setState({ blankList: filtered_blankList });
    localStorage.setItem("blankList", JSON.stringify(filtered_blankList));

    this.componentDidMount();

    // axios
    //   .delete(this.url + "filedelete/" + id, { params: { token: this.token } })
    //   .then((response) => {
    //     this.componentDidMount();
    //   })
    //   .catch((error) => {
    //     console.log(error.toString());
    //     this.componentDidMount();
    //   });
  };

  handleBlankNameChange = (event) => {
    this.state.blankName = event.target.value;
    event.target.value === "" ? this.setState({ disableButton_name: true }) : this.setState({ disableButton_name: false });
  };

  handleXChange = (event) => {
    this.state.positionX = Number(event.target.value);
    event.target.value === "" ? this.setState({ disableButton_x: true }) : this.setState({ disableButton_x: false });
    this.state.rect.set({ left: this.state.positionX });
    this.state.canvas.renderAll();
  };

  handleYChange = (event) => {
    this.state.positionY = Number(event.target.value);
    event.target.value === "" ? this.setState({ disableButton_y: true }) : this.setState({ disableButton_y: false });
    this.state.rect.set({ top: this.state.positionY });
    this.state.canvas.renderAll();
  };

  handleAngleChange = (event) => {
    this.state.angle = Number(event.target.value);
    event.target.value === "" ? this.setState({ disableButton_angle: true }) : this.setState({ disableButton_angle: false });
    this.state.rect.set({ angle: this.state.angle });
    this.state.canvas.renderAll();
  };

  handleWidthChange = (event) => {
    this.state.width = Number(event.target.value);
    event.target.value === "" ? this.setState({ disableButton_width: true }) : this.setState({ disableButton_width: false });
    this.state.rect.set({ width: this.state.width });
    this.state.canvas.renderAll();
  };

  handleHeightChange = (event) => {
    this.state.height = Number(event.target.value);
    event.target.value === "" ? this.setState({ disableButton_height: true }) : this.setState({ disableButton_height: false });
    this.state.rect.set({ height: this.state.height });
    this.state.canvas.renderAll();
  };

  render() {
    const isLoading = this.state.isLoading;
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
              <ol className="breadcrumb" style={{ justifyContent: "space-between" }}>
                <div className="d-flex mt-1">
                  <li className="breadcrumb-item">
                    <Link to={"/home"}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Blanks</li>
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() =>
                    this.setState({
                      showModal: true,
                      disableInput_file: false,
                      disableButton_file: true,
                      disableButton_name: true,
                      disableButton_x: false,
                      disableButton_y: false,
                      disableButton_angle: false,
                      disableButton_width: false,
                      disableButton_height: false,
                      positionX: 0,
                      positionY: 0,
                    })
                  }
                >
                  Add New Blank
                </button>
              </ol>

              <Modal
                id="blankModal"
                show={this.state.showModal}
                onHide={() => {
                  this.setState({ showModal: false });
                  this.file = "";
                }}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-vcenter">Add New Blank</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-12 mt-2">
                          <div className="input-group input-group-lg">
                            <div className="custom-file">
                              <input
                                type="file"
                                onChange={this.handleChange}
                                disabled={this.state.disableInput_file ? true : false}
                                className="custom-file-input"
                                id="fileInput"
                              />
                              <label className="custom-file-label" id="fileLabel" htmlFor="fileInput">
                                Choose file
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 mt-2">
                          <div
                            className="input-group input-group-lg"
                            style={{
                              width: "fit-content",
                              height: "auto",
                              margin: "0 auto",
                            }}
                          >
                            <canvas
                              id="canvas"
                              style={{
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4 mt-2">
                          X :{" "}
                          <input
                            className={"form-control " + (this.state.authError ? "is-invalid" : "")}
                            id="inputX"
                            placeholder="Position X"
                            value={this.state.positionX}
                            type="text"
                            onChange={this.handleXChange}
                          />
                        </div>
                        <div className="col-md-4 mt-2">
                          Y :{" "}
                          <input
                            className={"form-control " + (this.state.authError ? "is-invalid" : "")}
                            id="inputY"
                            placeholder="Position Y"
                            value={this.state.positionY}
                            type="text"
                            onChange={this.handleYChange}
                          />
                        </div>
                        <div className="col-md-4 mt-2">
                          Angle :{" "}
                          <input
                            className={"form-control " + (this.state.authError ? "is-invalid" : "")}
                            id="inputAngle"
                            placeholder="Angle"
                            value={this.state.angle}
                            type="text"
                            onChange={this.handleAngleChange}
                          />
                        </div>
                        <div className="col-md-4 mt-2">
                          Width :{" "}
                          <input
                            className={"form-control " + (this.state.authError ? "is-invalid" : "")}
                            id="inputWidth"
                            placeholder="Width"
                            value={this.state.width}
                            type="text"
                            onChange={this.handleWidthChange}
                          />
                        </div>
                        <div className="col-md-4 mt-2">
                          Height :{" "}
                          <input
                            className={"form-control " + (this.state.authError ? "is-invalid" : "")}
                            id="inputHeight"
                            placeholder="Height"
                            value={this.state.height}
                            type="text"
                            onChange={this.handleHeightChange}
                          />
                        </div>
                        <div className="col-md-12 mt-3">
                          <input
                            className={"form-control " + (this.state.authError ? "is-invalid" : "")}
                            id="inputBlankName"
                            placeholder="Blank Name"
                            type="text"
                            onChange={this.handleBlankNameChange}
                          />
                        </div>
                        <div className="col-md-12 mt-4">
                          <div className="form-label-group">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                              disabled={
                                this.state.isLoading ||
                                this.state.disableButton_file ||
                                this.state.disableButton_name ||
                                this.state.disableButton_x ||
                                this.state.disableButton_y ||
                                this.state.disableButton_angle ||
                                this.state.disableButton_width ||
                                this.state.disableButton_height
                                  ? true
                                  : false
                              }
                            >
                              Upload &nbsp;&nbsp;&nbsp;
                              {isLoading ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              ) : (
                                <span></span>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {this.renderRedirect()}
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-sm btn-dark" onClick={() => this.setState({ showModal: false })}>
                    Close
                  </button>
                </Modal.Footer>
              </Modal>

              <div className="row">
                {this.state.files.map((file) => (
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3" style={{ height: "fit-content" }} key={file.id}>
                    <img src={file.file} style={{ width: "100%", height: "100%" }} alt={file.id} />
                    <button
                      value={file.id}
                      className={"btn btn-sm btn-danger delete" + file.id}
                      style={{ position: "absolute", margin: "5px -70px" }}
                      onClick={this.handleClickDelete}
                    >
                      Delete &nbsp;
                      <span
                        className="spinner-border spinner-border-sm d-none"
                        id={"delete" + file.id}
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                    <div className="text-md-center">{file.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
