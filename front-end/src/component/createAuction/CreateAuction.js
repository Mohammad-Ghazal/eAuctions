import React, { useState, useEffect } from "react";
import axios from "axios";
import "../createAuction/CreateAuction.css";

export const CreateAuction = () => {
  const [starterBid, setStarterBid] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [bidJump, setBidJump] = useState();
  const [select, setSelect] = useState();
  const [item, setItem] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/items`, {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInBheW1lbnRSZWYiOm51bGwsInVzZXJOYW1lIjoiTXVhdGggTmFoaGFzIiwiaWF0IjoxNjM0NTc3OTcyLCJleHAiOjE2MzQ1ODE1NzJ9.vna8SiWDFeBXDW8uTVnk5rw61YQ72UUZcoShp3dnnGU"}`,
        },
      })
      .then((res) => {
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
    axios
      .post(
        `http://localhost:5000/auctions`,
        {
          starter_bid: starterBid,
          start_date: startDate,
          end_date: endDate,
          bid_jump: bidJump,
          item_id: select,
        },
        {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInBheW1lbnRSZWYiOm51bGwsInVzZXJOYW1lIjoiTXVhdGggTmFoaGFzIiwiaWF0IjoxNjM0NTc3OTcyLCJleHAiOjE2MzQ1ODE1NzJ9.vna8SiWDFeBXDW8uTVnk5rw61YQ72UUZcoShp3dnnGU"}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="create_Auction">
      <h1>create Auction</h1>
      <select onChange={handleChange}>
        <option>Please Select Item</option>
        {item &&
          item.map((element, index) => {
            return <option value={element.item_id}>{element.title}</option>;
          })}
      </select>
      <input type="number" placeholder="starter_bid" onChange={starter_bid} />
      <input
        type="datetime-local"
        placeholder="start_date"
        onChange={start_date}
      />
      <input type="datetime-local" placeholder="end_date" onChange={end_date} />
      <input type="number" placeholder="bid_jump" onChange={bid_jump} />
      <button className="btn_createAuction" onClick={click}>
        Submit
      </button>
    </div>
  );
};
