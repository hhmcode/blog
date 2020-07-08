import React, { Component } from "react";
import { Link } from "react-router-dom";

import M from "materialize-css/dist/js/materialize.js";

class MainNavigation extends Component {
  componentDidMount() {
    M.Sidenav.init(document.querySelectorAll(".sidenav"));
  }
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper light-blue">
            <a href="/" className="brand-logo logo">
              Logo
            </a>
            <a
              href="/"
              className="left sidenav-trigger"
              data-target="nav-mobile"
            >
              <i className="material-icons">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/Blog" className="waves-effect waves-light ">
                  <i className="material-icons left ">list</i> List All Blog
                  Posts
                </Link>
              </li>
              <li>
                <Link className="waves-effect waves-light " to="/Blog/create">
                  <i className="material-icons left">add</i> Add BLOG
                </Link>
              </li>
              <li>
                <Link className="waves-effect waves-light " to="/News">
                  <i className="material-icons left">live_tv</i> Media news
                  Fetched
                </Link>
              </li>
            </ul>
            <ul className="sidenav" id="nav-mobile">
              <li>
                <Link to="/Blog" className="waves-effect waves-light ">
                  <i className="material-icons left">list</i> List All Blog
                  Posts
                </Link>
              </li>
              <li>
                <Link className="waves-effect waves-light " to="/Blog/create">
                  <i className="material-icons left">add</i> Add BLOG
                </Link>
              </li>
              <li>
                <Link className="waves-effect waves-light " to="/News">
                  <i className="material-icons left">live_tv</i> Media news
                  Fetched
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default MainNavigation;
