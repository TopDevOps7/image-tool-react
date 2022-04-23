import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <div id="wrapper">
        <ul className="sidebar navbar-nav" id="sidebarContent">
          <li className="nav-item" id="navHome">
            <Link to={"/home"} className="nav-link">
              <i className="fas fa-home"></i>
              <span>&nbsp;&nbsp;Home</span>
            </Link>
          </li>
          <li className="nav-item" id="navBlank">
            <Link to={"/blanks"} className="nav-link">
              <i className="fas fa-home"></i>
              <span>&nbsp;&nbsp;Blanks</span>
            </Link>
          </li>
          <li className="nav-item" id="navArt">
            <Link to={"/artwork"} className="nav-link">
              <i className="fas fa-home"></i>
              <span>&nbsp;&nbsp;Artwork</span>
            </Link>
          </li>
          <li className="nav-item" id="navMockup">
            <Link to={"/mockupGenerator"} className="nav-link">
              <i className="fas fa-home"></i>
              <span>&nbsp;&nbsp;Mockup Generator</span>
            </Link>
          </li>
          <li className="nav-item" id="navSetting">
            <Link to={"/settings"} className="nav-link">
              <i className="fas fa-home"></i>
              <span>&nbsp;&nbsp;Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
