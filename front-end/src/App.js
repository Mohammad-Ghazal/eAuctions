import "./App.css";
import { Route, Switch } from "react-router-dom";
import SideBar from "./component/sideBar/SideBar";
import { Footer } from "./component/footer/footer";
import NavBar from "./component/navBar/NavBar";
import { AllAuctions } from "./component/allAuctions/AllAuctions";
import Login from "./component/login";
// import StripeContainer from "./component/stripe/StripeContainer";
import { CreateAuction } from "./component/createAuction/CreateAuction";
import { MyAuction } from "./component/myAuctions/MyAuction";
import { CreateItem } from "./component/createItem/CreateItem";
// import Calendar from "./component/calendar";
import LiveAction from "./component/liveAuction/liveAction";
import LiveAuction from "./component/liveAuction/liveAuction";

import { Component404NotFound } from "./component/component404NotFound/Component404NotFound";
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className ="Perent">

     
      <SideBar />

      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/AllAuctions" component={AllAuctions} />
        <Route exact path="/CreateAuction" component={CreateAuction} />
        <Route exact path="/MyAuction" component={MyAuction} />
        <Route exact path="/CreateItem" component={CreateItem} />
        <Route path="/live-auction/:auctionId" component={LiveAuction} />
        <Route path="*" component={Component404NotFound} />
      </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
