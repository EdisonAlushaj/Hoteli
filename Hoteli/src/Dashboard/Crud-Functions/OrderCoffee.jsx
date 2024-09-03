import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { OrderCoffeeEndPoints } from '../../endpoints.js';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookieUtils from '../../cookieUtils.jsx';

const OrderCoffee = () => {
    const [showAdd, setShowAdd] = useState(false);

    const Id = cookieUtils.getUserIdFromCookies();
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryNumber, setDeliveryNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderCoffeeItems, setorderCoffeeItems] = useState([{ menuCoffeeId: '', quantity: '' }]);
    const [data, setData] = useState([]);

    const getToken = () => {
        return cookieUtils.getTokenFromCookies();
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(OrderCoffeeEndPoints, {
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
            setData(data.filter(item => item.orderCoffeeId !== id));
            axios.delete(`${OrderCoffeeEndPoints}/${id}`, {
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
                    getData();
                });
        }
    };

    const handleSave = () => {
        if (!Id || !deliveryLocation || !deliveryNumber || !paymentMethod || orderCoffeeItems.length === 0) {
            toast.error('Please fill all the required fields.');
            return;
        }

        const orderData = {
            Id: Id,
            deliveryLocation: deliveryLocation,
            deliveryNumber: deliveryNumber,
            paymentMethod: paymentMethod,
            orderCoffeeItems: orderCoffeeItems.map(item => ({
                menuCoffeeId: parseInt(item.menuCoffeeId, 10),
                quantity: parseInt(item.quantity, 10),
                cafeName: 'Sample Cafe Name'
            }))
        };

        console.log("Order Data being sent:", JSON.stringify(orderData, null, 2));

        axios.post(OrderCoffeeEndPoints, orderData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                if (response.status === 201) {
                    toast.success('Order has been created successfully');
                    setShowAdd(false);
                    clear();
                    getData();
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);

                    if (error.response.status === 400 && error.response.data.errors) {
                        const validationErrors = error.response.data.errors;
                        const errorMessages = Object.values(validationErrors).flat();
                        errorMessages.forEach(errorMessage => {
                            toast.error(errorMessage);
                        });
                    } else {
                        toast.error('Error creating order. Please try again later.');
                    }
                } else if (error.request) {
                    console.log(error.request);
                    toast.error('No response from server. Please check your internet connection.');
                } else {
                    console.log('Error', error.message);
                    toast.error('An unexpected error occurred. Please try again later.');
                }
            });
    };

    const clear = () => {
        setDeliveryLocation('');
        setDeliveryNumber('');
        setPaymentMethod('');
        setorderCoffeeItems([{ menuCoffeeId: '', quantity: '' }]);
    };

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const handleOrderItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedorderCoffeeItems = [...orderCoffeeItems];
        updatedorderCoffeeItems[index][name] = value;
        setorderCoffeeItems(updatedorderCoffeeItems);
    };

    const addOrderItem = () => {
        setorderCoffeeItems([...orderCoffeeItems, { menuCoffeeId: '', quantity: '' }]);
    };

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Order Coffee</b></p>
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
                                    <td>{item.orderCoffeeId}</td>
                                    <td>{item.user.name}</td>
                                    <td>{item.deliveryLocation}</td>
                                    <td>{item.deliveryNumber}</td>
                                    <td>{item.paymentMethod}</td>
                                    <strong><td>${item.totalOrderPrice}$</td></strong>
                                    <td>
                                        {item.orderCoffeeItems.map((orderItem, idx) => (
                                            <div key={idx} className="card mb-2" style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
                                                <div className="card-body">
                                                    <p className="card-text"><strong>Coffee ID:</strong> {orderItem.menuCoffeeId}</p>
                                                    <p className="card-text"><strong>Coffee Name:</strong> {orderItem.cafeName}</p>
                                                    <p className="card-text"><strong>Price:</strong> ${orderItem.price} </p>
                                                    <p className="card-text"><strong>Quantity: </strong> {orderItem.quantity} </p>
                                                    <p className="card-text"><strong>Price * Quantity:</strong>  ${orderItem.price * orderItem.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className='d-flex flex-row justify-content-evenly'>
                                        <button className="btn btn-rounded btn-danger" onClick={() => handleDelete(item.orderCoffeeId)}>Delete</button>
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
                                {orderCoffeeItems.map((item, index) => (
                                    <div key={index}>
                                        <input type="text" name="menuCoffeeId" className='form-control' placeholder='Enter Coffee ID'
                                            value={item.menuCoffeeId} onChange={(e) => handleOrderItemChange(index, e)}
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

export default OrderCoffee;
