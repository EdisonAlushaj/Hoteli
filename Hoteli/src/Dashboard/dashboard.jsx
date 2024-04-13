import React from "react";

const Dashboard = () => {

    return(
    <>
    <h3 className="fw-bold fs-4 my-3 text-center">Dashboard</h3>
    <main className="d-flex justify-content-center align-items-center flex-column w-100" style={{flex: '1 1 auto'}}>
        <div className="row" style={{width: '90%'}}>
        <h4>Rooms</h4>
            <div className="col-12">
                <table className="table table-striped">
                     <thead>
                        <tr className="highlight" style={{color: '#fff', textAlign: 'left'}}>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Id</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Room Name</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Capacity</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Size</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Description</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Price</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Image</th>
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
                        </tr>
                     </tbody>
                </table>
            </div>
        </div>
        <br />
        <div className="row" style={{width: '90%'}}>
        <h4>Food Menu</h4>
            <div className="col-12">
                <table className="table table-striped">
                     <thead>
                        <tr className="highlight" style={{color: '#fff', textAlign: 'left'}}>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Id</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Food Name</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Description</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Price</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Image</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Seafood Paella</td>
                            <td>Traditional Spanish dish with a variety of fresh seafood and rice.</td>
                            <td>18.99$</td>
                            <td>/</td>
                        </tr>
                     </tbody>
                </table>
            </div>
        </div>
        <br />
        <div className="row" style={{width: '90%'}}>
        <h4>Cafe&Sweets Menu</h4>
            <div className="col-12">
                <table className="table table-striped">
                     <thead>
                        <tr className="highlight" style={{color: '#fff', textAlign: 'left'}}>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Id</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Name</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Description</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Price</th>
                            <th scope="col" style={{backgroundColor: '#b07256', color: '#fff'}}>Image</th>
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
                        </tr>
                     </tbody>
                </table>
            </div>
        </div>
    </main>
    
    </>

    );
};

export default Dashboard;