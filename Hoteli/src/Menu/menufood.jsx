import React, { useState ,useEffect} from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';

function MenuFood() {
    const [selectedItems, setSelectedItems] = useState([]);
   
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryNumber, setDeliveryNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [foodItems, setFoodItems] = useState([]);

    const fetchFoodItems = async () => {
        try {
            const response = await fetch('https://localhost:7189/api/MenuFood');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setFoodItems(data); // Update foodItems state with fetched data
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };
    useEffect(() => {
        fetchFoodItems(); // Fetch food items when component mounts
    }, []);
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
                                        <Card.Text>
                                            {foodItem.foodDescription}
                                        </Card.Text>
                                        <Card.Text className="text-muted">${foodItem.foodPrice}</Card.Text>
                                        <Button variant="primary" onClick={() => addToOrder(`${foodItem.foodName} - ${foodItem.foodPrice}`)}>
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
                                {selectedItems.map((itemName, index) => (
                                    <li key={index}>
                                        {itemName}{' '}
                                        <Button variant="danger" size="sm" onClick={() => removeFromOrder(index)}>
                                            Remove
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <div className='d-flex  align-items-center flex-column'>
                            <Form style={{borderTop:'1px solid marron', borderRadius:'20px',padding:'20px', fontFamily: 'Roboto Slab, serif',width:'22em'}}>
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
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default MenuFood;
