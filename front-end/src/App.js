import logo from "./logo.svg";
import "./App.css";
import StripeContainer from "./component/stripe/StripeContainer";
import SideBar from "./component/sideBar/SideBar";
import { Footer } from "./component/footer/Footer";
import NavBar from "./component/navBar/NavBar";
function App() {
  return (
    <div className="App">
      <NavBar />
      <SideBar />
      <Footer />
    </div>
  );
}

export default App;
