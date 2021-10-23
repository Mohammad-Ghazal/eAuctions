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
  const config = {
    headers: { Authorization: `Bearer ${tokenHolder.token}` },
  };
  const showWarn = (data) => {
    toast.current.show({
      severity: "warn",
      summary: "SomeOne bid",
      detail: `${data.user_name} bid by
        ${data.bid_value} for this item`,
      life: 6000,
    });
  };
  const showMsg = (msgNumber) => {
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
      case 7:
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "the user has bean on your favorites list",
          life: 5000,
        });
        break;
      case 8:
        toast.current.show({
          severity: "info",
          summary: "info Message",
          detail: "the user already on your favorites list",
          life: 5000,
        });
        break;

      default:
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
        setLastBidder(data.bid["user_name"]);
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
    socketRef.current = io.connect("http://localhost:5000");
    socketRef.current.on("yourId", (id) => {});
    socketRef.current.on("broadcast", (data) => {
      received(data);
    });
  }, [socketRef]);

  const received = (data) => {
    if (data.auctionId === auctionId)
      if (data.bidId !== myLastBidId) {
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
            showMsg(2);
          },
        });
      } else {
        showMsg(3);
      }
    } else {
      showMsg(4);
    }
  };

  const bidNow = () => {
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
          setMyLastBidId(res.data.insertId);
        }
      })
      .then(() => {
        const data = {
          user_name: tokenHolder.userName,
          bid_value: myBid,
          bidId: myLastBidId,
          auctionId,
        };
        socketRef.current.emit("bid", data);
        showMsg(5);
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 403");
        showMsg(6);
        console.log(error);
      });
  };
  const addUserToFavorite = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:5000/favUsers`, config)
      .then((res) => {
        if (
          res.data.users.filter((fav) => {
            return fav.fav_user_id == data.auction.user_id;
          }).length
        ) {
          showMsg(8);
          setColor("blue");
        } else {
          axios
            .post(
              `http://localhost:5000/favUsers/${data.auction.user_id}`,
              {},
              config
            )
            .then((res) => {
              if (res.data.success) {
                showMsg(7);
                setColor("blue");
              }
            })
            .catch((error) => {
              console.log(error);
              if (error.message === "Request failed with status code 403");
              showMsg(6);
            });
        }
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 403");
        showMsg(6);
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
  };
  const increase = (e) => {
    e.preventDefault();
    if (!bidJump) setBidJump(data.auction.bid_jump);
    if (!myBid) setBidJump(data.auction.lastBid);
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
              <i
                className="pi pi-user-plus"
                style={{ color: color }}
                onClick={addUserToFavorite}
              >
                {" "}
                favorite user{" "}
              </i>
              <label></label>
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
              <h5>
                {moment(data.auction.start_date)
                  .utcOffset(0, false)
                  .format("YYYY-MM-DD HH:mm a")}
              </h5>{" "}
            </div>
            <div>
              <h5>auction end date</h5>{" "}
            </div>
            <div>
              <h5>
                {moment(data.auction.end_date)
                  .utcOffset(0, false)
                  .format("YYYY-MM-DD HH:mm a")}
              </h5>{" "}
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
              <h5>{lastBidder}</h5>{" "}
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
                  style={{ fontSize: "35px" }}
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
