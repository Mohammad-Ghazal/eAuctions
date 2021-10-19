import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { MDBNotification } from "mdbreact";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { Button } from "primereact/button";
import CountDown from "./countDown/CountDown";
import "./style.css";
import { Image } from "primereact/image";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBid, setAuction } from "../../actions/auctionAction";
import { Toast } from "primereact/toast";

moment.localeData();
function LiveAuction() {
  const { data } = useSelector((state) => {
    return {
      data: state.auctionReducer,
    };
  });

  const { auctionId } = useParams(); //to get url parameters
  const [name, setName] = useState("My Name");
  const [myBid, setMyBid] = useState();
  const [bidJumb, setBidJump] = useState(0);
  const [lastBid, setLastBid] = useState("");
  const [lastBidder, setLastBidder] = useState("");
  const [color, setColor] = useState("black");
  const axios = require("axios");
  const [renderedDiv, setRenderedDiv] = useState([data]);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const showWarn = () => {
    toast.current.show({
      severity: "warn",
      summary: "Warn Message",
      detail: "Message Content",
      life: 3000,
    });
  };

  const setReduxAuction = function () {
    console.log(renderedDiv[0].auction.image);
    console.log(data.auction.bid_jump);
    console.log(data.auction.starter_bid);
    console.log(renderedDiv[0].auction);
    console.log(data.auction.bid_jump);
    console.log(data.auction);

    console.log(!!typeof renderedDiv[0].auction.image);
    console.log(!!typeof data.auction.bid_jump);
    console.log(!!typeof data.auction.starter_bid);
    console.log(renderedDiv[0].auction !== undefined);
    console.log(data.auction.bid_jump !== undefined);
    console.log(data.auction !== undefined);

    if (
      !!typeof renderedDiv[0].auction.image &&
      !!typeof data.auction.bid_jump &&
      !!typeof data.auction.starter_bid &&
      renderedDiv[0].auction !== undefined &&
      data.auction !== undefined
    ) {
      console.log(" render");
      setRenderedDiv([data]);
      console.log("bidJUMP", data.auction.bid_jump);
      console.log("starter_bid", data.auction.starter_bid);

      setBidJump(data.auction.bid_jump);
      console.log("data.auction.starter_bid", data.auction.starter_bid);
      if (data.auction.starter_bid) setMyBid(data.auction.starter_bid);

      setLastBid(data.bid["MAX (bids.bid_value)"]);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auctions/${auctionId}`)
      .then((res) => {
        dispatch(setAuction(res.data.auction));

        axios
          .get(`http://localhost:5000/bids/${auctionId}/max`)
          .then((res) => {
            dispatch(setBid(res.data.bid));
          })
          .then(setReduxAuction())
          .catch((error) => {
            console.log(error);
          });
      })
      // .then(setRenderedDiv(data))

      // .then(setReduxAuction())
      .catch((error) => {
        console.log(error);
      });

    return () => {};
  }, []);
  const confirm = () => {
    console.log("myBid", myBid, "lastBid", lastBid);

    if (myBid > lastBid) {
      confirmDialog({
        message: `Are you sure you want to bid by ${myBid}$ ?`,
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          bidNow();
        },
        reject: () => {
          toast.current.show({
            severity: "info",
            summary: "info Message",
            detail: "your bid process was canceled",
            life: 5000,
          });
        },
      });
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warn Message",
        detail: "your bid value must be grater than last bid of the auction",
        life: 5000,
      });
    }
  };

  const bidNow = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInBheW1lbnRSZWYiOm51bGwsInVzZXJOYW1lIjoiTW9oYW1tYWQgR2hhemFsIiwiaWF0IjoxNjM0NjEwNDM0LCJleHAiOjE2MzQ2MTQwMzR9.iCaPi_WSYC_vQo54iU6Y_zf5jtj28npXxFrGCkROqEw";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {
      auction_id: data.auction.auction_id,
      date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      bid_value: myBid,
    };

    axios
      .post(`http://localhost:5000/bids`, bodyParameters, config)
      .then((res) => {
        if (res.data.success) {
          setLastBidder(name);
          setLastBid(myBid);
          setMyBid(myBid + bidJumb);
          //later :: socket.emit
          toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: "you bid has bean placed",
            life: 7000,
          });
        }
      })
      .catch((error) => {
        console.log(error.message == "Request failed with status code 403");
        //  toast.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "you have to sginIn for bid",
          life: 5000,
        });
        console.log(error);
      });
  };

  const decrease = (e) => {
    e.preventDefault();

    if (!bidJumb) setBidJump(data.auction.bid_jump);

    if (myBid > lastBid) {
      if (myBid - bidJumb > lastBid) setMyBid(myBid - bidJumb);
    }
    if (myBid / 2 <= lastBid) {
      setColor("black");
    }
  };
  const increase = (e) => {
    e.preventDefault();

    console.log("myBid", myBid, "lastBid", lastBid, "bidJumb", bidJumb);

    if (((myBid || 0) + lastBid) / 2 >= lastBid) {
      setColor("green");
    }

    if (myBid < lastBid) setMyBid(lastBid + bidJumb);
    else setMyBid((myBid || 0) + bidJumb);
  };

  return (
    <div>
      <div key="onlyOne" className="live-body">
        <div className="grid-container">
          <div className="header">
            <CountDown></CountDown>
            <h2 className="title">{data.auction.title}</h2>
          </div>

          <div className="left">
            <h5>{data.auction.details}</h5>
          </div>
          <div className="middle">
            {" "}
            <Image src={data.auction.image} alt="Image" preview />
          </div>
          <div className="right">
            <div>
              {" "}
              <h5> item owner</h5>{" "}
            </div>
            <div>
              <h5> {data.auction["user_name"]}</h5>{" "}
            </div>
            <div>
              <h5>starter bid value </h5>
            </div>
            <div>
              <h5>{data.auction.starter_bid} </h5>
            </div>

            <div>
              <h5>auction start date</h5>{" "}
            </div>
            <div>
              <h5>{moment(data.start_date).format("YYYY-MM-DD HH:mm")}</h5>{" "}
            </div>
            <div>
              <h5>auction end date</h5>{" "}
            </div>
            <div>
              <h5>{moment(data.end_date).format("YYYY-MM-DD HH:mm")}</h5>{" "}
            </div>

            <div>
              <h5>price till now </h5>
            </div>
            <div>
              <h5>{data.bid["MAX (bids.bid_value)"]} $</h5>
            </div>
            <div>
              <h5>from Bidder</h5>
            </div>
            <div>
              <h5>{data.bid["user_name"]}</h5>{" "}
            </div>
          </div>
          <div className="footer">
            <div>
              <div className="input-container">
                <div className="button-glow">
                  <button className="glow" onClick={decrease}>
                    -
                  </button>
                </div>
                <input
                  type="number"
                  id="bidValue"
                  className="bidValue"
                  required
                  style={{ color: `${color}`, fontSize: "35px" }}
                  placeholder={lastBid + bidJumb}
                  defaultValue={myBid}
                  value={myBid}
                  className="font-weight-bold"
                  onChange={(e) => {
                    e.preventDefault();
                    setMyBid(parseInt(e.target.value));
                  }}
                />{" "}
                <div className="button-glow">
                  <button className="glow" onClick={increase}>
                    +
                  </button>
                </div>
              </div>
            </div>
            <h5 style={{ fontSize: "20px" }} className="font-weight-bold">
              {bidJumb}$ ber jumb as minimum
            </h5>
            <div></div>

            <button
              className="bidNow"
              className="glow bwidth"
              onClick={confirm}
            >
              Bid Now
            </button>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
}
export default LiveAuction;
/* <CountDown></CountDown>

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

        </h3>
        <Image
          src={data.image}
          alt="Image"
          preview
          src={data.image}
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
          defaultValue={data.details}
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
            <h7>{moment(data.start_date).format("YYYY-MM-DD HH:mm")}</h7>
            <h7 style={{ fontSize: "10px" }}>Oction End Date:</h7>
            <h7>{moment(data.end_date).format("YYYY-MM-DD HH:mm")}</h7>
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
            <h4 className="font-weight-bold">{sellerName} </h4>
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
                  defaultValue={myBid}
                  className="font-weight-bold"
                  onChange={(e) => {
                    setMyBid(parseInt(e.target.value));
                  }}
                />
                <label htmlFor="bidValue">Your bid:</label>
              </div>
            </form>
            <div className="container">
              <button
                className="button button-1"
                onClick={(e) => {
                  e.preventDefault();

                  if (((myBid || 0) + lastBid) / 2 >= lastBid) {
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
                {bidJumb}$ ber jumb as minimum
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
      {bigImg}} */
