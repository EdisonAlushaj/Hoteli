import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';

function MenuCoffe() {
    const [selectedItems, setSelectedItems] = useState([]);
   
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [deliveryNumber, setDeliveryNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cafeItems, setCafeItems] = useState([]);

    const fetchCafeItems = async () => {
        try {
            const response = await fetch('https://localhost:7189/api/MenuCafe');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setCafeItems(data); 
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };
    useEffect(() => {
        fetchCafeItems(); 
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
        <Container fluid style={{ backgroundColor: '#FFE4C4' }}>
            <h1 className="text-center mt-5" style={{ fontSize: '4rem', fontFamily: 'Roboto Slab, serif', color: '#b07256' }}>Menu</h1>
            <Row className="mt-5">
                <Col >
                <Row md={4}>
                        {cafeItems.map((cafeItem, index) => (
                            <Col key={index}>
                                <Card>
                                    <Card.Img variant="top" src={cafeItem.cafeImage} />
                                    <Card.Body>
                                        <Card.Title style={{ color: '#6b4d38' }}>{cafeItem.cafeName}</Card.Title>
                                        <Card.Text>
                                            {cafeItem.cafeDescription}
                                        </Card.Text>
                                        <Card.Text className="text-muted">${cafeItem.foodPrice}</Card.Text>
                                        <Button variant="primary" onClick={() => addToOrder(`${cafeItem.cafeName} - ${cafeItem.cafePrice}`)}>
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
                        <div className="order-summary" >
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
                            </ul><hr /><div className='d-flex  align-items-center flex-column'>
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
                                <Button variant="success" onClick={submitOrder} style={{marginTop:'1em'}}>
                                Submit Order
                            </Button>
                            </Form>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default MenuCoffe;
