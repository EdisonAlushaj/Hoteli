import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import './dashboard.css';
import RoomCrud2 from './Crud-Functions/RoomCrud2.jsx'
import MenuCafeCrud from './Crud-Functions/MenuCafeCrud.jsx';
import MenuFoodCrud from './Crud-Functions/MenuFoodCrud.jsx';
import MenuDrinkCrud from './Crud-Functions/MenuDrinkCrud.jsx';
import TableCrud from './Crud-Functions/TableCrud.jsx';

import TableReservation from './Crud-Functions/TableReservation.jsx';
import Hall from './Crud-Functions/Hall.jsx';
import Pool from './Crud-Functions/Pool.jsx';
import SpaCrud from './Crud-Functions/SpaCrud.jsx';
import SaunaCrud from './Crud-Functions/SaunaCrud.jsx';
import ActivitiesCrud from './Crud-Functions/ActivitiesCrud.jsx';
import ActivitiesReservationCrud from './Crud-Functions/ActivitiesReservationCrud.jsx';

import ShezlongForm from './Crud-Functions/ShezlongForm.jsx';
import ContactUs from './Crud-Functions/ContactUs.jsx';
import ShezlongReservation from './Crud-Functions/ShezlongReservationCrud.jsx';
import Fitnes from './Crud-Functions/Fitnes.jsx';
import FitnessEquipments from './Crud-Functions/FitnessEquipments.jsx';
import AboutCrud from './Crud-Functions/AboutCrud.jsx';
import OrderFood from './Crud-Functions/OrderFood.jsx';
import SpaReservationCrud from './Crud-Functions/SpaReservationCrud.jsx';
import SaunaReservationCrud from './Crud-Functions/SaunaReservationCrud.jsx';
import RoomBookingCrud from './Crud-Functions/RoomBookingCrud.jsx';
import UserInformation from './Crud-Functions/UserInformation.jsx';

