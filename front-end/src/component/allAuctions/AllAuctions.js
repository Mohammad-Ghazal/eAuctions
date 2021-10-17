import { Card } from "primereact/card";
import React, { useState, useEffect } from "react";
import "../allAuctions/AllAuctions.css";
import axios from "axios";
export const AllAuctions = () => {
  const [allAuctions, setAllAuctions] = useState();

  useEffect(() => {
    axios.get(`http://localhost:5000/auctions`).then((res) => {
      console.log(res.data.result);
      setAllAuctions(res.data.result);
    });
  }, []);

  return (
    <div className="s">
      {allAuctions &&
        allAuctions.map((element, index) => {
          return (
            <div key={index}>
              <Card
                className="Card_Auction"
                title={`${element.title}`}
                subTitle={
                  <div className="SubTitel">
                    Startar Bid :{element.starter_bid}$
                  </div>
                }
                footer={<button className="glow-on-hover">Show Auction</button>}
                header={
                  <img className="image" alt="Card" src={`${element.image}`} />
                }
              ></Card>
            </div>
          );
        })}
    </div>
  );
};
