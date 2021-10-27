import React, { useState, useEffect } from "react";
import axios from "axios";
import "../createAuction/CreateAuction.css";
import moment from "moment";
import "../createItem/CreateItem.css";
import swal from "sweetalert";
function CreateAuction() {
  const [starterBid, setStarterBid] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [bidJump, setBidJump] = useState();
  const [select, setSelect] = useState();
  const [item, setItem] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setItem(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const starter_bid = (s) => {
    setStarterBid(s.target.value);
  };
  const start_date = (t) => {
    setStartDate(t.target.value);
  };
  const end_date = (e) => {
    setEndDate(e.target.value);
  };
  const bid_jump = (b) => {
    setBidJump(b.target.value);
  };
  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  const click = () => {
    console.log("muath", moment(startDate).format("YYYY-MM-DD HH:mm:ss"));
    axios
      .post(
        `/auctions`, //date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
        {
          starter_bid: starterBid,
          start_date: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
          end_date: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
          bid_jump: bidJump,
          item_id: select,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        swal("Good job!", "Auction Created Successfuly", "success");
      })
      .catch((err) => {
        swal("Try Again!");
      });
  };
  return (
    <>
      <div className="Body-FORM">
        <div class="container">
          <div class="form">
            <img src="./images/a-1.png" alt="#" />
            <h1>Create Auction</h1>
            <div class="container-form">
              <select onChange={handleChange}>
                <option>Please Select Item</option>
                {item &&
                  item.map((element) => {
                    return (
                      <option value={element.item_id}>{element.title}</option>
                    );
                  })}
              </select>
              <input
                type="number"
                placeholder="starter_bid"
                onChange={starter_bid}
              />
              <input
                type="datetime-local"
                placeholder="start_date"
                onChange={start_date}
              />{" "}
              <input
                type="datetime-local"
                placeholder="end_date"
                required
                onChange={end_date}
              />
              <input
                type="number"
                placeholder="bid_jump"
                required
                onChange={bid_jump}
              />
              <div class="clearfix">
                <button type="submit" class="signupbtn" onClick={click}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateAuction;
