import React, { Component, Suspense } from "react";
import { NavLink, HashRouter, Outlet } from "react-router-dom";
import './Header.css';
import logo from './assets/MeGusta-Horizontal-removebg-preview.png';
import Footer from "./Footer/Footer.jsx";
import AppRoutes from "./AppRoutes.jsx";
import cookieUtils from './cookieUtils';

export const MainLayout = () => {

  const userRole = cookieUtils.getUserRoleFromCookies();
  const userName = cookieUtils.getNameFromCookies();

  const logOut = () => {
    cookieUtils.clearUserRole();
    cookieUtils.clearUserId();
    cookieUtils.clearName();
    window.location.href = '/login';
  }

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
                    <NavLink to="/Gym">Gym</NavLink>
                    <NavLink to="/Pool">Pool</NavLink>
                    <NavLink to="/Activities">Activities</NavLink>
                  </div>
                </div>
              </li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              {userRole === 'Admin' && (
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              )}
              {!cookieUtils.getUserRoleFromCookies() && (
                <li><NavLink to="/login">Log In</NavLink></li>
              )}
              {cookieUtils.getUserRoleFromCookies() && (
                <li><NavLink to="/" onClick={logOut}>Log Out</NavLink></li>
              )}
              {cookieUtils.getUserRoleFromCookies() && (
                <li><NavLink to="/orderSummary"><i className="lni lni-user"></i></NavLink></li>
              )}
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

