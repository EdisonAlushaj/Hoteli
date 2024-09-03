import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';
import cookieUtils from '../cookieUtils.jsx';

const MenuFood = () => {
    const [showAdd, setShowAdd] = useState(false);
    const [showQuantityModal, setShowQuantityModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const userId = cookieUtils.getUserIdFromCookies();
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryNumber, setDeliveryNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [foodItems, setFoodItems] = useState([]);

    const getToken = () => {
        return cookieUtils.getTokenFromCookies();
    }

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const fetchFoodItems = async () => {
        try {
            const response = await axios.get('https://localhost:7189/api/MenuFood', {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            console.log('Fetched Food Items:', response.data);

            setFoodItems(response.data);
        } catch (error) {
            toast.error('Error fetching food items.');
        }
    };

    const handleQuantityChange = (value, index) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].quantity = parseInt(value) || 1;
        setSelectedItems(updatedItems);
    };

    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, item) => total + item.foodPrice * item.quantity, 0);
    };

    const addToOrder = () => {
        if (quantity <= 0) {
            toast.error("Please enter a valid quantity.");
            return;
        }

        const existingItemIndex = selectedItems.findIndex(item =>
            item.menuFoodId === currentItem.menuFoodId && item.foodName === currentItem.foodName
        );

        if (existingItemIndex !== -1) {
            const updatedItems = [...selectedItems];
            updatedItems[existingItemIndex].quantity += quantity;
            setSelectedItems(updatedItems);
        } else {
            setSelectedItems([...selectedItems, { ...currentItem, quantity }]);
        }

        setShowQuantityModal(false);
        setQuantity(1);
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
                orderItems: selectedItems.map(item => ({
                    menuFoodId: parseInt(item.id),
                    quantity: parseInt(item.quantity),
                    foodName: item.foodName
                })),
                totalOrderPrice: calculateTotalPrice()
            };

            console.log('Order Data:', JSON.stringify(orderData, null, 2));

            const response = await axios.post('https://localhost:7189/api/Order', orderData, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                setSelectedItems([]);
                setDeliveryLocation('');
                setDeliveryNumber('');
                setPaymentMethod('');
                setShowAdd(false);
                toast.success('Order submitted successfully!');
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

    const handleShowQuantityModal = (item) => {
        setCurrentItem(item);
        setShowQuantityModal(true);
    };

    const handleCloseQuantityModal = () => {
        setShowQuantityModal(false);
        setQuantity(1);
    };

    return (
        <Container fluid style={{ backgroundColor: '#d1d1e0' }}>
            <h1 className="text-center mt-5" style={{ fontSize: '4rem', fontFamily: 'Roboto Slab, serif', color: '#47476b' }}>Menu</h1>
            <Row className="mt-5">
                <Col>
                    <Row md={4}>
                        {foodItems.map((foodItem, index) => (
                            <Col key={index}>
                                <Card>
                                    <Card.Img variant="top" src={foodItem.foodImage} />
                                    <Card.Body>
                                        <Card.Title style={{ color: '#6b4d38' }}>{foodItem.foodName}</Card.Title>
                                        <Card.Text>{foodItem.foodDescription}</Card.Text>
                                        <Card.Text className="text-muted">${foodItem.foodPrice}</Card.Text>
                                        <Button variant="primary" onClick={() => handleShowQuantityModal(foodItem)}>
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
                                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <img src={item.foodImage} alt={item.foodName} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                        <div style={{ flex: 1 }}>
                                            {item.foodName} - ${item.foodPrice} - {item.quantity} pcs
                                        </div>
                                        <Button variant="danger" size="sm" onClick={() => removeFromOrder(index)}>
                                            Remove
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <h4>Total Price: ${calculateTotalPrice().toFixed(2)}</h4>
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
                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <img src={item.foodImage} alt={item.foodName} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                <div style={{ flex: 1 }}>
                                    <Form.Group controlId={`formQuantity${index}`}>
                                        <Form.Label>{item.foodName} Quantity</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(e.target.value, index)}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        ))}
                    </Form>
                    <h4>Total Price: ${calculateTotalPrice().toFixed(2)}</h4>
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

            <Modal show={showQuantityModal} onHide={handleCloseQuantityModal}>
                {cookieUtils.getUserRoleFromCookies() ? (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Select Quantity</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {currentItem && (
                                <>
                                    <div className="text-center">
                                        <img src={currentItem.foodImage} alt={currentItem.foodName} style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
                                        <h5>{currentItem.foodName}</h5>
                                        <p>{currentItem.foodDescription}</p>
                                        <p className="text-muted">${currentItem.foodPrice}</p>
                                    </div>
                                    <Form.Group controlId="formQuantity">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        />
                                    </Form.Group>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseQuantityModal}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={addToOrder}>
                                Add to Order
                            </Button>
                        </Modal.Footer>
                    </>
                ) :
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Please Log In or Sign Up.</Modal.Title>
                        </Modal.Header>
                    </>
                }

            </Modal>

            <ToastContainer />
        </Container>
    );
};

export default MenuFood;
