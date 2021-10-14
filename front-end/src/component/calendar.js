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
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1),
    },

    {
      title: "Conference",
      bgColor: "#e9967a",
      start: new Date(2015, 3, 11),
      end: new Date(2015, 3, 13),
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
        width: "50%",
        height: "50%",
        resize: "both",
        overflow: "hidden",
        backgroundImage: "linear-gradient(#85FFBD,#FFFB7D)",
        borderRadius: "5px",
      }}
    >
      <BigCalendar
        selectable
        events={events}
        defaultView="week"
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={(slotInfo) =>
          alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}` +
              `\naction: ${slotInfo.action}`
          )
        }
      />
    </div>
  );
}

export default Calendar;
