import React from "react";
import { Route, Routes } from "react-router-dom";
import {MainLayout} from "./App.jsx";
import Home from "./Home";
import About from "./About";
import Rooms from "./Rooms/Rooms";
import Contact from "./Contact";
import Menu from "./Menu/Menu";
import Login from "./login-register/login";
import Register from "./login-register/register";
import Dashboard from "./Dashboard/dashboard";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/rooms" element={<Rooms />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/menu" element={<Menu />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default AppRoutes;
