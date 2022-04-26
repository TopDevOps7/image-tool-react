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
    canvasData: "",
    newBlank: "",
  };

  componentDidMount() {
    this.setState({ isLoading: false });
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
    let header = document.getElementById("sidebarContent");
    let navs = header.getElementsByClassName("nav-item");
    for (let i = 0; i < navs.length; i++) {
      navs[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0] &&
          (current[0].className = current[0].className.replace(" active", ""));
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
    let _this = this;
    event.preventDefault();
    if (event.target.files[0]) {
      this.file = event.target.files[0];
      document.getElementById("fileLabel").innerHTML =
        event.target.files[0].name;
      this.setState({ newBlank: await toBase64(this.file) });
      const canvas = new fabric.Canvas("canvas");
      canvas.setDimensions({
        width: canvas.width * 0.9,
        height: canvas.width * 0.9,
      });

      fabric.Image.fromURL(this.state.newBlank, function (img) {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.width / img.width,
        });
      });
      let rect = new fabric.Rect({
        top: canvas.width / 2,
        left: canvas.height / 2,
        originX: "center",
        originY: "center",
        width: 80,
        height: 80,
        fill: "#fff0",
        stroke: "black",
        strokeWidth: 2,
      });
      canvas.add(rect);
      this.setState({
        canvasData: {
          data: "data",
          details: {
            top: canvas.height / 2,
            left: canvas.width / 2,
            zoomX: 1,
            zoomY: 1,
          },
        },
      });
      canvas.renderAll();

      canvas.on("object:modified", function (_event) {
        rect.set({
          top: _event.target.top,
          left: _event.target.left,
          zoomX: _event.target.zoomX,
          zoomY: _event.target.zoomY,
        });

        _this.setState({
          canvasData: {
            data: "data",
            details: {
              top: _event.target.top,
              left: _event.target.left,
              zoomX: _event.target.zoomX,
              zoomY: _event.target.zoomY,
            },
          },
        });
        canvas.dirty = true;
        canvas.renderAll();
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
    event.preventDefault();
    if (this.state.canvasData.data === "") return;
    let new_blanks = this.state.blankList;
    new_blanks.push({
      id: this.state.blankList.length,
      blank: this.state.canvasData,
    });
    this.setState({ canvasData: { data: "" } });
    this.setState({ blankList: new_blanks });
    let new_files = this.state.files;
    new_files.push({
      id: this.state.files.length,
      // id: this.state.files[this.state.files.length - 1].id + 1,
      file: this.state.newBlank,
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
      // file.id = index;
      filtered_files[index].id = index;
    });
    this.setState({ files: filtered_files });
    localStorage.setItem("files", JSON.stringify(filtered_files));

    // let filtered_blankList = this.state.blankList.slice(id + 1, 1);
    let filtered_blankList = this.state.blankList.filter(function (
      blank,
      index,
      arr
    ) {
      return blank.id != id;
    });
    filtered_blankList.map((blank, index) => {
      // blank.id = index;
      filtered_blankList[index].id = index;
    });
    // this.state.blankList = filtered_blankList;
    this.setState({ blankList: filtered_blankList });
    localStorage.setItem("blankList", JSON.stringify(filtered_blankList));
    this.setState({ isLoading: false });
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
              <ol
                className="breadcrumb"
                style={{ justifyContent: "space-between" }}
              >
                <div className="d-flex mt-1">
                  <li className="breadcrumb-item">
                    <Link to={"/home"}>Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Blanks</li>
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => this.setState({ showModal: true })}
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
                  <Modal.Title id="contained-modal-title-vcenter">
                    Add New Blank
                  </Modal.Title>
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
                                className="custom-file-input"
                                id="fileInput"
                              />
                              <label
                                className="custom-file-label"
                                id="fileLabel"
                                htmlFor="fileInput"
                              >
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
                        <div className="col-md-12 mt-4">
                          <div className="form-label-group">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                              disabled={this.state.isLoading ? true : false}
                            >
                              Upload &nbsp;&nbsp;&nbsp;
                              {isLoading ? (
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
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
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => this.setState({ showModal: false })}
                  >
                    Close
                  </button>
                </Modal.Footer>
              </Modal>

              <div className="row">
                {this.state.files.map((file) => (
                  <div
                    className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3"
                    key={file.id}
                  >
                    <img
                      src={file.file}
                      style={{ width: "100%", height: "100%" }}
                      alt={"Blank"}
                    />
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
