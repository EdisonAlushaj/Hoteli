import React, { Component, Suspense } from "react";
import { Route, NavLink, Routes, HashRouter } from "react-router-dom";
import './Header.css';
import logo from './assets/MeGusta-Horizontal-removebg-preview.png';
import Slider from './Slider/slider.jsx'; // Import the Slider component
import Footer from "./Footer/Footer.jsx";

const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));
const Rooms = React.lazy(() => import("./Rooms/Rooms"));
const Contact = React.lazy(() => import("./Contact"));
const Menu = React.lazy(() => import("./Menu"));
const Login = React.lazy(() => import("./login-register/login"));
class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <HashRouter>
          <header className="App-header">
            <div className="App">
              <div className="header-content-wrapper">
                <img id='logo' src={logo} alt="logo-img" style={{height: "7em"}}/>
                <ul>
                  <li><NavLink to="/">Home</NavLink></li>
                  <li><NavLink to="/about">About</NavLink></li>
                  <li><NavLink to="/Rooms">Rooms</NavLink></li>
                  <li>
                    <div className="dropdown">
                      <p className="dropbtn">SERVICES ▼</p>
    
                      <div className="dropdown-content">
                     <NavLink to="/Menu">Restaurant</NavLink>
                        <a href="#">Spa</a>
                        <a href="#">Sauna</a>
                        <a href="#">Gym</a>
                        <a href="#">Pool</a>
                        <a href="#">Activities</a>
                        
                     <NavLink to="/login">Login</NavLink>
                      </div>
                    </div>
                  </li>
                  <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <button id="booking-btn">BOOK NOW</button>
              </div>
            </div>
          </header>
          <main className="main-content">
            
            <div className="content">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route exact path="/" element={<Home />}></Route>
                  <Route exact path="/about" element={<About />}></Route>
                  <Route exact path="/Rooms" element={<Rooms />}></Route>
                  <Route exact path="/contact" element={<Contact />}></Route>
                  <Route exact path="/Menu" element={<Menu />}></Route>
                  <Route exact path="/login" element={<Login />}></Route>
                </Routes>
              </Suspense>
            </div>
          </main>
          <Footer />
        </HashRouter>
      </div>
    );
  }
}

export default App;
