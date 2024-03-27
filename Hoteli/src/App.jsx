import React, { Component, Suspense } from "react";
import { Route, NavLink, Routes, HashRouter } from "react-router-dom";
import './Header.css'
import logo from './assets/Logo-removebg-preview.png'

const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));
const Contact = React.lazy(() => import("./Contact"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <header className="App-header">
        <div className="App">
          
        <img id='logo' src={logo} alt="logo-img" />
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            
            <li> 
                <div className="dropdown">
                    <p className="dropbtn">SERVICES	▼ </p>
                            
                    <div className="dropdown-content">
                        <a href="#">Restaurant</a>
                        <a href="#">Spa</a>
                        <a href="#">Sauna</a>
                        <a href="#">Gym</a>
                        <a href="#">Pool</a>
                        <a href="#">Activities</a>
                    </div>
                </div>
            </li> 
            <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
        <button id="booking-btn">BOOK NOW</button>
          <div className="content">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/about" element={<About />}></Route>
                <Route exact path="/contact" element={<Contact />}></Route>
              </Routes>
            </Suspense>
          </div>
        </div>
        </header>
      </HashRouter>
    );
  }
}

export default App;