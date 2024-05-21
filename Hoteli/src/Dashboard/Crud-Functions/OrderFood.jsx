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

const OrderFood = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [userId, setUserId] = useState('');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryNumber, setDeliveryNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [orderItems, setOrderItems] = useState([{ menuFoodId: '', quantity: '' }]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(OrderFoodEndPoints)
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
            axios.delete(`${OrderFoodEndPoints}/${id}`)
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
        const orderDto = {
            userId: userId,
            deliveryLocation: deliveryLocation,
            deliveryNumber: deliveryNumber,
            paymentMethod: paymentMethod,
            orderItems: orderItems.map(item => ({
                menuFoodId: parseInt(item.menuFoodId),
                quantity: parseInt(item.quantity)
            }))
        };

        axios.post(OrderFoodEndPoints, orderDto)
            .then((result) => {
                getData();
                clear();
                toast.success('Order has been added.');
                handleCloseAdd();
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const clear = () => {
        setUserId('');
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
                                    <td>{item.totalOrderPrice}</td>
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
                                <input type="number" className='form-control' placeholder='Enter User Id'
                                    value={userId} onChange={(e) => setUserId(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Delivery Location'
                                    value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Delivery Number'
                                    value={deliveryNumber} onChange={(e) => setDeliveryNumber(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Payment Method'
                                    value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </Col>
                        </Row>
                        {orderItems.map((item, index) => (
                            <Row key={index}>
                                <Col>
                                    <input type="number" className='form-control' placeholder='Menu Food Id'
                                        name="menuFoodId" value={item.menuFoodId} onChange={(e) => handleOrderItemChange(index, e)}
                                    />
                                </Col>
                                <Col>
                                    <input type="number" className='form-control' placeholder='Quantity'
                                        name="quantity" value={item.quantity} onChange={(e) => handleOrderItemChange(index, e)}
                                    />
                                </Col>
                            </Row>
                        ))}
                        <Button variant="secondary" onClick={addOrderItem}>Add Item</Button>
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
