import { Card } from "primereact/card";
import { Button } from "primereact/button";
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

  //   const header = (
  //     <img alt="Card" src="showcase/demo/images/usercard.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
  // );
  // const footer = (
  //     <span>
  //         <Button label="Show Auction" icon="pi pi-check" />

  //     </span>
  // );

  return (
    <div className="s">
      {allAuctions &&
        allAuctions.map((element, index) => {
          return (
            <div key={index}>
              <Card className="Card_Auction"
                title={`${element.title}`}
                subTitle={`Starter Bid : ${element.starter_bid} $`}
                footer={<Button className="btn_Auction" label="Show Auction" />}
                header={ 
                  <img
                  className="image"
                    alt="Card"
                    src={`${element.image}`}

                  />
                }
              >
               
              </Card>
            </div>
          );
        })}
    </div>
  );
};
