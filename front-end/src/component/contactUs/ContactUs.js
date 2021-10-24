import React, { useState } from "react";
import "../contactUs/contactUs.css";
import axios from "axios";
import swal from "sweetalert";
function Contact() {
  const [yourName, setYourName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const submit = () => {
    setYourName("");
    setMessage("");
    setEmail("");
    axios
      .post("http://localhost:5000/contact", { yourName, email, message })

      .then((result) => {
        swal(`${result.data.message}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Email = (e) => {
    setEmail(e.target.value);
  };
  const MESSAGES = (e) => {
    setMessage(e.target.value);
  };
  const yourNAME = (e) => {
    setYourName(e.target.value);
  };
  return (
    <>
      <div className="word">
        <div className="sec title-page">
          <h2>
            <span>Contact us</span>
          </h2>
        </div>
      </div>
      <div className="container-contact">
        <div className="form">
          <img src="./images/a-1.png" alt="" />
          <h1>Contact us</h1>
          <div className="contact-form">
            <input
              Value={yourName}
              type="text"
              placeholder="YOUR NAME"
              required
              onChange={yourNAME}
            />
            <input
              type="email"
              Value={email}
              placeholder="EMAIL ADDRESS"
              required
              onChange={Email}
            />
            <textarea
              onChange={MESSAGES}
              Value={message}
              className="textarea"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="MESSAGE"
            ></textarea>
            <div class="clear">
              <button type="submit" className="btn-contact" onClick={submit}>
                Submit MESSAGE
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="con">
        <div className="card-contact">
          <img src="./images/a-2.png" alt="" />
          <h2>Call Us</h2>
          <p>(962)7877777777</p>
        </div>
        <hr />
        <div className="card-contact">
          <img src="./images/a-3.png" alt="" />
          <h2>Email Us</h2>
          <p>Sales@Auction.com</p>
        </div>
      </div>
    </>
  );
}
export default Contact;
