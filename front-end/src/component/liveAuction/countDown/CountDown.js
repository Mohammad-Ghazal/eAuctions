import React, { useState, useEffect } from "react";
import "./style.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
moment.locale("jo");
let isEnd = false;
function CountDown() {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  let timeinterval;
  const { data } = useSelector((state) => {
    return {
      data: state.auctionReducer,
    };
  });
  useEffect(() => {
    setTimeout(() => {
      const auction = {
        start_date: moment(data.auction.start_date).utcOffset(5.9, true),
        end_date: moment(data.auction.end_date).utcOffset(5.9, true),
      };

      let date;
      if (Date.parse(auction.start_date) > new Date()) {
        date = Date.parse(auction.start_date);
        
      } else {
        if (Date.parse(auction.end_date) < new Date()) {
          date = Date.parse(auction.end_date);
       
        } else {
          isEnd = true;
        }
      }

      if (!isEnd) {
        const restDate = new Date(date - new Date());
        const deadline = new Date(
          Date.parse(new Date()) + Date.parse(restDate) //26 * 1 * 60 * 60 * 1000
        );
        InitializeClock(deadline);
      }
    }, 500);

    return () => {
      clearInterval(timeinterval);
    };
  }, []);

  //  const {setDays,setHours,setMinutes,setSeconds}=data.children

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function InitializeClock(endtime) {
    function updateClock() {
      const t = getTimeRemaining(endtime);
      setDays(t.days);
      setHours(("0" + t.hours).slice(-2));
      setMinutes(("0" + t.minutes).slice(-2));
      setSeconds(("0" + t.seconds).slice(-2));

      if (t.total <= 0) {
        console.log("hello");
        console.log(t.total)
        clearInterval(timeinterval);
         console.log(timeinterval);
        
      }
    }

    updateClock();
    timeinterval = setInterval(updateClock, 0);
  }

  return (
    <>
      <div id="clockdiv">
        <div>
          <div className="smalltext">Days</div>
          <span className="days">{days}</span>
        </div>
        <div>
          <div className="smalltext">Hours</div>
          <span className="hours">{hours}</span>
        </div>
        <div>
          <div className="smalltext">Minutes</div>
          <span className="minutes">{minutes}</span>
        </div>
        <div>
          <div className="smalltext">Seconds</div>
          <span className="seconds">{seconds}</span>
        </div>
      </div>
    </>
  );
}
export default CountDown;
