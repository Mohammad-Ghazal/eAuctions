import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleBtn from "./googleBtn";
import axios from "axios";

function SignUp() {
  const [user_name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // create new user handler
  //---------------------------

  const userHandler = async (e) => {
    e.preventDefault();
    const result = await axios
      .post("http://localhost:5000/users", {
        user_name,
        phone,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={userHandler}>
      <h3>Sign Up</h3>
      <div className="form-group">
        <label>Name</label>
        <input
          value={user_name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          className="form-control"
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group">
        <label>Phone No.</label>
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          type="tel"
          className="form-control"
          placeholder="Enter your phone number"
        />
      </div>
      <div className="form-group">
        <label>Email address</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="form-control"
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="form-control"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className="btn1 btn btn-primary btn-block">
        Sign Up
      </button>
      <p className="forgot-password text-right">
        Already registered
        <Link className="nav-link" to={"/sign-in"}>
          sign in?
        </Link>
        <GoogleBtn></GoogleBtn>
      </p>
    </form>
  );
}

export default SignUp;
