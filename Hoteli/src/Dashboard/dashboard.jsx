import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import './dashboard.css';
import RoomCrud from './Crud-Functions/RoomCrud.jsx'
import RoomCrud2 from './Crud-Functions/RoomCrud2.jsx'

const Dashboard = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [showFoodMenuTable, setShowFoodMenuTable] = useState(false);
    const [showRoomsTable, setShowRoomsTable] = useState(false);
    const [showCafeMenuTable, setShowCafeMenuTable] = useState(false);

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
                            <NavLink to="#" className="sidebar-link">
                                <i className="lni lni-user"></i>
                                <span>Staff</span>
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
                                    <NavLink to="#" className="sidebar-link" onClick={toggleFoodMenuTable}>Foods</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link" onClick={toggleCafeMenuTable}>Cafe&Sweets</NavLink>
                                </li>
                                <li className="sidebar-item">
                                    <NavLink to="#" className="sidebar-link">Drinks</NavLink>
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
                            {showRoomsTable && (
                                <RoomCrud2/>
                            )}
                        </div>
                        <div className="container-fluid">
                            {showFoodMenuTable && (
                                <div className="mb-3">
                                    <div className='d-flex flex-row align-items-center'>
                                        <h3 className="fw-bold fs-4 my-3">Food Menu</h3>
                                        <button className="btn btn-rounded btn-success ms-3">Add</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr className="highlight" style={{ color: '#fff', textAlign: 'left' }}>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Id</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Food Name</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Description</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Price</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Image</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Seafood Paella</td>
                                                        <td style={{ width: '65%' }}>Traditional Spanish dish with a variety of fresh seafood and rice,
                                                            paella is known for its aromatic flavors and vibrant colors, making it
                                                            a beloved culinary delight enjoyed by locals and visitors alike.
                                                        </td>
                                                        <td>18.99$</td>
                                                        <td>/</td>
                                                        <td><button className="btn btn-rounded btn-primary">Edit</button></td>
                                                        <td><button className="btn btn-rounded btn-danger">Delete</button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="container-fluid">
                            {showCafeMenuTable && (
                                <div className="mb-3">
                                    <div className='d-flex flex-row align-items-center'>
                                        <h3 className="fw-bold fs-4 my-3">Cafe&Sweets Menu</h3>
                                        <button className="btn btn-rounded btn-success ms-3">Add</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr className="highlight" style={{ color: '#fff', textAlign: 'left' }}>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Id</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Food Name</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Description</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Price</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Image</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Cappuccino</td>
                                                        <td>A rich and creamy coffee beverage made with equal parts espresso, steamed milk,
                                                            and frothed milk, topped with a dusting of cocoa or cinnamon</td>
                                                        <td>5$</td>
                                                        <td>/</td>
                                                        <td><button className="btn btn-rounded btn-primary">Edit</button></td>
                                                        <td><button className="btn btn-rounded btn-danger">Delete</button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </>

    );
};

export default Dashboard;