import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';

function MenuFood() {
    const [selectedItems, setSelectedItems] = useState([]);
   
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryNumber, setDeliveryNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const addToOrder = (itemName) => {
        setSelectedItems([...selectedItems, itemName]);
    };
    
    const removeFromOrder = (indexToRemove) => {
        const updatedItems = selectedItems.filter((item, index) => index !== indexToRemove);
        setSelectedItems(updatedItems);
    };
    
    const submitOrder = () => {
        console.log('Order submitted:', {
            items: selectedItems,
            deliveryLocation,
            deliveryNumber,
            paymentMethod,
        });
        setSelectedItems([]);
        setDeliveryLocation('');
        setDeliveryNumber('');
        setPaymentMethod('');
    };

    return (
        <Container fluid style={{ backgroundColor: '#f6f5dc' }}>
            <h1 className="text-center mt-5" style={{ fontSize: '4rem', fontFamily: 'Forum, sans-serif', color: '#b07256' }}>Menu</h1>
            <Row className="mt-5">
                <Col md={8}>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src="food_item_1.jpg" />
                                <Card.Body>
                                    <Card.Title style={{ color: '#6b4d38' }}>Seafood Paella</Card.Title>
                                    <Card.Text>
                                        Traditional Spanish dish with a variety of fresh seafood and rice.
                                    </Card.Text>
                                    <Card.Text className="text-muted">$18.99</Card.Text>
                                    <Button variant="primary" onClick={() => addToOrder("Seafood Paella")}>
                                        Add to Order
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        {/* Add more food items here */}
                    </Row>
                </Col>
                {selectedItems.length > 0 && (
                    <Col md={4}>
                        <div className="order-summary">
                            <h2>Order Summary</h2>
                            <ul>
                                {selectedItems.map((itemName, index) => (
                                    <li key={index}>
                                        {itemName}{' '}
                                        <Button variant="danger" size="sm" onClick={() => removeFromOrder(index)}>
                                            Remove
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <Form>
                                <Form.Group controlId="formDeliveryLocation">
                                    <Form.Label>Delivery Location</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={deliveryLocation}
                                        onChange={(e) => setDeliveryLocation(e.target.value)}
                                    >
                                        <option value="">Select delivery location</option>
                                        <option value="Room">Room</option>
                                        <option value="Pool Shezlong">Pool Shezlong</option>
                                    </Form.Control>
                                </Form.Group>
                                {deliveryLocation && (
                                    <Form.Group controlId="formDeliveryNumber">
                                        <Form.Label>
                                            {deliveryLocation === 'Room' ? 'Room Number' : 'Shezlong Number'}
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder={`Enter ${deliveryLocation} number`}
                                            value={deliveryNumber}
                                            onChange={(e) => setDeliveryNumber(e.target.value)}
                                        />
                                    </Form.Group>
                                )}
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
                            </Form>
                            <Button variant="success" onClick={submitOrder}>
                                Submit Order
                            </Button>
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default MenuFood;
