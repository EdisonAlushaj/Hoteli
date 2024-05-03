import React, { Component, Suspense, useEffect } from "react";
import { Route, NavLink, Routes, HashRouter, Outlet } from "react-router-dom";
import './Header.css';
import logo from './assets/MeGusta-Horizontal-removebg-preview.png';
import Footer from "./Footer/Footer.jsx";
import AppRoutes from "./AppRoutes.jsx";

const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));
const Rooms = React.lazy(() => import("./Rooms/Rooms"));
const Contact = React.lazy(() => import("./Contact"));
const Menu = React.lazy(() => import("./Menu/Menu"));
const Login = React.lazy(() => import("./login.jsx"));
const Register = React.lazy(() => import("./register.jsx"));
const Dashboard = React.lazy(() => import("./Dashboard/dashboard"));

export const MainLayout = () => {
  // useEffect(() => {
  //   axios.get(api)
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  return (
    <div>

      <header className="App-header">
        <div className="App">
          <div className="header-content-wrapper">
            <img id='logo' src={logo} alt="logo-img" style={{ height: "7em" }} />
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
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </ul>
            <button id="booking-btn">BOOK NOW</button>
          </div>
        </div>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <HashRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <AppRoutes />
          </Suspense>
          {/* <Footer /> */}
        </HashRouter>
      </div>
    );
  }
}

export default App;
