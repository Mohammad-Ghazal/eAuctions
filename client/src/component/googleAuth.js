import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { Button } from "primereact/button";
import "./loginBtn.css";
import { useDispatch } from "react-redux";
import { setToken, setUserName } from "../actions/authAction";
import { useHistory } from "react-router";
// this client ID should put in .env file.
//-----------------------------------------
const clientId =
  "787313334015-8ikgfipkm1vi5t5fq9iapgls6urtarns.apps.googleusercontent.com";

//the following google auth component will be used in login & register components.
//-------------------------------------------------------------------

function GoogleBtn(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [token, setReqToken] = useState("");
  const [image, setImage] = useState("");
  const [icon, setIcon] = useState("pi pi-user");
  const onLoginSuccess = (res) => {
    setIcon("");
    setReqToken(res.tokenId);
    setImage(res.profileObj.imageUrl);
    axios
      .post(
        "/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.tokenId);
        localStorage.setItem("userName", res.data.user_name);
        dispatch(setToken(res.data.tokenId));
        dispatch(setUserName(res.data.user_name));
        history.push(`/Home`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  return (
    <div>
      <GoogleLogin
        icon={false}
        clientId={clientId}
        buttonText="Sign In"
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{
              fontWeight: "bold",
              width: "90%",
              fontSize: "12px",
              backgroundColor: "red",
              borderRadius: "5px",
            }}
            className="google p-p-0"
          >
            <i className="pi pi-google p-px-2"></i>
          </Button>
        )}
        onSuccess={onLoginSuccess}
        onFailure={onLoginFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default GoogleBtn;
