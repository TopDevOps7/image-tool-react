import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import Footer from "../elements/footer";
import { Link } from "react-router-dom";

export default class MockupGenerator extends Component {
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
                <div className="col-12">MockupGenerator</div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
