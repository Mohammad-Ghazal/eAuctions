import React from "react"
import { Link } from "react-router-dom";
import "./footer.css";

export const Footer = () => {
  return (
    <div>
    <div class="footer">
    <div class="cont">
      <div class="row-footer">
        <div class="col-footer">
          <h4>Company</h4>
          <ul>
            <li><a href="">About us</a></li>
            <li><a href="">our services</a></li>
            <li><a href="">privacy policy</a></li>
            <li><a href="">affiliate program</a></li>
          </ul>
        </div>
        <div class="col-footer">
          <h4>get help</h4>
          <ul>
            <li><a href="">FAQ</a></li>
            <li><a href="">shipping</a></li>
            <li><a href="">Returns</a></li>
            <li><a href="">Payment options</a></li>
          </ul>
        </div>
        <div class="col-footer">
          <h4>online shop</h4>
          <ul>
            <li><a href="">product</a></li>
            <li><a href="">product</a></li>
            <li><a href="">product</a></li>
            <li><a href="">product</a></li>
          </ul>
        </div>
        <div class="col-footer">
          <h4>Follow us</h4>
          <div class="social">
            <a href=""><i class="fab fa-facebook-f"></i></a>
            <a href=""><i class="fab fa-instagram"></i></a>
            <a href=""><i class="fab fa-twitter"></i></a>
            <a href=""><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};
