import { Card } from "primereact/card";
import React, { useState, useEffect } from "react";
import "../allAuctions/AllAuctions.css";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setAuction } from "../../actions/auctionAction";

export const AllAuctions = () => {
  const [allAuctions, setAllAuctions] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

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
                footer={
                  <button
                    className="glow-on-hover"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(setAuction(element));

                      setTimeout(() => {
                        history.push(`/live-auction/${element.auction_id}`);
                      }, 2000);
                    }}
                  >
                    Show Auction
                  </button>
                }
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
