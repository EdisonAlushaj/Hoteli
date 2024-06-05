import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';
import cookieUtils from '../cookieUtils.jsx';

const MenuDrinks = () => {
    const [showAdd, setShowAdd] = useState(false);

    const userId = cookieUtils.getUserIdFromCookies();
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryNumber, setDeliveryNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [drinkItems, setdrinkItems] = useState([]);

    useEffect(() => {
        fetchdrinkItems();
    }, []);

    const fetchdrinkItems = async () => {
        try {
            const response = await axios.get('https://localhost:7189/api/MenuDrink');
            
            console.log('Fetched Drink Items:', response.data);
            
            setdrinkItems(response.data);
        } catch (error) {
            toast.error('Error fetching drink items.');
        }
    };

    const handleQuantityChange = (value, index) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].quantity = parseInt(value) || 1;
        setSelectedItems(updatedItems);
    };

    const addToOrder = (itemToAdd, quantity) => {
        if (quantity <= 0) {
            toast.error("Please enter a valid quantity.");
            return;
        }

        const existingItemIndex = selectedItems.findIndex(item =>
            item.menuDrinkId === itemToAdd.menuDrinkId && item.drinkkName === itemToAdd.drinkName
        );

        if (existingItemIndex !== -1) {
            const updatedItems = [...selectedItems];
            updatedItems[existingItemIndex].quantity += quantity;
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([...selectedItems, { ...itemToAdd, quantity }]);
        }
    };

    const removeFromOrder = (indexToRemove) => {
        const updatedItems = selectedItems.filter((item, index) => index !== indexToRemove);
        setSelectedItems(updatedItems);
    };

    const submitOrder = async () => {
        if (!userId || !deliveryLocation || !deliveryNumber || !paymentMethod || selectedItems.length === 0) {
            toast.error('Please fill out all fields and add items to your order.');
            return;
        }
    
        try {
            const orderData = {
                userId: userId,
                deliveryLocation: deliveryLocation,
                deliveryNumber: deliveryNumber,
                paymentMethod: paymentMethod,
                orderDrinkItems: selectedItems.map(item => ({
                    menuDrinkId: parseInt(item.id),
                    quantity: parseInt(item.quantity),
                    drinkkName: 'Drink'
                }))
            };
    
            console.log('Order Data:', JSON.stringify(orderData, null, 2));
    
            const response = await axios.post('https://localhost:7189/api/OrderDrinks', orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200 || response.status === 201) {
                setSelectedItems([]);
                setDeliveryLocation('');
                setDeliveryNumber('');
                setPaymentMethod('');
                setShowAdd(false);
                toast.success('Drink Order submitted successfully!');
            } else {
                toast.error(`Failed to submit order. Server responded with status code ${response.status}`);
            }
        } catch (error) {
            console.error('Order submission error:', error.response?.data || error.message);
            toast.error('Failed to submit order. Please try again later.');
        }
    };

    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    return (
        <Container fluid style={{ backgroundColor: '#d9bfbf' }}>
            <h1 className="text-center mt-5" style={{ fontSize: '4rem', fontFamily: 'Roboto Slab, serif', color: '#603939' }}>Menu</h1>
            <Row className="mt-5">
                <Col>
                    <Row md={4}>
                        {drinkItems.map((drinkItem, index) => (
                            <Col key={index}>
                                <Card>
                                    <Card.Img variant="top" src={drinkItem.drinkImage} />
                                    <Card.Body>
                                        <Card.Title style={{ color: '#6b4d38' }}>{drinkItem.drinkName}</Card.Title>
                                        <Card.Text>{drinkItem.drinkDescription}</Card.Text>
                                        <Card.Text className="text-muted">${drinkItem.drinkPrice}</Card.Text>
                                        <Button variant="primary" onClick={() => {
                                            const quantity = parseInt(prompt("Enter quantity:"));
                                            if (!isNaN(quantity) && quantity > 0) {
                                                addToOrder(drinkItem, quantity);
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
                            <h2>Order Summary</h2>
                            <ul>
                                {selectedItems.map((item, index) => (
                                    <li key={index}>
                                        {item.drinkName} - ${item.drinkPrice} - {item.quantity} pcs
                                        <Button variant="danger" size="sm" onClick={() => removeFromOrder(index)}>
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
                    <Modal.Title>Submit Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                        {selectedItems.map((item, index) => (
                            <div key={index}>
                                <Form.Group controlId={`formQuantity${index}`}>
                                    <Form.Label>{item.drinkName} Quantity</Form.Label>
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
                    <Button variant="primary" onClick={submitOrder}>
                        Submit Order
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer />
        </Container>
    );
};

export default MenuDrinks;
