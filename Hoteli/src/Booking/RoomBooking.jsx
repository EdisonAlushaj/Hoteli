import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RoomBooking.css';
import CoverImg from "../Rooms/RoomIMG/room-cover.jpg";

function RoomBooking() {
    const [selectedItems, setSelectedItems] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [roomBookingItems, setRoomBookingItems] = useState([]);
    const handleQuantityChange = (value, index) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].quantity = parseInt(value);
        setSelectedItems(updatedItems);
    };
    const fetchRoomItems = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

            const response = await fetch('https://localhost:7189/api/Room', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add the token if you have authentication
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setRoomBookingItems(data);
        } catch (error) {
            console.error('Error fetching room booking:', error);
        }
    };

    useEffect(() => {
        fetchRoomItems();
    }, []);

    const addToBooking = (itemToAdd, quantity) => {
        const existingItemIndex = selectedItems.findIndex(item =>
            item.Id === itemToAdd.Id && item.RoomName === itemToAdd.RoomName
        );

        if (existingItemIndex !== -1) {
            const updatedItems = [...selectedItems];
            updatedItems[existingItemIndex].quantity += quantity; // Increment quantity
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
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;

            const orderData = {
                userId: userId,
                paymentMethod,
                roomBookingItems: selectedItems.map(item => ({
                    roomId: item.roomId,
                    quantity: item.quantity
                }))
            };

            console.log('Order data:', orderData);
            console.log('JSON string:', JSON.stringify(orderData));

            const response = await fetch('https://localhost:7189/api/RoomBooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit booking');
            }

            setSelectedItems([]);
            setPaymentMethod('');

            alert('Booking submitted successfully!');
        } catch (error) {
            console.error('Error submitting booking:', error);
        }
    };

    return (
        <>
            <div className="cover d-flex justify-content-center align-items-center">
                <p className="text-center position-absolute" style={{ fontFamily: 'Roboto Slab, serif', fontSize: '5em', color: '#fff' }}>
                    Room Booking
                </p>

                <img src={CoverImg} className="img-fluid d-block" alt="Cover Image" />
            </div>
            <Container fluid style={{ backgroundColor: '#d1d1e0' }}>
                <h1 className="text-center mt-5" style={{ fontSize: '4rem', fontFamily: 'Roboto Slab, serif', color: '#47476b' }}>Room Booking</h1>
                <Row className="mt-5">
                    <Col>
                        <Row md={4}>
                            {roomBookingItems.map((roomBookingItems, index) => (
                                <Col key={index}>
                                    <Card>
                                        <Card.Img variant="top" src={roomBookingItems.image} />
                                        <Card.Body>
                                            <Card.Title style={{ color: '#6b4d38' }}>{roomBookingItems.roomName}</Card.Title>
                                            <Card.Text>
                                                {roomBookingItems.description}
                                            </Card.Text>
                                            <Card.Text className="text-muted">${roomBookingItems.price}</Card.Text>
                                            <Button variant="primary" onClick={() => {
                                                const quantity = parseInt(prompt("Enter quantity:"));
                                                if (!isNaN(quantity) && quantity > 0) {
                                                    addToBooking(roomBookingItems, quantity);
                                                } else {
                                                    alert("Please enter a valid quantity.");
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
                                            {item.roomName} - {item.price}{' '}
                                            <Button variant="danger" size="sm" onClick={() => removeFromBooking(index)}>
                                                Remove
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                                <hr />
                                <div className='d-flex  align-items-center flex-column'>
                                    <Form style={{ borderTop: '1px solid marron', borderRadius: '20px', padding: '20px', fontFamily: 'Roboto Slab, serif', width: '22em' }}>
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
                                        <Button variant="success" onClick={submitBooking}>
                                            Submit Booking
                                        </Button>
                                    </Form>
                                    <Button variant="success" onClick={submitBooking}>
                                        Submit Booking
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    );
}

export default RoomBooking;