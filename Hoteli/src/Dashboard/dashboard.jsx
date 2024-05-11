import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import './dashboard.css';
import RoomCrud2 from './Crud-Functions/RoomCrud2.jsx'
import MenuCafeCrud from './Crud-Functions/MenuCafeCrud.jsx';
import MenuFoodCrud from './Crud-Functions/MenuFoodCrud.jsx';
import MenuDrinkCrud from './Crud-Functions/MenuDrinkCrud.jsx';
import TableCrud from './Crud-Functions/TableCrud.jsx';
import UsersCrud from './Crud-Functions/UsersCrud.jsx';
import RolesCrud from './Crud-Functions/RolesCrud.jsx';

const Dashboard = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [showFoodMenuTable, setShowFoodMenuTable] = useState(false);
    const [showRoomsTable, setShowRoomsTable] = useState(false);
    const [showCafeMenuTable, setShowCafeMenuTable] = useState(false);
    const [showDrinkMenuTable, setShowDrinkMenuTable] = useState(false);
    const [showTableTable, setShowTableTable] = useState(false);
    const [showUsersTable, setShowUsersTable] = useState(false);
    const [showRolesTable, setShowRolesTable] = useState(false);


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
    const toggleUsersTable = () => {
        setShowUsersTable(!showUsersTable);
    };
    const toggleRolesTable = () => {
        setShowRolesTable(!showRolesTable);
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
                                    <NavLink to="#" className="sidebar-link" onClick={null}>User&Roles</NavLink>
                                </li>
                            </ul>
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
                                    <NavLink to="#" className="sidebar-link" onClick={toggleCafeMenuTable}>Coffee&Sweets</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleDrinkMenuTable}>Drinks</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleTableTable}>Tables</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <NavLink to="#" className="sidebar-link">
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
                        <li className="sidebar-item">
                            <NavLink to="#" className="sidebar-link">
                                <i className="lni lni-cog"></i>
                                <span>ContactUs</span>
                            </NavLink>
                        </li>
                    </ul>
                    <div className="sidebar-footer">
                        <NavLink to="#" className="sidebar-link">
                            <i className="lni lni-exit"></i>
                            <span>Logout</span>
                        </NavLink>
                    </div>
                </aside>
                <div className="main">
                    <main className="content px-3 py-4">
                        <h3 className="fw-bold fs-4 mb-3 text-center">Dashboard</h3>
                        <div className="container-fluid">
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
                    </main>
                </div>
            </div>
        </>

    );
};

export default Dashboard;