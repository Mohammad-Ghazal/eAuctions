import React, { useState } from "react";
import GoogleBtn from "./googleAuth";
import axios from "axios";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { Avatar } from "primereact/avatar";
import { Captcha } from "primereact/captcha";
import { useDispatch } from "react-redux";
import { setToken, setUserName } from "../actions/authAction";
import { useHistory } from "react-router";
import "./loginForm.css";
import "./loginBtn.css";
const Login = () => {
  const [showMessage, setShowMessage] = useState(false);
  // const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(true);
  const history = useHistory();

  const showResponse = (res) => {
    axios
      .post(
        "/login/captcha",
        {},
        {
          headers: {
            Authorization: `Bearer ${res.response}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data);
        if (result.data.success === "pass") {
          setDisable(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validate = (data) => {
    let errors = {};

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address. E.g. example@email.com";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    }

    if (!data.accept) {
      errors.accept = "You need to agree to the terms and conditions.";
    }

    return errors;
  };

  const onSubmit = (data, form) => {
    // setFormData(data);
    setShowMessage(true);
    axios
      .post("/login", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user_name);
        dispatch(setToken(res.data.token));
        dispatch(setUserName(res.data.user_name));
      })
      .catch((error) => {
        console.log(error);
      });

    form.restart();
  };

  // tokenReducer;

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const dialogFooter = (
    <div className="p-d-flex p-jc-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false, history.push(`/Home`))}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="login_div">
      <div className="p-d-flex">
        <img
          className="login_image"
          alt=""
          style={{
            width: "100%",
          }}
          src="https://www.mswipe.com/assets/images/signIn_marchant_mswipe_Illustrations.svg"
        ></img>
      </div>

      <Divider layout="vertical">
        <div className="p-d-inline-flex p-ai-center">
          <i className="pi pi-lock"></i>
        </div>
      </Divider>

      <div className="form-demo">
        <Dialog
          visible={showMessage}
          onHide={() => setShowMessage(false)}
          position="top"
          footer={dialogFooter}
          showHeader={false}
          breakpoints={{ "960px": "80vw" }}
          style={{ width: "30vw" }}
        >
          <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
            <i
              className="pi pi-check-circle"
              style={{ fontSize: "5rem", color: "var(--green-500)" }}
            ></i>
            <h5>Login Successful!</h5>
          </div>
        </Dialog>

        <div className="p-d-flex p-jc-center">
          <div className="card">
            <h5 className="p-text-center">Sign-In </h5>
            <Avatar
              icon="pi pi-user"
              className="p-mr-2"
              size="large"
              style={{
                backgroundColor: "#b297ce",
                color: "#ffffff",
                marginLeft: "40%",
              }}
              shape="circle"
            />
            <Form
              onSubmit={onSubmit}
              initialValues={{
                email: "",
                password: "",
              }}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="p-fluid">
                  <Field
                    name="email"
                    render={({ input, meta }) => (
                      <div className="p-field">
                        <span className="p-float-label p-input-icon-right">
                          <i className="pi pi-envelope" />
                          <InputText
                            id="email"
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="email"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Email*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="password"
                    render={({ input, meta }) => (
                      <div className="p-field">
                        <span className="p-float-label">
                          <Password
                            id="password"
                            {...input}
                            toggleMask
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                            header={passwordHeader}
                            footer={passwordFooter}
                          />
                          <label
                            htmlFor="password"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Password*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="accept"
                    type="checkbox"
                    render={({ input, meta }) => (
                      <div className="p-field-checkbox">
                        <Checkbox
                          inputId="accept"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="accept"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          I agree to the terms and conditions*
                        </label>
                      </div>
                    )}
                  />
                  <Captcha
                    siteKey="6LfRDdMcAAAAADY5m3wNCj-rZSAno20ceYF4_JBh"
                    onResponse={showResponse}
                  ></Captcha>

                  <Button
                    disabled={disable}
                    type="submit"
                    label="Submit"
                    className="p-mt-2"
                  />
                  <div
                    style={{
                      fontSize: "10px",
                      paddingTop: "10%",
                      display: "flex",
                      flexDirection: "row",
                      textAlign: "center",
                      gap: "1%",
                    }}
                  >
                    <span className="Spans">Sign in with</span>{" "}
                    <GoogleBtn></GoogleBtn>{" "}
                    <img
                      style={{ width: "100px" }}
                      src="https://www.pngall.com/wp-content/uploads/5/Google-Logo-PNG-Free-Image.png"
                      alt=""
                    ></img>
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
