import React, { useEffect, useState } from "react";
import BigCalendar from "react-big-calendar-like-google";
import moment from "moment";
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
import axios from "axios";
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

//use redux her to get all auctions from DB.

function Calendar() {
const[event,setEvent]=useState([]);
  useEffect(()=>{
    axios.get("/auctions").then((result)=>{
      setEvent(result.data.result)
      console.log(result.data.result)
    }).catch((err)=>{

    })
  },[])
  // const events = [
  //   {
  //     title: "All Day Event very long title",
  //     bgColor: "#ff7f50",
  //     allDay: true,
  //     start: new Date(2021, 10, 0),
  //     end: new Date(2021, 10, 1),
  //   },

  //   {
  //     title: "Conference",
  //     bgColor: "#e9967a",
  //     start: new Date(2021, 10, 11),
  //     end: new Date(2021, 10, 13),
  //     desc: "Big conference for important people",
  //   },

  //   {
  //     title: "Lunch",
  //     bgColor: "#cd5c5c",
  //     start: new Date(2015, 3, 12, 12, 0, 0, 0),
  //     end: new Date(2015, 3, 12, 13, 0, 0, 0),
  //     desc: "Power lunch",
  //   },
  // ];
  const events = event.map((elem, i) => {
    return {
      allDay: true,
      title: elem.title,
      bgColor: "#" + Math.floor(Math.random() * 1677219).toString(16),
      start: moment(elem.start_date).format("YYYY-MM-DDTHH:mm:ss.SSS"),
      end: moment(elem.end_date).format("YYYY-MM-DDTHH:mm:ss.SSS"),
    };
  });

  return (
    <div
      style={{
        width: "90%",
        height: "100vh",
        margin:"3rem 2rem 3rem 3rem",
        overflow: "hidden",
        backgroundImage: "linear-gradient(#F3D5C0 0%, #D4B499 90% )",


        borderRadius: "5px",
      }}
    >
      <BigCalendar
        selectable
        events={events}
        defaultView="month"
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={(slotInfo) =>
          alert(
            `selected auction: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}` +
              `\naction: ${slotInfo.action}`
          )
        }
      />
    </div>
  );
}

export default Calendar;
