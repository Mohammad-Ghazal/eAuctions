import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../profile/Profile.css";
function Profile() {
    const token = localStorage.getItem("token");

  const [profile, setprofile] = useState();
  useEffect(() => {
    axios.get(`http://localhost:5000/items/profile`,{ headers: {
        Authorization: `Bearer ${token}`,
      },}).then((res) => {
      console.log(res.data.item);
      setprofile(res.data.item);
    });
  }, []);
  return (
    <>
      <div className="business" id="port">
        <div className="containerr">
          <div className="title">
            <h2 className="section-title">My Profile</h2>
            <p>
              Business Auctions are single-seller systems designed to allow
              clients the ability to list merchandise and/or services for sale
              as the exclusive seller
            </p>
          </div>
          <div className="business-content">
            {profile &&
              profile.map((element, index) => {
                return (
                  <div key={index} className="card-b">
                    <img src={`${element.image}`} alt="" />
                    <div className="info">
                      <h4>{element.user_name}</h4>
                      <h4>{element.phone}</h4>
                      <h4>{element.email}</h4>
                      <h5>Title: {element.title}</h5>
                    </div>
                  </div>
                );
              })}
             
          </div>
          <div className="business_button3"><Link to="/MyItem"><button className="btn_button3">Update Items</button></Link></div>
        </div>
      </div>
    </>
  );
}
export default Profile;
