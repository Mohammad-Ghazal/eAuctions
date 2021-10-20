import React, { useState } from "react";
import { Link} from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  const [boolean, setboolean] = useState(false);
  return (
    <div className="headar">
      <nav class="navbar navbar-expand-custom navbar-mainbg">
        <button
          class="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars text-white"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0);">
                <i className="fas fa-tachometer-alt"></i>Dashboard
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="javascript:void(0);">
                <i className="far fa-address-book"></i>Address Book
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0);">
                <i className="far fa-clone"></i>Components
              </a>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/calender">
                <i className="far fa-calendar-alt"></i>Calendar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/OrgChart">
                <i className="far fa-chart-bar"></i>Charts
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0);">
                <i className="far fa-copy"></i>Documents
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
