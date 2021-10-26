import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../profile/Profile.css";
function Profile() {
  const token = localStorage.getItem("token");

  const [profile, setprofile] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(`/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setprofile(res.data.items);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`/items/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.userData);
      });
  }, []);
  return (
    <>
      <div className="word">
        <div className="sec title-page">
          <h2>
            <span>My Profile</span>
          </h2>
        </div>
      </div>
      <div className="business" id="port">
        <div className="containerr">
          {user &&
            user.map((element, index) => {
              return (
                <div className="mt-5 d-flex justify-content-center">
                  <div className="card3">
                    <div className="d-flex align-items-center">
                      <div className="image">
                        <img
                          src="https://cdn.pixabay.com/photo/2012/04/01/18/22/user-23874_640.png"
                          alt=""
                          className="rounded"
                        />
                      </div>
                      <div className="ml-3 w-100 ">
                        <h4 className="mb-0 mt-0">{element.user_name}</h4>
                        <br />
                        <span>Email: {element.email}</span>
                        <br />
                        <br />
                        <span>Phone: {element.phone}</span>
                        <br />
                        <br />
                        <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                          <div className="d-flex flex-column">
                            <span className="articles">Account</span>
                            <span className="number1">
                              {element.is_deleted === 0 ? "Avilable" : "Closed"}
                            </span>
                          </div>
                          <div className="d-flex flex-column">
                            <span className="followers">UserId</span>
                            <span className="number2">{element.user_id}</span>
                          </div>
                          <div className="d-flex flex-column">
                            <span className="rating">Role</span>
                            <span className="number3">
                              {element.role_id === 5 ? "User" : "Admin"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          <div className="business-content">
            {profile &&
              profile.map((element, index) => {
                return (
                  <div key={index} className="card-b">
                    <img src={`${element.image}`} alt="" />
                    <div className="info">
                      <h5>Title: {element.title}</h5>
                      <p>Details: {element.details}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="business_button3">
            <Link to="/MyItem">
              <button className="btn_button3">Update Items</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
