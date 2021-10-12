import logo from "./logo.svg";
import "./App.css";
import StripeContainer from "./component/stripe/StripeContainer";
import SideBar from "./component/SideBar/SideBar";
import {Footer} from "./component/footer/footer";
function App() {
  return( <div className="App">
<SideBar/>
<Footer/>
  </div>
  )
}

export default App;
