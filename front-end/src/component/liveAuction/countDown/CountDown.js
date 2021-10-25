import React, { useState, useEffect } from "react";
import "./style.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

moment.locale("jo");
let isTimerEnd = false; //by defult auction not start and not end

function CountDown() {
  const history = useHistory();

  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [startAgain, setStartAgain] = useState("");
  let timeinterval;
  const { data } = useSelector((state) => {
    return {
      data: state.auctionReducer,
    };
  });

  useEffect(() => {
    setTimeout(() => {
      const auction = {
        start_date: moment(data.auction.start_date)
          .utcOffset(0, false)
          .format("YYYY-MM-DD HH:mm:ss"),
        end_date: moment(data.auction.end_date)
          .utcOffset(0, false)
          .format("YYYY-MM-DD HH:mm:ss"),
      };
      let date;
      console.log(auction.start_date,"auction.start_date");
      console.log(new Date(),"new Date()",new Date(auction.start_date) );
      console.log(new Date(auction.start_date) > new Date());
      
      if (new Date(auction.start_date) > new Date()) {
        //is the auction start ??
        date = Date.parse(auction.start_date);
        console.log("the auction in progress");
      } else {
        //is the auction not end ??
        if (new Date(auction.end_date) > new Date()) {
          date = Date.parse(auction.end_date);
        } else {
          //the auction is end
          isTimerEnd = true;
          console.log("the Auction has been closed");
        }
      }
      if (!isTimerEnd) {
        //the timer will start
        const restDate = new Date(date - Date.parse(new Date()));
        const deadline = new Date(
          Date.parse(new Date()) + Date.parse(restDate) //26 * 1 * 60 * 60 * 1000
        );
        InitializeClock(deadline);
      }
    }, 500);

    return () => {
      clearInterval(timeinterval);
    };
  }, [startAgain]);

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
        console.log(t.total);
        clearInterval(timeinterval);

        if (!isTimerEnd) {
          setStartAgain(true);
          // clearInterval(timeinterval);   slove the problem here
          // timeinterval = setInterval(updateClock, 0);
        }
      }
    }
    updateClock();
    timeinterval = setInterval(updateClock, 0);
  }

  return (
    <>
      <div
        className="close_div"
        style={{ visibility: isTimerEnd ? "visible" : "hidden" }}
      >
        <h1>this auction has been closed</h1>
        <button
          onClick={() => {
            history.push(`/Home`);
          }}
        >
          back to home
        </button>
      </div>
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
