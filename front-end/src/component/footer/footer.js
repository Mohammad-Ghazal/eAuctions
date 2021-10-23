import React from "react"
import { Link } from "react-router-dom";
import "./footer.css";
import { GrFacebookOption,GrTwitter,GrLinkedin } from 'react-icons/gr'
import { FaInstagram } from 'react-icons/fa'

export const Footer = () => {
  return (
    <div>
    <div className="footer">
    <div className="cont">
      <div className="row-footer">
        <div className="col-footer">
          <h4>Company</h4>
          <ul>
            <li><a href="">About us</a></li>
            <li><a href="">our services</a></li>
            <li><a href="">privacy policy</a></li>
            <li><a href="">affiliate program</a></li>
          </ul>
        </div>
        <div className="col-footer">
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
            <li><Link to="">product</Link></li>
            <li><Link to="">product</Link></li>
            <li><Link to="">product</Link></li>
            <li><Link to="">product</Link></li>
          </ul>
        </div>
        <div className="col-footer">
          <h4>Follow us</h4>
          <div className="social">
            <a href="https://www.facebook.com/"><GrFacebookOption/></a>
            <a href=""><FaInstagram/></a>
            <a href=""><GrTwitter/></a>
            <a href=""><GrLinkedin/></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};
