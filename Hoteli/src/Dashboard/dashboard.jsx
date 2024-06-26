import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./dashboard.css";
import RoomCrud2 from "./Crud-Functions/RoomCrud2.jsx";
import MenuCafeCrud from "./Crud-Functions/MenuCafeCrud.jsx";
import MenuFoodCrud from "./Crud-Functions/MenuFoodCrud.jsx";
import MenuDrinkCrud from "./Crud-Functions/MenuDrinkCrud.jsx";
import TableCrud from "./Crud-Functions/TableCrud.jsx";
import TableReservation from "./Crud-Functions/TableReservation.jsx";
import Hall from "./Crud-Functions/Hall.jsx";
import Pool from "./Crud-Functions/Pool.jsx";
import SpaCrud from "./Crud-Functions/SpaCrud.jsx";
import SaunaCrud from "./Crud-Functions/SaunaCrud.jsx";
import ActivitiesCrud from "./Crud-Functions/ActivitiesCrud.jsx";
import ActivitiesReservationCrud from "./Crud-Functions/ActivitiesReservationCrud.jsx";
import ShezlongForm from "./Crud-Functions/ShezlongForm.jsx";
import ContactUs from "./Crud-Functions/ContactUs.jsx";
import ShezlongReservation from "./Crud-Functions/ShezlongReservationCrud.jsx";
import Fitnes from "./Crud-Functions/Fitnes.jsx";
import FitnessEquipments from "./Crud-Functions/FitnessEquipments.jsx";
import GymReservation from "./Crud-Functions/GymReservation.jsx";
import AboutCrud from "./Crud-Functions/AboutCrud.jsx";
import OrderFood from "./Crud-Functions/OrderFood.jsx";
import OrderDrinks from "./Crud-Functions/OrderDrinks.jsx";
import OrderCoffee from "./Crud-Functions/OrderCoffee.jsx";
import SpaReservationCrud from "./Crud-Functions/SpaReservationCrud.jsx";
import SaunaReservationCrud from "./Crud-Functions/SaunaReservationCrud.jsx";
import RoomBookingCrud from "./Crud-Functions/RoomBookingCrud.jsx";
import UserInformation from "./Crud-Functions/UserInformation.jsx";

