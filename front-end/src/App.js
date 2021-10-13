import "./App.css";
import StripeContainer from "./component/stripe/StripeContainer";
import { Route } from "react-router-dom";
import SideBar from "./component/sideBar/SideBar";
import { Footer } from "./component/footer/footer";
import NavBar from "./component/navBar/NavBar";
import { AllAuctions } from "./component/allAuctions/AllAuctions";
import { CreateAuction } from "./component/createAuction/CreateAuction";
import { MyAuction } from "./component/myAuctions/MyAuction";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/AllAuctions" component={AllAuctions} />
      <Route exact path="/about" component={CreateAuction} />
      <Route exact path="/about" component={MyAuction} />
      <SideBar />
      <Footer />
    </div>
  );
}

export default App;
