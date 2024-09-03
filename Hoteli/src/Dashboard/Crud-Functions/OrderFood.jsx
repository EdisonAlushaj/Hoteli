import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { OrderFoodEndPoints } from '../../endpoints.js';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookieUtils from '../../cookieUtils.jsx';

const OrderFood = () => {
    const [showAdd, setShowAdd] = useState(false);

    const userId = cookieUtils.getUserIdFromCookies();
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryNumber, setDeliveryNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderItems, setOrderItems] = useState([{ menuFoodId: '', quantity: '' }]);
    const [data, setData] = useState([]);

    const getToken = () => {
        return cookieUtils.getTokenFromCookies();
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(OrderFoodEndPoints, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        console.log("Deleting order with ID:", id);
        if (window.confirm("Are you sure to delete this Order?")) {
            // Update UI immediately
            setData(data.filter(item => item.orderId !== id));
            
            // Send request to delete order from the server
            axios.delete(`${OrderFoodEndPoints}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Order has been deleted');
                    }
                })
                .catch((error) => {
                    toast.error(error);
                    // If the server request fails, revert the UI state
                    getData(); // Fetch updated list of orders to revert UI state
                });
        }
    };

    const handleSave = () => {
        // Validate the order data before sending
        if (!userId || !deliveryLocation || !deliveryNumber || !paymentMethod || orderItems.length === 0) {
            toast.error('Please fill all the required fields.');
            return;
        }
    
        // Prepare the order data
        const orderData = {
            userId: userId,
            deliveryLocation: deliveryLocation,
            deliveryNumber: deliveryNumber,
            paymentMethod: paymentMethod,
            orderItems: orderItems.map(item => ({
                menuFoodId: parseInt(item.menuFoodId, 10),
                quantity: parseInt(item.quantity, 10),
                foodName: 'Sample Food Name'
            }))
        };
    
        // Log the order data to see if it matches the backend expectations
        console.log("Order Data being sent:", JSON.stringify(orderData, null, 2));
    
        // Send POST request to create a new order
        axios.post(OrderFoodEndPoints, orderData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    toast.success('Order has been created successfully');
                    setShowAdd(false); // Close the modal
                    clear(); // Clear the form fields
                    getData(); // Refresh the orders list
                }
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    
                    // Check if the error response contains validation errors
                    if (error.response.status === 400 && error.response.data.errors) {
                        const validationErrors = error.response.data.errors;
                        const errorMessages = Object.values(validationErrors).flat();
                        // Display validation error messages to the user
                        errorMessages.forEach(errorMessage => {
                            toast.error(errorMessage);
                        });
                    } else {
                        // If it's not a validation error, show a generic error message
                        toast.error('Error creating order. Please try again later.');
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                    toast.error('No response from server. Please check your internet connection.');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                    toast.error('An unexpected error occurred. Please try again later.');
                }
            });
    };
    
    const clear = () => {
        setDeliveryLocation('');
        setDeliveryNumber('');
        setPaymentMethod('');
        setOrderItems([{ menuFoodId: '', quantity: '' }]);
    };

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const handleOrderItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedOrderItems = [...orderItems];
        updatedOrderItems[index][name] = value;
        setOrderItems(updatedOrderItems);
    };

    const addOrderItem = () => {
        setOrderItems([...orderItems, { menuFoodId: '', quantity: '' }]);
    };

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Order Food</b></p>
                    <button className="btn btn-rounded btn-primary" onClick={handleShowAdd}>Add</button>
                </div>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User Name</th>
                            <th>Delivery Location</th>
                            <th>Delivery Number</th>
                            <th>Payment Method</th>
                            <th>Total Price</th>
                            <th>Order Items</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.orderId}</td>
                                    <td>{item.user.name}</td>
                                    <td>{item.deliveryLocation}</td>
                                    <td>{item.deliveryNumber}</td>
                                    <td>{item.paymentMethod}</td>
                                    <strong><td>${item.totalOrderPrice}$</td></strong>
                                    <td>
                                        {item.orderItems.map((orderItem, idx) => (
                                            <div key={idx} className="card mb-2" style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
                                                <div className="card-body">
                                                    <p className="card-text"><strong>Food ID:</strong> {orderItem.menuFoodId}</p>
                                                    <p className="card-text"><strong>Food Name:</strong> {orderItem.foodName}</p>
                                                    <p className="card-text"><strong>Price:</strong> ${orderItem.price } </p>
                                                    <p className="card-text"><strong>Quantity: </strong> {orderItem.quantity} </p>
                                                    <p className="card-text"><strong>Price * Quantity:</strong>  ${orderItem.price * orderItem.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className='d-flex flex-row justify-content-evenly'>
                                        <button className="btn btn-rounded btn-danger" onClick={() => handleDelete(item.orderId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : 'Loading...'}
                    </tbody>
                </Table>

                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Delivery Location'
                                    value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Delivery Number'
                                    value={deliveryNumber} onChange={(e) => setDeliveryNumber(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Payment Method'
                                    value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {orderItems.map((item, index) => (
                                    <div key={index}>
                                        <input type="text" name="menuFoodId" className='form-control' placeholder='Enter Food ID'
                                            value={item.menuFoodId} onChange={(e) => handleOrderItemChange(index, e)}
                                        />
                                        <input type="text" name="quantity" className='form-control' placeholder='Enter Quantity'
                                            value={item.quantity} onChange={(e) => handleOrderItemChange(index, e)}
                                        />
                                    </div>
                                ))}
                                <button className="btn btn-rounded btn-primary" onClick={addOrderItem}>Add Item</button>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        </>
    );
};

export default OrderFood;