const Dashboard = () => {
  const [activeTable, setActiveTable] = useState(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const toggleTable = (table) => {
    setActiveTable((prevTable) => (prevTable === table ? null : table));
  };

  return (
    <>
      <div className="wrapper">
        <aside id="sidebar" className={isSidebarExpanded ? "expand" : ""}>
        <div className="d-flex">
  <button className="toggle-btn" type="button" onClick={toggleSidebar}>
    <i className="lni lni-grid-alt"></i>
  </button>
  <div className="sidebar-logo">
    <a href="javascript:void(0)">Dashboard</a>
  </div>
</div>
<ul className="sidebar-nav">
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("about")}
    >
      <i className="lni lni-calendar"></i>
      <span className="fw-normal">About</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("activities")}
    >
      <i className="lni lni-checkmark-circle"></i>
      <span className="fw-normal">Activities</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("activitiesReservation")}
    >
      <i className="lni lni-checkmark-circle"></i>
      <span className="fw-normal">Activities Reservation</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("cafeMenu")}
    >
      <i className="lni lni-coffee-cup"></i>
      <span className="fw-normal">Cafe Menu</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("contact")}
    >
      <i className="lni lni-cog"></i>
      <span className="fw-normal">Contact</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("drinkMenu")}
    >
      <i className="lni lni-coffee-cup"></i>
      <span className="fw-normal">Drink Menu</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("fitnes")}
    >
      <i className="lni lni-car"></i>
      <span className="fw-normal">Fitness</span>
    </NavLink>
  </li>
  {/* <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("fitnesEquipments")}
    >
      <i className="lni lni-car"></i>
      <span className="fw-normal">Fitness Equipments</span>
    </NavLink>
  </li> */}
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("foodMenu")}
    >
      <i className="lni lni-coffee-cup"></i>
      <span className="fw-normal">Food Menu</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("gymReservation")}
    >
      <i className="lni lni-steam"></i>
      <span className="fw-normal">Gym Reservation</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("hall")}
    >
      <i className="lni lni-calendar"></i>
      <span className="fw-normal">Hall</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("order")}
    >
      <i className="lni lni-cart"></i>
      <span className="fw-normal">Order Food</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("ordercoffee")}
    >
      <i className="lni lni-cart"></i>
      <span className="fw-normal">Order Coffee</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("orderdrink")}
    >
      <i className="lni lni-cart"></i>
      <span className="fw-normal">Order Drink</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("pool")}
    >
      <i className="lni lni-calendar"></i>
      <span className="fw-normal">Pool</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("roomBooking")}
    >
      <i className="lni lni-calendar"></i>
      <span className="fw-normal">Room Booking</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("rooms")}
    >
      <i className="lni lni-agenda"></i>
      <span className="fw-normal">Rooms</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("sauna")}
    >
      <i className="lni lni-steam"></i>
      <span className="fw-normal">Sauna</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("saunaReservation")}
    >
      <i className="lni lni-steam"></i>
      <span className="fw-normal">Sauna Reservation</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("shezlong")}
    >
      <i className="lni lni-checkmark-circle"></i>
      <span className="fw-normal">Shezlong</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("shezlongReservation")}
    >
      <i className="lni lni-checkmark-circle"></i>
      <span className="fw-normal">Shezlong Reservation</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("spa")}
    >
      <i className="lni lni-steam"></i>
      <span className="fw-normal">Spa</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("spaReservation")}
    >
      <i className="lni lni-steam"></i>
      <span className="fw-normal">Spa Reservation</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("tableReservation")}
    >
      <i className="lni lni-dinner"></i>
      <span className="fw-normal">Table Reservation</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("tables")}
    >
      <i className="lni lni-dinner"></i>
      <span className="fw-normal">Tables</span>
    </NavLink>
  </li>
  <li className="sidebar-item">
    <NavLink
      to="#"
      className="sidebar-link"
      onClick={() => toggleTable("userInformation")}
    >
      <i className="lni lni-user"></i>
      <span className="fw-normal">Users</span>
    </NavLink>
  </li>
</ul>
<div className="sidebar-footer">
  <NavLink to="/home" className="sidebar-link">
    <i className="lni lni-exit"></i>
    <span className="fw-normal">Logout</span>
  </NavLink>
</div>

        </aside>
        <div className="main">
          <main className="content px-3 py-4">
            <h1 className="fw-bold mb-3 text-center">Dashboard</h1>
            <div className="container-fluid">
              {activeTable === "userInformation" && <UserInformation />}
              {activeTable === "contact" && <ContactUs />}
              {activeTable === "rooms" && <RoomCrud2 />}
              {activeTable === "foodMenu" && <MenuFoodCrud />}
              {activeTable === "cafeMenu" && <MenuCafeCrud />}
              {activeTable === "drinkMenu" && <MenuDrinkCrud />}
              {activeTable === "tables" && <TableCrud />}
              {activeTable === "tableReservation" && <TableReservation />}
              {activeTable === "hall" && <Hall />}
              {activeTable === "pool" && <Pool />}
              {activeTable === "fitnes" && <Fitnes />}
              {activeTable === "fitnesEquipments" && <FitnessEquipments />}
              {activeTable === "gymReservation" && <GymReservation />}
              {activeTable === "spa" && <SpaCrud />}
              {activeTable === "spaReservation" && <SpaReservationCrud />}
              {activeTable === "sauna" && <SaunaCrud />}
              {activeTable === "saunaReservation" && <SaunaReservationCrud />}
              {activeTable === "shezlong" && <ShezlongForm />}
              {activeTable === "shezlongReservation" && <ShezlongReservation />}
              {activeTable === "activities" && <ActivitiesCrud />}
              {activeTable === "activitiesReservation" && (
                <ActivitiesReservationCrud />
              )}
              {activeTable === "roomBooking" && <RoomBookingCrud />}
              {activeTable === "about" && <AboutCrud />}
              {activeTable === "order" && <OrderFood />}
              {activeTable === "orderdrink" && <OrderDrinks />}
              {activeTable === "ordercoffee" && <OrderCoffee />}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
