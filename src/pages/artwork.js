import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import Footer from "../elements/footer";
import toBase64 from "../helper/getBaseImage";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default class Artwork extends Component {
  constructor(props) {
    super(props);
    this.file = "";
    this.url = "https://gowtham-rest-api-crud.herokuapp.com/";
    this.token = localStorage.getItem("token");
  }

  state = {
    designs: [],
    redirect: false,
    isLoading: false,
    showModal: false,
    disableButton: true,
    newDesign: "",
    designName: "",
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
      this.setState({ designs: JSON.parse(localStorage.getItem("designs")) });
    }

    let header = document.getElementById("sidebarContent");
    let navs = header.getElementsByClassName("nav-item");
    for (let i = 0; i < navs.length; i++) {
      navs[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0] && (current[0].className = current[0].className.replace(" active", ""));
      });
    }
    document.getElementById("navArt").classList.add("active");

    //   axios
    //     .get(this.url + "fileupload", { params: { token: this.token } })
    //     .then((response) => {
    //       this.file = "";
    //       const files = response.data.data.files;
    //       this.setState({ files: files });
    //     })
    //     .catch((error) => {
    //       this.setState({ toDashboard: true });
    //       console.log(error);
    //     });
  }

  handleChange = async (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      this.file = event.target.files[0];
      this.setState({ newDesign: await toBase64(this.file) });
      document.getElementById("fileLabel").innerHTML = event.target.files[0].name;
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    let new_designs = this.state.designs;
    new_designs.push({
      id: this.state.designs.length,
      design: this.state.newDesign,
      name: this.state.designName,
    });
    this.setState({ designs: new_designs });
    localStorage.setItem("designs", JSON.stringify(new_designs));
    this.setState({ isLoading: false });
    this.componentDidMount();
    this.setState({ redirect: true, isLoading: false, showModal: false });
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
    //       this.componentDidMount();
    //       this.setState({ redirect: true, isLoading: false, showModal: false });
    //     }
    //   })
    //   .catch((error) => {
    //     this.setState({ toDashboard: true });
    //     console.log(error);
    //   });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/artwork" />;
    }
  };

  handleClickDelete = (event) => {
    const id = event.target.value;
    document.getElementById("delete" + id).classList.remove("d-none");
    const preview = document.querySelectorAll(".delete" + id);
    preview[0].setAttribute("disabled", true);

    let filtered_designs = this.state.designs.filter(function (design, index, arr) {
      return design.id != id;
    });
    filtered_designs.map((design, index) => {
      filtered_designs[index].id = index;
    });
    this.setState({ designs: filtered_designs });
    localStorage.setItem("designs", JSON.stringify(filtered_designs));
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

  handleDesignNameChange = (event) => {
    this.setState({ designName: event.target.value });
    event.target.value === "" ? this.setState({ disableButton: true }) : this.setState({ disableButton: false });
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
                  <li className="breadcrumb-item active">Artwork</li>
                </div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => this.setState({ showModal: true, disableButton: true })}
                >
                  Add New Design
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
                  <Modal.Title id="contained-modal-title-vcenter">Add New Design</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <div className="form-row">
                        <div className="col-md-12 mt-2">
                          <div className="input-group input-group-lg">
                            <div className="custom-file">
                              <input type="file" onChange={this.handleChange} className="custom-file-input" id="fileInput" />
                              <label className="custom-file-label" id="fileLabel" htmlFor="fileInput">
                                Choose file
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 mt-2">
                          <input
                            className={"form-control " + (this.state.authError ? "is-invalid" : "")}
                            id="inputDesignName"
                            placeholder="Design Name"
                            type="text"
                            onChange={this.handleDesignNameChange}
                          />
                        </div>
                        <div className="col-md-12 mt-4">
                          <div className="form-label-group">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                              disabled={this.state.isLoading || this.state.disableButton ? true : false}
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
                {this.state.designs.map((design) => (
                  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-3" style={{ height: "fit-content" }} key={design.id}>
                    <img src={design.design} style={{ width: "100%", height: "100%" }} alt={design.id} />
                    <button
                      value={design.id}
                      className={"btn btn-sm btn-danger delete" + design.id}
                      style={{ position: "absolute", margin: "5px -70px" }}
                      onClick={this.handleClickDelete}
                    >
                      Delete &nbsp;
                      <span
                        className="spinner-border spinner-border-sm d-none"
                        id={"delete" + design.id}
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </button>
                    <div className="text-md-center">{design.name}</div>
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
