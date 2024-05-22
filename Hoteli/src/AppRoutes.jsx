import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MainLayout } from "./App.jsx";
import Home from "./Home";
import About from "./About";
import Rooms from "./Rooms/Rooms";
import Contact from "./Contact";
import Menu from "./Menu/Menu";
import Login from "./login.jsx";
import Register from "./register.jsx";
import Dashboard from "./Dashboard/dashboard";
import Pool from "./Services/Pool";
import Spa from "./Services/Spa";
import Sauna from "./Services/Sauna.jsx";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/" element={<MainLayout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/pool" element={<Pool />} />
      <Route path="/spa" element={<Spa />} />
      <Route path="/sauna" element={<Sauna />} />
    </Route>
  </Routes>
);

export default AppRoutes;
