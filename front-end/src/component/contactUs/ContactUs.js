import React from "react";
import "../contactUs/contactUs.css";
function Contact() {
  return (
    <>
      <div class="word">
        <div class="sec title-page">
          <h2>
            <span>Contact us</span>
          </h2>
        </div>
      </div>
      <div class="container-contact">
        <div class="form">
          <img src="./images/a-1.png" alt="" />
          <h1>Contact us</h1>
          <div class="contact-form">
            <input type="text" placeholder="YOUR NAME" required />
            <input type="email" placeholder="EMAIL ADDRESS" required />
            <textarea
              class="textarea"
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="MESSAGE"
            ></textarea>
            <div class="clear">
              <button type="submit" class="btn-contact">
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
