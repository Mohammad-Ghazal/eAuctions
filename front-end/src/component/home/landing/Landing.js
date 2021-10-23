import React from "react";
import { Link } from "react-router-dom";
import "../landing/landing.css";
function Landing() {
  return (
    <>
      <div className="landing">
        <div className="landText">
          <h3>
            {" "}
            Online auction- <br />
            for business and fundraising
          </h3>
          <p>
            Increase demand and create excitement for your products using our
            fully hosted online auction software.
          </p>
          <Link to="/CreateItem"><button className="button">Create Item</button></Link>
          <Link to="/CreateAuction"><button className="button1">Create Auction</button></Link>
        </div>
      </div>
    </>
  );
}
export default Landing;
