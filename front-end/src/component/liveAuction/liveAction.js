import React, { useState, useEffect } from "react";
import moment from "moment";
import { MDBInput, MDBNotification } from "mdbreact";
import CountDown from "./countDown/CountDown";
import "./style.css";
import { Image } from "primereact/image";
import { useParams } from "react-router-dom";
moment.localeData();
function LiveAction() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInBheW1lbnRSZWYiOm51bGwsInVzZXJOYW1lIjoiTW9oYW1tYWQgR2hhemFsIiwiaWF0IjoxNjM0NDQ5MDM3LCJleHAiOjE2MzQ0NTI2Mzd9.taQXr_v3rN0rYy7MBddX6TCQ2JriV-vTSaticGUoXEQ";
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const auction = {
    auction_id: 1,
    user_id: 2,
    item_id: 1,
    starter_bid: 100,
    start_date: "2021-12-13T22:00:00.000Z",
    end_date: "2022-01-13T22:00:00.000Z",
    bid_jump: 25,
    closed_on: null,
    is_deleted: 0,
    item: {
      title: "1984 Rockhopper vintage mountain bike red large mens bicycle",
      item_id: 1,
      owner_id: 2,
      details:
        "Core-Line fixed gear and single speed bicycles are what we're best known for. Built on a durable steel frame with seat stay rack mounts, eyelet mounts on the fork and cable stops, the Core Line models are as stylish as they are versatile. Quality componen",
      image:
        "https://firebasestorage.googleapis.com/v0/b/bermuda-e0248.appspot.com/o/images%2Fg.jpg?alt=media&token=ac014760-e50f-4091-983b-317dc68ff0ee",
      user_name: "Muath Nahhas",
    },
    lastBid: {
      "MAX (bids.bid_value)": 100,
      user_id: 1,
      user_name: "Mohammad Ghazal",
    },
  };
  const { auctionId } = useParams(); //to get url parameters
  const [name, setName] = useState("My Name");
  const [myBid, setMyBid] = useState(
    auction.lastBid["MAX (bids.bid_value)"] + auction.bid_jump
  );
  const [bidJumb, setBidJumb] = useState(0);
  const [alert, setAlert] = useState("");
  const [lastBid, setLastBid] = useState("");
  const [lastBidder, setLastBidder] = useState("");
  const [bigImg, setBigImg] = useState("");
  const [color, setColor] = useState("black");
  const axios = require("axios");
  const showBigImg = () => {
    setBigImg(
      <Image src={auction.item.image} alt="Image" width="250" preview />
    );
  };
  useEffect(() => {
    setBidJumb(auction.bid_jump);
    setLastBidder(auction.lastBid["user_name"]);
    setLastBid(auction.lastBid["MAX (bids.bid_value)"]);
    return () => {};
  }, []);

  const bidNow = (e) => {
    e.preventDefault();

    if (myBid > lastBid) {
      axios
        .post(
          `http://localhost:5000/bids`,
          {
            auction_id: auction.auction_id,
            date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            bid_value: myBid,
          },
          config
        )
        .then((res) => {
          setLastBidder(name);
          setLastBid(myBid);
        })
        .catch((error) => {
          console.log(error);
        });

      //later :: socket.emit
    } else {
      setAlert(
        <MDBNotification
          style={{
            background: " radial-gradient(#7812b3, #09021d)",
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
          fade
          autohide={5000}
          bodyClassName="p-5 font-weight-bold white-text  ;"
          className="stylish-color-dark"
          closeClassName="blue-grey-text"
          icon="bell"
          titleClassName="elegant-color-dark white-text "
          title="Warrning"
          message="your bid, have to be grater than last one."
          iconClassName="red-text"
          show
        />
      );
      setTimeout(() => {
        setAlert("");
      }, 6000);
    }
  };

  return (
    <div className="bigContainer">
      <CountDown></CountDown>
      <form
        className="bid-form"
        style={{
          border: "1px solid #444",
          backgroundColor: " #F4F9F9 ",
          borderRadius: "2% 2% 2% 2% ",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <h3
          style={{ gridArea: "title", textAlign: "center" }}
          className="black-text mb-3 mt-3 ml-3 mr-3 font-weight-bold"
        >
          {auction.item.title}
        </h3>
        <Image
          src={auction.item.image}
          alt="Image"
          preview
          src={auction.item.image}
          style={{
            gridArea: "photo",
            objectFit: "cover",
            border: "5px solid #555",
            margin: "10px",
          }}
        />

        <textarea
          style={{
            gridArea: "textArea",
            textAlign: "center",
            textJustify: "true",
            objectFit: "cover",
            marginRight: "10px",
          }}
          className="font-weight-bold"
          value={auction.item.details}
        ></textarea>

        <div
          style={{
            gridArea: "bidInfo",
            gridAutoFlow: "column",
            marginRight: "10px",
          }}
        >
          <div
            style={{
              border: "1px solid #444",
              display: "grid",
              gridAutoFlow: "column",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <h6 style={{ fontSize: "10px" }}>Oction Start Date:</h6>
            <h7>{moment(auction.start_date).format("YYYY-MM-DD HH:mm")}</h7>
            <h7 style={{ fontSize: "10px" }}>Oction End Date:</h7>
            <h7>{moment(auction.end_date).format("YYYY-MM-DD HH:mm")}</h7>
          </div>
          <div
            style={{
              border: "1px solid #444",
              display: "grid",
              gridAutoFlow: "column",
              gap: "15px",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <h7>last bid value</h7>
            <h7>from Bidder </h7>
          </div>
          <div
            style={{
              border: "1px solid #444",
              display: "grid",
              gap: "15px",
              justifyItems: "center",
              alignItems: "center",
              gridAutoFlow: "column",
            }}
          >
            {" "}
            <div style={{ display: "flex" }}>
              <h2 className="font-weight-bold" style={{ color: "green" }}>
                {lastBid}${" "}
              </h2>
            </div>
            <div>
              <h4 className="font-weight-bold">{lastBidder} </h4>
            </div>
          </div>
          <div
            style={{
              border: "1px solid #444",
              display: "grid",
              gap: "15px",
              justifyItems: "center",

              gridAutoFlow: "column",
              alignItems: "center",
            }}
          >
            <h5 className="font-weight-bold">
              seller <br />
              name
            </h5>
            <h4 className="font-weight-bold">{auction.item.user_name} </h4>
          </div>
        </div>

        <div
          style={{
            gridArea: "bidValue",
            display: "grid",
            textAlign: "center",
            alignItems: "center",
            gridAutoFlow: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              justifyItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="container">
              <button
                className="button button-2"
                onClick={(e) => {
                  e.preventDefault();

                  if (myBid > lastBid) {
                    if (myBid - bidJumb > lastBid) setMyBid(myBid - bidJumb);
                  }
                  if (myBid / 2 <= lastBid) {
                    setColor("black");
                  }
                }}
              >
                decrease
              </button>
            </div>
            <form>
              <div className="input-field">
                <input
                  type="number"
                  id="bidValue"
                  required
                  style={{ color: `${color}`, fontSize: "35px" }}
                  placeholder={lastBid + bidJumb}
                  value={myBid}
                  className="font-weight-bold"
                  onChange={(e) => {
                    setMyBid(parseInt(e.target.value));
                  }}
                />
                <label for="bidValue">Your bid:</label>
              </div>
            </form>
            <div className="container">
              <button
                className="button button-1"
                onClick={(e) => {
                  e.preventDefault();

                  if ((myBid + lastBid) / 2 >= lastBid) {
                    setColor("green");
                  }

                  if (myBid < lastBid) setMyBid(lastBid + bidJumb);
                  else setMyBid((myBid || 0) + bidJumb);
                }}
              >
                increase
              </button>
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
            }}
          >
            <div>
              <label style={{ fontSize: "20px" }} className="font-weight-bold">
                {auction.bid_jump}$ ber jumb as minimum
              </label>
            </div>
          </div>
        </div>
        <div style={{ gridArea: "bidNow" }}>
          <button className="glow-on-hover" onClick={bidNow}>
            {" "}
            BID Now
          </button>
        </div>
      </form>
      <br />
      {alert}
      {bigImg}
    </div>
  );
}
export default LiveAction;
