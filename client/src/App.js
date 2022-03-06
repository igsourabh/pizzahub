
import "./App.css";
import Navbar from "./components/Navbar";
import Details from "./components/Details";
import Cart from "./components/Cart";
import React from "react";
import Orderhistory from "./components/Orderhistory";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import User from "./components/User";
import Addadress from "./components/Addaddress";
import Contact from "./components/Contact";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/details/:id" component={Details} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/orderhistory" component={Orderhistory} />
          <Route exact path="/user" component={User} />
          <Route exact path="/addadress" component={Addadress} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
