import React from "react";
import {  useSelector } from "react-redux";

export const AllAuctions = () => {
  const state = useSelector((state) => {
    // state tree => reducer => state name
    return {
      token: state.tokenReducer.token,
    };
  });

  

  return (
    <div>
      <div>
        <br /> <br /> <br />
        <h1>AllAuctions</h1>
        <h3>token from redux: {state.token}</h3>
     

      </div>
    </div>
  );
};
