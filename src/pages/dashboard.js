import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import Footer from "../elements/footer";
import { Link } from "react-router-dom";

export default class Dashboard extends Component {
  componentDidMount() {
    let header = document.getElementById("sidebarContent");
    let navs = header.getElementsByClassName("nav-item");
    for (let i = 0; i < navs.length; i++) {
      navs[i].addEventListener("click", function () {
        let current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
      });
    }
    document.getElementById("navHome").classList.add("active");
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
              </ol>

              <div className="row">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-comments"></i>
                      </div>
                      <div className="mr-5">26 New Messages!</div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to={"#"}
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fas fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-warning o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-list"></i>
                      </div>
                      <div className="mr-5">11 New Tasks!</div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="#"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fas fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-shopping-cart"></i>
                      </div>
                      <div className="mr-5">123 New Orders!</div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="#"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fas fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="card-body-icon">
                        <i className="fas fa-fw fa-life-ring"></i>
                      </div>
                      <div className="mr-5">13 New Tickets!</div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="#"
                    >
                      <span className="float-left">View Details</span>
                      <span className="float-right">
                        <i className="fas fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
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
