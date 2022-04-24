import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import Footer from "../elements/footer";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default class Blanks extends Component {
  constructor(props) {
    super(props);
    this.file = "";
    this.url = "https://gowtham-rest-api-crud.herokuapp.com/";
    this.token = localStorage.getItem("token");
  }

  state = {
    files: [],
    redirect: false,
    isLoading: false,
    showModal: false,
  };

  componentDidMount() {
    let header = document.getElementById("sidebarContent");
    let navs = header.getElementsByClassName("nav-item");
    for (let i = 0; i < navs.length; i++) {
      navs[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
      });
    }
    document.getElementById("navBlank").classList.add("active");

    axios
      .get(this.url + "fileupload", { params: { token: this.token } })
      .then((response) => {
        this.file = "";
        const files = response.data.data.files;
        this.setState({ files: files });
      })
      .catch((error) => {
        this.setState({ toDashboard: true });
        console.log(error);
      });
  }

  handleChange = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      this.file = event.target.files[0];
      document.getElementById("fileLabel").innerHTML =
        event.target.files[0].name;
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    let bodyFormData = new FormData();
    bodyFormData.append("file", this.file);
    bodyFormData.set("token", this.token);
    axios
      .post(this.url + "fileupload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result.data.status) {
          this.componentDidMount();
          this.setState({ redirect: true, isLoading: false, showModal: false });
        }
      })
      .catch((error) => {
        this.setState({ toDashboard: true });
        console.log(error);
      });
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
    axios
      .delete(this.url + "filedelete/" + id, { params: { token: this.token } })
      .then((response) => {
        this.componentDidMount();
      })
      .catch((error) => {
        console.log(error.toString());
        this.componentDidMount();
      });
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
                style={{ "justify-content": "space-between" }}
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
                {this.state.files.map((files, index) => (
                  <div
                    className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3"
                    key={files.id}
                  >
                    <img
                      src={this.url + "/uploads/students/" + files.name}
                      style={{ width: "100%", height: "100%" }}
                      alt={files.name}
                    />
                    <button
                      value={files.id}
                      className={"btn btn-sm btn-danger delete" + files.id}
                      style={{ position: "absolute", margin: "5px -70px" }}
                      onClick={this.handleClickDelete}
                    >
                      Delete &nbsp;
                      <span
                        className="spinner-border spinner-border-sm d-none"
                        id={"delete" + files.id}
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
