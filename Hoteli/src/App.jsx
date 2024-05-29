import React, { Component, Suspense } from "react";
import { NavLink, HashRouter, Outlet } from "react-router-dom";
import './Header.css';
import logo from './assets/MeGusta-Horizontal-removebg-preview.png';
import Footer from "./Footer/Footer.jsx";
import AppRoutes from "./AppRoutes.jsx";
import cookieUtils from './cookieUtils';

const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));
const Rooms = React.lazy(() => import("./Rooms/Rooms"));
const Contact = React.lazy(() => import("./Contact"));
const Menu = React.lazy(() => import("./Menu/Menu"));
const Login = React.lazy(() => import("./login.jsx"));
const Register = React.lazy(() => import("./register.jsx"));
const Dashboard = React.lazy(() => import("./Dashboard/dashboard"));
const Pool = React.lazy(() => import("./Services/Pool"));
const Spa = React.lazy(() => import("./Services/Spa"));
const Sauna = React.lazy(() => import("./Services/Sauna.jsx"));
const Booking = React.lazy(() => import("./Booking/RoomBooking.jsx"));

export const MainLayout = () => {

  const userRole = cookieUtils.getUserRoleFromCookies();

  return (
    <div>

      <header className="App-header">
        <div className="App">
          <div className="header-content-wrapper">
            <img id='logo' src={logo} alt="logo-img" style={{ height: "7em" }} />
            <ul>
              <li><NavLink to="/home">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/Rooms">Rooms</NavLink></li>
              <li>
                <div className="dropdown">
                  <p className="dropbtn">SERVICES ▼</p>

                  <div className="dropdown-content">
                    <NavLink to="/Menu">Restaurant</NavLink>
                    <NavLink to="/Spa">Spa</NavLink>
                    <NavLink to="/Sauna">Sauna</NavLink>
                    <a href="#">Gym</a>
                    <NavLink to="/Pool">Pool</NavLink>
                    <NavLink to="/Activities">Activities</NavLink>
                  </div>
                </div>
              </li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              {userRole === 'Admin' && (
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              )}
              <li><NavLink to="/">Log Out</NavLink></li>
            </ul>
            <button id="booking-btn" ><NavLink to="/booking" style={{ color: "#fff" }}>BOOK NOW</NavLink></button>
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
