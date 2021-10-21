import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../allAuctions/AllAuctions.css";
import "../allAuctions/AllAuctions.css";
import { setAuction } from "../../actions/auctionAction";
import axios from "axios";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
function AllAuction() {
  const [allAuctions, setAllAuctions] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`http://localhost:5000/auctions`).then((res) => {
      setAllAuctions(res.data.result);
    });
  }, []);
  return (
    <>
      <div className="word">
        <div className="sec title-page">
          <h2>
            <span>All Auctions</span>
          </h2>
        </div>
      </div>
      <div className="container-card">
        {allAuctions &&
          allAuctions.map((element, index) => {
            return (
              <div>
                <div className="cards">
                  <img src={`${element.image}`} alt="" className="img" />
                  <div className="content">
                    <h6 className="name">{element.title}</h6>
                    <div className="des">
                      <p>{element.details}</p>
                      <h3>start Bid: {element.starter_bid} $</h3>
                    </div>
                    <div className="button-container">
                      <div>
                        <button
                          className="btn"
                          onClick={async function (e) {
                            e.preventDefault();

                            try {
                              await dispatch(setAuction(element));
                            } catch (error) {
                              console.log(error);
                            }
                            history.push(`/live-auction/${element.auction_id}`);
                          }}
                        >
                          Show Auction . . . .
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
export default AllAuction;
