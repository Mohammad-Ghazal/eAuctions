import "./App.css";
import StripeContainer from "./component/stripe/StripeContainer";
import { Router } from "react-router-dom";
import SideBar from "./component/sideBar/SideBar";
import { Footer } from "./component/footer/footer";
import NavBar from "./component/navBar/NavBar";

function App() {
  return (
    <div className="App">
      {/* <Router path="/auctions" component={()=>{return <div>hello Auctions</div>}} /> */}
      <NavBar />
      <SideBar />
      <Footer/>
    </div>
  );
}

export default App;
