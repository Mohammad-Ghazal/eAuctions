import React, { Component } from "react";
import BigCalendar from "react-big-calendar-like-google";
import moment from "moment";
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

//use redux her to get all auctions from DB.

function Calendar() {
  const events = [
    {
      title: "All Day Event very long title",
      bgColor: "#ff7f50",
      allDay: true,
      start: new Date(2021, 10, 0),
      end: new Date(2021, 10, 1),
    },

    {
      title: "Conference",
      bgColor: "#e9967a",
      start: new Date(2021, 10, 11),
      end: new Date(2021, 10, 13),
      desc: "Big conference for important people",
    },

    {
      title: "Lunch",
      bgColor: "#cd5c5c",
      start: new Date(2015, 3, 12, 12, 0, 0, 0),
      end: new Date(2015, 3, 12, 13, 0, 0, 0),
      desc: "Power lunch",
    },
  ];
  return (
    <div
      style={{
        width: "50vw",
        height: "70vh",
        resize: "both",
        overflow: "hidden",
        backgroundImage:
          "linear-gradient(rgba(251,233,169,1) 0%, rgba(246,158,29,0.93) 90% )",

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
