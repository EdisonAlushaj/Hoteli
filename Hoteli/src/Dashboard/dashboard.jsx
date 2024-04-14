import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import './dashboard.css';

const Dashboard = () => {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const [showFoodMenuTable, setShowFoodMenuTable] = useState(false);
    const [showRoomsTable, setShowRoomsTable] = useState(false);
    const [showCafeMenuTable, setShowCafeMenuTable] = useState(false);
    const [showDrinksMenuTable, setShowDrinksMenuTable] = useState(false);

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

    const toggleDrinksMenuTable = () => {
        setShowDrinksMenuTable(!showDrinksMenuTable);
    };

    useEffect(() => {
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.integrity = 'sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL';
        bootstrapScript.crossOrigin = 'anonymous';
        document.body.appendChild(bootstrapScript);

        const customScript = document.createElement('script');
        customScript.src = 'script.js';
        document.body.appendChild(customScript);

        return () => {
            document.body.removeChild(bootstrapScript);
            document.body.removeChild(customScript);
        };
    }, []);

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
                                    <NavLink to="#" className="sidebar-link" onClick={toggleDrinksMenuTable}>Drinks</NavLink>
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
                                <div className="mb-3">
                                    <div className='d-flex flex-row align-items-center'>
                                        <h3 className="fw-bold fs-4 my-3">Rooms</h3>
                                        <button className="btn btn-rounded btn-success ms-3">Add</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr className="highlight" style={{ color: '#fff', textAlign: 'left' }}>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Id</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Room Name</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Capacity</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Size</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Description</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Price</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Image</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Superior Double Room</td>
                                                        <td>1-2</td>
                                                        <td>22m2</td>
                                                        <td>Experience understated luxury inour Superior Double Bed Room.
                                                            Elegantly designed with a harmonious blend of comfort and style,
                                                            this space boasts a plush double bed, premium amenities, and a captivating
                                                            view.
                                                        </td>
                                                        <td>100</td>
                                                        <td>/</td>
                                                        <td><button className="btn btn-rounded btn-primary">Edit</button></td>
                                                        <td><button className="btn btn-rounded btn-danger">Delete</button></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Deluxe Double Room</td>
                                                        <td>2-3</td>
                                                        <td>20m2</td>
                                                        <td>Experience the essence of comfort in our Standard Double Room.
                                                            Tastefully designed with a cozy ambiance, this space offers a
                                                            comfortable double bed, essential amenities, and a serene atmosphere
                                                            to unwind.
                                                        </td>
                                                        <td>120</td>
                                                        <td>/</td>
                                                        <td><button className="btn btn-rounded btn-primary">Edit</button></td>
                                                        <td><button className="btn btn-rounded btn-danger">Delete</button></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Junior Suite</td>
                                                        <td>2-3</td>
                                                        <td>21m2</td>
                                                        <td>Experience the essence of comfort in our Standard Double Room.
                                                            Tastefully designed with a cozy ambiance, this space offers a
                                                            comfortable double bed, essential amenities, and a serene atmosphere to unwind.
                                                        </td>
                                                        <td>110</td>
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
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Name</th>
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
                        <div className="container-fluid">
                            {showDrinksMenuTable && (
                                <div className="mb-3">
                                    <div className='d-flex flex-row align-items-center'>
                                        <h3 className="fw-bold fs-4 my-3">Drinks Menu</h3>
                                        <button className="btn btn-rounded btn-success ms-3">Add</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr className="highlight" style={{ color: '#fff', textAlign: 'left' }}>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Id</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Drink Name</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Description</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Price</th>
                                                        <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Image</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Sunset Spritz</td>
                                                        <td>The reminiscent of the vibrant sunsets for which Ibiza is famous, 
                                                            with the Aperol providing a hint of bitterness, the Prosecco adding effervescence, 
                                                            and the Elderflower liqueur lending a floral sweetness.
                                                            </td>
                                                        <td>20$</td>
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
