import React from "react";
import "../allAuctions/AllAuctions.css";
function AllAuction() {
  return (
    <>
       <div class="word">
<div class="sec title-page">
<h2><span>All Auctions</span></h2>
</div>
</div>
      <div class="container-card">
        <div class="cards">
          <div class="img"></div>
          <div class="content">
            <h6 class="name">Sep 20 2021 , In BUSINESS</h6>
            <div class="des">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
                fuga esse eaque animi, tempore explicabo.
              </p>
              <h3>start Bid: 200$</h3>
            </div>
            <div class="button-container">
              <div>
                <a href="#">Show Auction ...</a>
                <div class="card-icon"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cards">
          <div class="img"></div>
          <div class="content">
            <h6 class="name">Sep 20 2021 , In BUSINESS</h6>
            <div class="des">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
                fuga esse eaque animi, tempore explicabo. tempore explicabo
              </p>
              <h3>start Bid: 200$</h3>
            </div>
            <div class="button-container">
              <div>
                <a href="#">Show Auction ...</a>
                <div class="card-icon"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cards">
          <div class="img"></div>
          <div class="content">
            <h6 class="name">Sep 20 2021 , In BUSINESS</h6>
            <div class="des">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
                fuga esse eaque animi, tempore explicabo.
              </p>
              <h3>start Bid: 200$</h3>
            </div>
            <div class="button-container">
              <div>
                <a href="#">Show Auction ...</a>
                <div class="card-icon"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cards">
          <div class="img"></div>
          <div class="content">
            <h6 class="name">Sep 20 2021 , In BUSINESS</h6>
            <div class="des">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
                fuga esse eaque animi, tempore explicabo.
              </p>
              <h3>start Bid: 200$</h3>
            </div>
            <div class="button-container">
              <div>
                <a href="#">Show Auction ...</a>
                <div class="card-icon"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cards">
          <div class="img"></div>
          <div class="content">
            <h6 class="name">Sep 20 2021 , In BUSINESS</h6>
            <div class="des">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
                fuga esse eaque animi, tempore explicabo.
              </p>
              <h3>start Bid: 200$</h3>
            </div>
            <div class="button-container">
              <div>
                <a href="#">Show Auction ...</a>
                <div class="card-icon"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cards">
          <div class="img"></div>
          <div class="content">
            <h6 class="name">Sep 20 2021 , In BUSINESS</h6>
            <div class="des">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae
                fuga esse eaque animi, tempore explicabo.
              </p>
              <h3>start Bid: 200$</h3>
            </div>
            <div class="button-container">
              <div>
                <a href="#">Show Auction ...</a>
                <div class="card-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AllAuction;

















// import { Card } from "primereact/card";
// import React, { useState, useEffect } from "react";
// import "../allAuctions/AllAuctions.css";
// import axios from "axios";
// import { useHistory } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { setAuction } from "../../actions/auctionAction";

// export const AllAuctions = function () {
//   const [allAuctions, setAllAuctions] = useState();
//   const history = useHistory();
//   const dispatch = useDispatch();

//   const { data } = useSelector((state) => {
//     return {
//       data: state.auctionReducer,
//     };
//   });

//   useEffect(() => {
//     axios.get(`http://localhost:5000/auctions`).then((res) => {
//       setAllAuctions(res.data.result);
//       console.log("allllllllllllllllllll",res.data.result)
//     });
//   }, []);

//   return (
//     <div className="s">
//       {allAuctions &&
//         allAuctions.map((element, index) => {
//           return (
//             <div key={index}>
//               <Card
//                 className="Card_Auction"
//                 title={`${element.title}`}
//                 subTitle={
//                   <div className="SubTitel">
//                     Startar Bid :{element.starter_bid}$
//                   </div>
//                 }
//                 footer={
//                   <button
//                     className="glow-on-hover"
//                     onClick={async function (e) {
//                       e.preventDefault();

//                       try {
//                         await dispatch(setAuction(element));
//                       } catch (error) {
//                         console.log(error);
//                       }
//                       history.push(`/live-auction/${element.auction_id}`);
//                     }}
//                   >
//                     Show Auction
//                   </button>
//                 }
//                 header={
//                   <img className="image" alt="Card" src={`${element.image}`} />
//                 }
//               ></Card>
//             </div>
//           );
//         })}
//     </div>
//   );
// };
