import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <div id="wrapper">
        <ul className="sidebar navbar-nav">
          <li className="nav-item active">
            <Link to={"/home"} className="nav-link">
              <i className="fas fa-home"></i>
              <span>&nbsp;&nbsp;Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/blanks"} className="nav-link">
              <i className="fas fa-home"></i>
              <span>&nbsp;&nbsp;Blanks</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/artwork"} className="nav-link">
              <i className="fas fa-home"></i>
              <span>&nbsp;&nbsp;Artwork</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/mockupGenerator"} className="nav-link">
              <i className="fas fa-home"></i>
              <span>&nbsp;&nbsp;Mockup Generator</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/settings"} className="nav-link">
              <i className="fas fa-home"></i>
              <span>&nbsp;&nbsp;Settings</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/fileupload"} className="nav-link">
              <i className="fas fa-fw fa-file-archive"></i>
              <span>&nbsp;&nbsp;File Upload</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