const Dashboard = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [showFoodMenuTable, setShowFoodMenuTable] = useState(false);
    const [showRoomsTable, setShowRoomsTable] = useState(false);
    const [showCafeMenuTable, setShowCafeMenuTable] = useState(false);
    const [showDrinkMenuTable, setShowDrinkMenuTable] = useState(false);
    const [showTableTable, setShowTableTable] = useState(false);
    const [showTableReservationTable, setShowTableReservationTable] = useState(false);
    const [showHallTable, setShowHallTable] = useState(false);
    const [showPoolTable, setShowPoolTable] = useState(false);
    const [showSpaCrudTable, setShowSpaCrudTable] = useState(false);
    const [showSaunaTable, setShowSaunaTable] = useState(false);
    const [showActivitiesTable, setShowActivitiesTable] = useState(false);
    const [showShezlongTable, setShowShezlongTable] = useState(false);
    const [showContactTable, setShowContactTable] = useState(false);
    const [showShezlongReservationTable, setShowShezlongReservationTable] = useState(false);
    const [showSpaReservationTable, setShowSpaReservationTable] = useState(false);
    const [showSaunaReservationTable, setShowSaunaReservationTable] = useState(false);
    const [showFitnesTable, setShowFitnesTable] = useState(false);
    const [showFitnesEquipmentsTable, setShowFitnesEquipmentsTable] = useState(false);
    const [showAboutTable, setShowAboutTable] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [showRoomBookingTable, setRoomBookingTable] = useState(false);
    const [showUserInformationTable, setUserInformationTable] = useState(false);
    const [showActivitiesReservationTable, setActivitiesReservationTable] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };
    const toggleRoomsTable = () => {
        setShowRoomsTable(!showRoomsTable);
    };
    const toggleFoodMenuTable = () => {
        setShowFoodMenuTable(!showFoodMenuTable);
    };
    const toggleCafeMenuTable = () => {
        setShowCafeMenuTable(!showCafeMenuTable);
    };
    const toggleDrinkMenuTable = () => {
        setShowDrinkMenuTable(!showDrinkMenuTable);
    };
    const toggleTableTable = () => {
        setShowTableTable(!showTableTable);
    };

    const toggleTableReservationTable = () => {
        setShowTableReservationTable(!showTableReservationTable);
    };
    const toggleHallTable = () => {
        setShowHallTable(!showHallTable);
    };
    const togglePoolTable = () => {
        setShowPoolTable(!showPoolTable);
    };
    const toggleSpaTable = () => {
        setShowSpaCrudTable(!showSpaCrudTable);
    };
    const toggleSaunaTable = () => {
        setShowSaunaTable(!showSaunaTable);
    };
    const toggleActivitiesTable = () => {
        setShowActivitiesTable(!showActivitiesTable);
    };

    const toggleShezlong = () => {
        setShowShezlongTable(!showShezlongTable);
    };
    const toggleContactTable = () => {
        setShowContactTable(!showContactTable);
    };
    const toggleShezlongReservation = () => {
        setShowShezlongReservationTable(!showShezlongReservationTable);
    };
    const toggleSpaReservation = () => {
        setShowSpaReservationTable(!showSpaReservationTable);
    };
    const toggleSaunaReservation = () => {
        setShowSaunaReservationTable(!showSaunaReservationTable);
    };
    const toggleActivitiesReservationTable = () => {
        setActivitiesReservationTable(!showActivitiesReservationTable);
    };
    const toggleFintesTable = () => {
        setShowFitnesTable(!showFitnesTable);
    };
    const toggleFintesEquipmentsTable = () => {
        setShowFitnesEquipmentsTable(!showFitnesEquipmentsTable);
    };
    const toggleAboutTable = () => {
        setShowAboutTable(!showAboutTable);
    };
    const toggleOrder = () => {
        setShowOrder(!showOrder);
    };
    const toggleRoomBookingTable = () => {
        setRoomBookingTable(!showRoomBookingTable);
    };
    const toggleUserInfromationTable = () => {
        setUserInformationTable(!showUserInformationTable);
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
                        {/* <li className="sidebar-item">
                            <NavLink
                                to="#"
                                className="sidebar-link collapsed has-dropdown"
                                data-bs-toggle="collapse"
                                data-bs-target="#staff"
                                aria-expanded="false"
                                aria-controls="staff">
                                <i className="lni lni-user"></i>
                                <span>Users</span>
                            </NavLink>
                            <ul id="staff" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleUsersTable}>Users</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleRolesTable}>Roles</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleUserRoleTable}>User&Roles</NavLink>
                                </li>
                            </ul>
                        </li> */}
                        <li className="sidebar-item">
                            <NavLink to="#" className="sidebar-link" onClick={toggleUserInfromationTable}>
                                <i className="lni lni-user"></i>
                                <span>Users</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink to="#" className="sidebar-link" onClick={toggleContactTable}>
                                <i className="lni lni-cog"></i>
                                <span>Contact</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink to="#" className="sidebar-link" onClick={toggleRoomsTable}>
                                <i className="lni lni-agenda"></i>
                                <span>Rooms</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink
                                to="#"
                                className="sidebar-link collapsed has-dropdown"
                                data-bs-toggle="collapse"
                                data-bs-target="#auth"
                                aria-expanded="false"
                                aria-controls="auth">
                                <i className="lni lni-protection"></i>
                                <span>Menu</span>
                            </NavLink>
                            <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleFoodMenuTable}>Food</NavLink>
                                </li>

                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleOrder}>Order food</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleCafeMenuTable}>Coffee&Sweets</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleDrinkMenuTable}>Drinks</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleTableTable}>Tables</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleTableReservationTable}>Table Reservation</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <NavLink
                                to="#"
                                className="sidebar-link collapsed has-dropdown"
                                data-bs-toggle="collapse"
                                data-bs-target="#servicesDropdown"
                                aria-expanded="false"
                                aria-controls="servicesDropdown">
                                <i className="lni lni-protection"></i>
                                <span>Services</span>
                            </NavLink>
                            <ul id="servicesDropdown" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleHallTable}>Hall</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={togglePoolTable}>Pool</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleFintesTable}>Fitnes</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleFintesEquipmentsTable}>Fitnes Equipments</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleSpaTable}>Spa</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleSpaReservation}>Spa Reservation</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleSaunaTable}>Sauna</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleSaunaReservation}>Sauna Reservation</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleShezlong}>Shezlong</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleShezlongReservation}>Shezlong Reservation</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleActivitiesTable}>Activities</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleActivitiesReservationTable}>Activities Reservation</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleRoomBookingTable}>Room Booking</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="sidebar-item">
                            <NavLink to="#" className="sidebar-link" onClick={toggleAboutTable}>
                                <i className="lni lni-agenda"></i>
                                <span>About</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item">
                            <NavLink to="#" className="sidebar-link">
                                <i className="lni lni-popup"></i>
                                <span>Slider</span>
                            </NavLink>
                        </li>
                    </ul>
                    <div className="sidebar-footer">
                        <NavLink to="/home" className="sidebar-link">
                            <i className="lni lni-exit"></i>
                            <span>Logout</span>
                        </NavLink>
                    </div>
                </aside>
                <div className="main">
                    <main className="content px-3 py-4">
                        <h3 className="fw-bold fs-4 mb-3 text-center">Dashboard</h3>
                        {/* <div className="container-fluid">
                            {showUsersTable && (
                                <UsersCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showRolesTable && (
                                <RolesCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showUserRoleTable && (
                                <UserRoleCrud />
                            )}
                        </div> */}
                        <div className="container-fluid">
                            {showUserInformationTable && (
                                <UserInformation />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showContactTable && (
                                <ContactUs />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showRoomsTable && (
                                <RoomCrud2 />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showFoodMenuTable && (
                                <MenuFoodCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showOrder && (
                                <OrderFood />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showCafeMenuTable && (
                                <MenuCafeCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showDrinkMenuTable && (
                                <MenuDrinkCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showTableTable && (
                                <TableCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showTableReservationTable && (
                                <TableReservation />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showHallTable && (
                                <Hall />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showFitnesTable && (
                                <Fitnes />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showFitnesEquipmentsTable && (
                                <FitnessEquipments />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showPoolTable && (
                                <Pool />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showSpaCrudTable && (
                                <SpaCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showSaunaTable && (
                                <SaunaCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showShezlongTable && (
                                <ShezlongForm />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showShezlongReservationTable && (
                                <ShezlongReservation />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showActivitiesTable && (
                                <ActivitiesCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showActivitiesReservationTable && (
                                <ActivitiesReservationCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showRoomBookingTable && (
                                <RoomBookingCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showAboutTable && (
                                <AboutCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showSpaReservationTable && (
                                <SpaReservationCrud />
                            )}
                        </div>
                        <div className="container-fluid">
                            {showSaunaReservationTable && (
                                <SaunaReservationCrud />
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>

    );
};

export default Dashboard;