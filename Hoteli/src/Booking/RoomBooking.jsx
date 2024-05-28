import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RoomBooking.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoverImg from "../Rooms/RoomIMG/room-cover.jpg";

function RoomBooking() {
    const [showAdd, setShowAdd] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomBookingItems, setRoomBookingItems] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        fetchRoomItems();
    }, []);

    const fetchRoomItems = async () => {
        try {
            const response = await axios.get('https://localhost:7189/api/Room');

            console.log('Fetched Room Items:', response.data);

            setRoomBookingItems(response.data);
        } catch (error) {
            toast.error('Error fetching booking items.');
            console.log(error);
        }
    };

    const handleQuantityChange = (value, index) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].quantity = parseInt(value) || 1;
        setSelectedItems(updatedItems);
    };

    const addToBooking = (itemToAdd, quantity) => {
        if (quantity <= 0) {
            toast.error("Please enter a valid quantity.");
            return;
        }

        const existingItemIndex = selectedItems.findIndex(item =>
            item.userId === itemToAdd.userId && item.roomName === itemToAdd.roomName && item.checkInDate === itemToAdd.checkInDate && item.checkOutDate === itemToAdd.checkOutDate
        );

        if (existingItemIndex !== -1) {
            const updatedItems = [...selectedItems];
            updatedItems[existingItemIndex].quantity += quantity;
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([...selectedItems, { ...itemToAdd, quantity }]);
        }
    };

    const removeFromBooking = (indexToRemove) => {
        const updatedItems = selectedItems.filter((item, index) => index !== indexToRemove);
        setSelectedItems(updatedItems);
    };

    const submitBooking = async () => {
        if (!userId || !paymentMethod || !checkInDate || !checkOutDate || selectedItems.length === 0) {
            toast.error('Please fill out all fields and add items to your order.');
            return;
        }

        try {
            const orderData = {
                userId: userId,
                paymentMethod: paymentMethod,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                roomBookingItems: selectedItems.map(item => ({
                    roomId: parseInt(item.id),
                    quantity: parseInt(item.quantity)
                }))
            };

            console.log('Order Data:', JSON.stringify(orderData, null, 2));

            const response = await axios.post('https://localhost:7189/api/RoomBooking', orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                setSelectedItems([]);
                setUserId('');
                setPaymentMethod('');
                setCheckInDate('');
                setCheckOutDate('');
                setShowAdd(false);
                toast.success('Booking submitted successfully!');
            } else {
                toast.error(`Failed to submit booking. Server responded with status code ${response.status}`);
            }
        } catch (error) {
            console.error('Order submission error:', error.response?.data || error.message);
            toast.error('Failed to submit booking. Please try again later.');
        }
    };

    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);


    return (
        <>
            <div className="cover d-flex justify-content-center align-items-center">
                <p className="text-center position-absolute" style={{ fontFamily: 'Roboto Slab, serif', fontSize: '5em', color: '#fff' }}>
                    Room Booking
                </p>

                <img src={CoverImg} className="img-fluid d-block" alt="Cover Image" />
            </div>
            <Container fluid style={{ backgroundColor: '#d1d1e0' }}>
                <h1 className="text-center mt-5" style={{ fontSize: '4rem', fontFamily: 'Roboto Slab, serif', color: '#47476b' }}>Rooms</h1>
                <Row className="mt-5">
                    <Col>
                        <Row md={4}>
                            {roomBookingItems.map((roomItem, index) => (
                                <Col key={index}>
                                    <Card>
                                        <Card.Img variant="top" src={roomItem.image} />
                                        <Card.Body>
                                            <Card.Title style={{ color: '#6b4d38' }}>{roomItem.roomName}</Card.Title>
                                            <Card.Text>{roomItem.description}</Card.Text>
                                            <Card.Text className="text-muted">${roomItem.price}</Card.Text>
                                            <Button variant="primary" onClick={() => {
                                                const quantity = parseInt(prompt("Enter quantity:"));
                                                if (!isNaN(quantity) && quantity > 0) {
                                                    addToBooking(roomItem, quantity);
                                                } else {
                                                    toast.error("Please enter a valid quantity.");
                                                }
                                            }}>
                                                Add to Order
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    {selectedItems.length > 0 && (
                        <Col md={4}>
                            <div className="order-summary">
                                <h2>Booking Summary</h2>
                                <ul>
                                    {selectedItems.map((item, index) => (
                                        <li key={index}>
                                            {item.roomName} - {item.price} $ - {item.quantity} - Check In: {item.checkInDate} - Check Out: {item.checkOutDate}
                                            <br />
                                            <Button variant="danger" size="sm" onClick={() => removeFromBooking(index)}>
                                                Remove
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                                <hr />
                                <Button variant="primary" onClick={handleShowAdd}>
                                    Proceed to Checkout
                                </Button>
                            </div>
                        </Col>
                    )}
                </Row>

                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Submit Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="userId">
                                <Form.Label>User ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter user ID"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPaymentMethod">
                                <Form.Label>Payment Method</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="">Select payment method</option>
                                    <option value="card-online">Card - Online</option>
                                    <option value="cash-at-delivery">Cash - At Delivery</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formPaymentMethod">
                                <Form.Label>Check  In</Form.Label>
                                <input type="date" className='form-control' placeholder='Enter Check In date '
                                    value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPaymentMethod">
                                <Form.Label>Check  Out</Form.Label>
                                <input type="date" className='form-control' placeholder='Enter Check Out date '
                                    value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)}
                                />
                            </Form.Group>
                            {selectedItems.map((item, index) => (
                                <div key={index}>
                                    <Form.Group controlId={`formQuantity${index}`}>
                                        <Form.Label>{item.roomName} Quantity</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(e.target.value, index)}
                                        />
                                    </Form.Group>
                                </div>
                            ))}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={submitBooking}>
                            Submit Booking
                        </Button>
                    </Modal.Footer>
                </Modal>

                <ToastContainer />
            </Container>
        </>
    );
}

export default RoomBooking;