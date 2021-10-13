import react, { useState } from "react";
import GoogleBtn from "./googleBtn";
import axios from "axios";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={loginHandler}>
      <h3>Sign In</h3>

      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={userHandler}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={passwordHandler}
        />
      </div>

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button type="submit" className="btn1 btn btn-primary btn-block">
        Sign-in
      </button>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>
      <div>
        <GoogleBtn></GoogleBtn>
      </div>
    </form>
  );
}
export default Login;
