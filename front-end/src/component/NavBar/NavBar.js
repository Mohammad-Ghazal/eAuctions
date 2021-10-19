import React, { useState } from "react";
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
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <div class="hori-selector">
              <div class="left"></div>
              <div class="right"></div>
            </div>
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0);">
                <i class="fas fa-tachometer-alt"></i>Dashboard
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="javascript:void(0);">
                <i class="far fa-address-book"></i>Address Book
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0);">
                <i class="far fa-clone"></i>Components
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0);">
                <i class="far fa-calendar-alt"></i>Calendar
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0);">
                <i class="far fa-chart-bar"></i>Charts
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0);">
                <i class="far fa-copy"></i>Documents
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
