import React from "react";
import "../createItem/CreateItem.css";
import axios from "axios";
export const CreateItem = () => {
  const title = (t) => {
    t.target.value();
  };
  const details = (d) => {
    d.target.value();
  };
  const submit = () => {
    axios.post("http://localhost:5000/items",{title,details},)
  };
  return (
    <div>
      <div className="containers">
        <div className="brand-logos"></div>
        <div className="brand-titles">Create Item</div>
        <div className="inputs">
          <label className="item_label">Title</label>
          <input className="item_input" type="text" onChange={title} />
          <label>image</label>
          <input className="item_input" type="file" />
          <label>Details</label>
          <textarea
            className="text_input"
            rows="5"
            cols="30"
            onChange={details}
          />
          <button className="item_button" type="submit" onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
