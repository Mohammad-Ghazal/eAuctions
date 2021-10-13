import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from "axios";
import GoogleButton from "react-google-button";

// this client ID should put in .env file.
//-----------------------------------------
const clientId =
  "787313334015-8ikgfipkm1vi5t5fq9iapgls6urtarns.apps.googleusercontent.com";

//the following google auth component will be used in login & register components.
//-------------------------------------------------------------------

function GoogleBtn(props) {
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const [token, setToken] = useState("");

  const [image, setImage] = useState("");
  const [icon, setIcon] = useState("pi pi-user");

  const onLoginSuccess = (res) => {
    console.log("Login Success:", res.tokenId);
    setIcon("");
    setToken(res.tokenId);
    setImage(res.profileObj.imageUrl);
    setShowloginButton(false);
    setShowlogoutButton(true);
    axios
      .post(
        "http://localhost:5000/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const onSignoutSuccess = () => {
    setImage("");
    setIcon("pi pi-user");

    alert("You have been logged out successfully");
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
  };

  return (
    <div>
      {showloginButton ? (
        <GoogleLogin
          icon={false}
          clientId={clientId}
          buttonText="Sign In"
          render={(renderProps) => (
            <GoogleButton
              label="Google"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{
                width: "30%",
                fontSize: "12px",
                backgroundColor: "transparent",
                borderRadius: "5px",
              }}
            ></GoogleButton>
          )}
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      ) : null}

      {showlogoutButton ? (
        <GoogleLogout
          icon={false}
          clientId={clientId}
          buttonText="Sign Out"
          render={(renderProps) => (
            <GoogleButton
              label="Google"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{
                width: "30%",
                fontSize: "12px",
                backgroundColor: "transparent",
                borderRadius: "5px",
              }}
            >
              Google
            </GoogleButton>
          )}
          onLogoutSuccess={onSignoutSuccess}
        ></GoogleLogout>
      ) : null}
    </div>
  );
}

export default GoogleBtn;
