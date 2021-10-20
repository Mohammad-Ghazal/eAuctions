import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyItem.css";
import swal from "sweetalert";

export const MyItem = () => {
  const [item, setItem] = useState();
  const token=localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        setItem(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const click = (e, index) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/items/${e}`)
          .then((result) => {
            if (result.data.success) {
              let arr = [...item];
              arr.splice(index, 1);
              setItem([...arr]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  return (
    <div className="create_Auction">
      {item &&
        item.map((element, index) => {
          return (
            <div key={index}>
              <textarea>{element.details}</textarea>
              <input defaultValue={element.title}></input>
              <img alt="Card" src={`${element.image}`} />
              <hr></hr>
              <button onClick={() => click(element.item_id)}>Delete</button>
              <button onClick={click}>Update</button>
            </div>
          );
        })}
    </div>
  );
};
