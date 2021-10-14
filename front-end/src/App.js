import "./App.css";
import StripeContainer from "./component/stripe/StripeContainer";
import { Route, Switch } from "react-router-dom";
import SideBar from "./component/sideBar/SideBar";
import { Footer } from "./component/footer/footer";
import NavBar from "./component/navBar/NavBar";
import { AllAuctions } from "./component/allAuctions/AllAuctions";
import { CreateAuction } from "./component/createAuction/CreateAuction";
import { MyAuction } from "./component/myAuctions/MyAuction";
import { CreateItem } from "./component/createItem/CreateItem";

function App() {
  return (
    <div className="App">
      <NavBar />
      <CreateItem/>
      <Switch>
        {/*Router for Auctions*/}
        <Route exact path="/AllAuctions" component={AllAuctions} />
        <Route exact path="/CreateAuction" component={CreateAuction} />
        <Route exact path="/MyAuction" component={MyAuction} />
        {/*Router for Auctions*/}
      </Switch>
      
      <SideBar />
      <Footer />
    </div>
  );
}

export default App;
