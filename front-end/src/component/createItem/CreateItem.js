import React, { useState } from "react";
import "../createItem/CreateItem.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import setToken from "../../actions/authAction";
export const CreateItem = () => {
  const state = useSelector((state) => {
    // state tree => reducer => state name
    return {
      token: state.tokenReducer.token,
    };
  });
  const [images, setImages] = useState(null); //for complete the fuction of firebase
  const [url, setIUrl] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(); //to send name of photo to database
  const Title = (t) => {
    setTitle(t.target.value);
  };
  const Details = (d) => {
    setDetails(d.target.value);
  };
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImages(e.target.files[0]);
      setImage(e.target.files[0].name);
    }
  };
  console.log("photoName", image);
  const handelUpload = () => {
    const uploadTask = storage.ref(`/images/${images.name}`).put(images);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(images.name)
          .getDownloadURL()
          .then((url) => {
            setIUrl(url);
            console.log(url);
            axios
              .post(
                "http://localhost:5000/items",
                { title, details, image: url },
                {
                  headers: {
                    Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInBheW1lbnRSZWYiOm51bGwsInVzZXJOYW1lIjoiTXVhdGggTmFoaGFzIiwiaWF0IjoxNjM0NjcyNTA5LCJleHAiOjE2MzQ2NzYxMDl9.nuIjDKoVbOZpnlziWC0SFywxfnOxct15lM7gtPV3_uA"}`,
                  },
                }
              )

              .then((result) => {
                console.log(result.data);
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }
    );
  };
  console.log("image", images);
  return (
    <div>
      <div className="containers">
        <div className="brand-logos"></div>
        <div className="brand-titles">Create Item</div>

        <div className="inputs">
          <label className="item_label">Title</label>
          <input className="item_input" type="text" onChange={Title} />
          <label>image</label>
          <input className="item_input" type="file" onChange={handleChange} />
          <label>Details</label>
          <textarea
            className="text_input"
            rows="5"
            cols="30"
            onChange={Details}
          />
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
