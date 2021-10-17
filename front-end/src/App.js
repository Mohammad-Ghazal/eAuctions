import "./App.css";
import { Route, Switch } from "react-router-dom";
import SideBar from "./component/sideBar/SideBar";
import { Footer } from "./component/footer/footer";
import NavBar from "./component/navBar/NavBar";
import { AllAuctions } from "./component/allAuctions/AllAuctions";
import Login from "./component/login";
// import StripeContainer from "./component/stripe/StripeContainer";
// import { CreateAuction } from "./component/createAuction/CreateAuction";
// import { MyAuction } from "./component/myAuctions/MyAuction";
// import { CreateItem } from "./component/createItem/CreateItem";
// import Calendar from "./component/calendar";
import CountDown from "./component/liveAuction/countDown/CountDown";
import LiveAction from "./component/liveAuction/liveAction";

function App() {
  
  return (
    <div className="App">
      <NavBar />
      <SideBar />

      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/AllAuctions" component={AllAuctions} />
        {/* <Route exact path="/CreateAuction" component={CreateAuction} />
        <Route exact path="/MyAuction" component={MyAuction} /> */}
        <Route path="/live-auction/:auctionId" component={LiveAction} />
      </Switch>
      {/* <CreateItem /> */}
      {/* <Calendar/> */}
      <Footer />
    </div>
  );
}

export default App;
