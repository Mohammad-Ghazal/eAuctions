import React, { useState, useEffect } from "react";
import axios from "axios";

export const CreateAuction = () => {
  const [starterBid, setStarterBid] = useState();
  const [startdate, setStartDate] = useState();
  const [enddate, setEndDate] = useState();
  const [bidjump, setBidJump] = useState();
  const [item, setItem] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/items`, {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInBheW1lbnRSZWYiOm51bGwsInVzZXJOYW1lIjoiTXVhdGggTmFoaGFzIiwiaWF0IjoxNjM0NTA1NDE3LCJleHAiOjE2MzQ1MDkwMTd9.jya2gc8KibZQ0OSnuQ4QjLsOLD3SoEERuQmkcIiA8L4"}`,
        },
      })
      .then((res) => {
        setItem(res.data.items);
        console.log(res.data.items);
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
  const click = () => {};
  return (
    <div>
      <h1>create Auction</h1>
      {item &&
        item.map((element, index) => {
          return (
            <select>
              <option></option>
              <option></option>
              <option></option>
              <option></option>
            </select>
          );
        })}

      <input type="number" placeholder="starter_bid" onChange={starter_bid} />
      <input type="date" placeholder="start_date" onChange={start_date} />
      <input type="date" placeholder="end_date" onChange={end_date} />
      <input type="number" placeholder="bid_jump" onChange={bid_jump} />
      <button value="Submit" onClick={click} />
    </div>
  );
};
