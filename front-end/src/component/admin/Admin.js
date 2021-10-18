import React, { useState, useEffect } from "react";
import axios from "axios";
import "../admin/Admin.css";
export const Admin = () => {
  const [auction, setAuction] = useState();
  const [deleted, setDeleted] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/auctions`)
      .then((res) => {
        setAuction(res.data.result);
        setDeleted(res.data.result.is_deleted);
        console.log(res.data.result);
        console.log(res.data.result[0].is_deleted);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Delete = (e) => {
    //not hard delete just update is_deleted to 1

    axios
      .delete(`http://localhost:5000/auctions/${e}`)
      .then((result) => {
        console.log("deleted",result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <table className="table table-hover table-fixed">
        <thead>
          <tr>
            <th>auction_id</th>
            <th>bid_jump</th>
            <th>closed_on</th>
            <th>details</th>
            <th>end_date</th>
            <th>image</th>
            <th>is_deleted</th>
            <th>item_id</th>
            <th>start_date</th>
            <th>starter_bid</th>
            <th>title</th>
            <th>user_id</th>
            <th>Delete</th>
          </tr>
        </thead>

        {auction &&
          auction.map((element) => {
            return (
              <>
                <tr style={{ height: "50px" }}>
                  <td>{element.auction_id}</td>
                  <td>{element.bid_jump}</td>
                  <td>{element.closed_on}</td>
                  <td>
                    <textarea rows="10" cols="50">
                      {element.details}
                    </textarea>
                  </td>
                  <td>{element.end_date}</td>
                  <td>
                    {" "}
                    <img
                      style={{ width: "200px", height: "200px" }}
                      alt="Card"
                      src={`${element.image}`}
                    />
                  </td>
                  <td>{element.is_deleted}</td>
                  <td>{element.item_id}</td>
                  <td>{element.start_date}</td>
                  <td>{element.starter_bid}</td>
                  <td>{element.title}</td>
                  <td>{element.user_id}</td>
                  <td>
                    <button onClick={Delete(element.auction_id)}>Delete</button>
                  </td>
                </tr>
              </>
            );
          })}
      </table>
    </div>
  );
};
