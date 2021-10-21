import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { confirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import CountDown from "./countDown/CountDown";
import "./style.css";
import { Image } from "primereact/image";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setBid, setAuction } from "../../actions/auctionAction";
import { Toast } from "primereact/toast";
import io from "socket.io-client";

moment.localeData();
function LiveAuction() {
  const { data } = useSelector((state) => {
    return {
      data: state.auctionReducer,
    };
  });
  const tokenHolder = useSelector((state) => {
    return {
      token: state.tokenReducer.token,
      userName: state.tokenReducer.userName,
    };
  });
  const { auctionId } = useParams(); //to get url parameters
  const [myLastBidId, setMyLastBidId] = useState("");
  const [myBid, setMyBid] = useState();
  const [bidJump, setBidJump] = useState(0);
  const [lastBid, setLastBid] = useState("");
  const [lastBidder, setLastBidder] = useState("");
  const [color, setColor] = useState("black");
  const axios = require("axios");
  const [renderedDiv, setRenderedDiv] = useState([data]);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const socketRef = useRef();

  const showWarn = (data) => {
    console.log(data);

    toast.current.show({
      severity: "warn",
      summary: "SomeOne bid",
      detail: `${data.user_name} bid by
        ${data.bid_value} for this item`,
      life: 6000,
    });
  };
  const showWarn2 = (msgNumber) => {
    switch (msgNumber) {
      case 1:
        toast.current.show({
          severity: "info",
          summary: "info Message",
          detail: "your bid process was canceled",
          life: 5000,
        });
        break;

      case 2:
        toast.current.show({
          severity: "info",
          summary: "info Message",
          detail: "your bid process was canceled",
          life: 5000,
        });
        break;

      case 3:
        toast.current.show({
          severity: "warn",
          summary: "Warn Message",
          detail: "your bid value must be grater than last bid of the auction",
          life: 5000,
        });
        break;
      case 4:
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "you have to logIn first",
          life: 5000,
        });
        break;

      case 5:
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "you bid has bean placed",
          life: 7000,
        });
        break;
      case 6:
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "your session has expired you have to logIn first",
          life: 5000,
        });
        break;
    }
  };

  const setReduxAuction = function () {
    if (
      !!typeof renderedDiv[0].auction.image &&
      !!typeof data.auction.bid_jump &&
      !!typeof data.auction.starter_bid &&
      renderedDiv[0].auction !== undefined &&
      data.auction !== undefined
    ) {
      setRenderedDiv([data]);
      setBidJump(data.auction.bid_jump);

      if (data.bid["MAX (bids.bid_value)"]) {
        setMyBid(data.bid["MAX (bids.bid_value)"] + data.auction.bid_jump);
        setLastBid(data.bid["MAX (bids.bid_value)"]);
      } else {
        setLastBid(0);
        if (data.auction.starter_bid) {
          setMyBid(data.auction.starter_bid);
        } else {
          setMyBid(0);
        }
      }
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

      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log('euseEffict');
    socketRef.current = io.connect("http://localhost:5000");
    socketRef.current.on("yourId", (id) => {});
    socketRef.current.on("broadcast", (data) => {
      console.log('broadcast');
      
      received(data);
    });
  }, [socketRef]);

  const received = (data) => {
    if (data.bidId !== myLastBidId) {
      console.log("data.bidId ", data.bidId, "myLastBidId", myLastBidId);
      showWarn(data);
    }
    setLastBidder(data.user_name);
    setLastBid(data.bid_value);
  };

  const confirm = (e) => {
    e.preventDefault();
    if (tokenHolder.token.length) {
      if (myBid > lastBid) {
        confirmDialog({
          message: `Are you sure you want to bid by ${myBid}$ ?`,
          header: "Confirmation",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            bidNow();
          },
          reject: () => {
            showWarn2(2);
          },
        });
      } else {
        showWarn2(3);
      }
    } else {
      showWarn2(4);
    }
  };

  const bidNow = () => {
    const config = {
      headers: { Authorization: `Bearer ${tokenHolder.token}` },
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
          setLastBidder(tokenHolder.userName);
          setLastBid(myBid);
          console.log("res.data.insertId", res.data.insertId);

          setMyLastBidId(res.data.insertId);
        }
      })
      .then(() => {
        const data = {
          user_name: tokenHolder.userName,
          bid_value: myBid,
          bidId: myLastBidId,
        };
        console.log("data", data);

        socketRef.current.emit("bid", data);

        showWarn2(5);
      })
      .catch((error) => {
        if (error.message == "Request failed with status code 403");

        showWarn2(6);

        console.log(error);
      });
  };

  const decrease = (e) => {
    e.preventDefault();

    if (!bidJump) setBidJump(data.auction.bid_jump);
    if (!myBid) setBidJump(data.auction.lastBid);

    if (myBid > lastBid) {
      if (myBid - bidJump > lastBid) setMyBid(myBid - bidJump);
    }
    if (myBid / 2 <= lastBid) {
      setColor("black");
    }
  };
  const increase = (e) => {
    e.preventDefault();
    if (!bidJump) setBidJump(data.auction.bid_jump);
    if (!myBid) setBidJump(data.auction.lastBid);
    if (((myBid || 0) + lastBid) / 2 >= lastBid) {
      setColor("green");
    }

    if (myBid < lastBid) setMyBid(lastBid + bidJump);
    else setMyBid((myBid || 0) + bidJump);
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
              <h5>{lastBid} $</h5>
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
                  // placeholder={lastBid + bidJumb}
                  defaultValue={lastBid + bidJump}
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
              {bidJump}$ ber jumb as minimum
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
