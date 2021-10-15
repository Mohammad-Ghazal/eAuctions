import React, { useState } from "react";
import "../createItem/CreateItem.css";
import axios from "axios";
import { storage } from "../firebase";
export const CreateItem = () => {
  const [image, setImage] = useState(null);
  const [url, setIUrl] = useState("");
  const [progress, setProgress] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handelUpload = () => {
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setIUrl(url);
          });
      }
    );
  };
  console.log("image", image);
  return (
    <div>
      <div className="containers">
        <div className="brand-logos"></div>
        <div className="brand-titles">Create Item</div>

        <div className="inputs">
          {/* <label className="item_label">Title</label>
          <input className="item_input" type="text" onChange={title} /> */}
          <label>image</label>
          <input className="item_input" type="file" onChange={handleChange} />
          {/* <label>Details</label>
          <textarea
            className="text_input"
            rows="5"
            cols="30"
            onChange={details}
          /> */}
          <button className="item_button" type="submit" onClick={handelUpload}>
            Submit
          </button>
          <br />
          {url}
        </div>
      </div>
    </div>
  );
};
