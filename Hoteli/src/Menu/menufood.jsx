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
    const handleQuantityChange = (value, index) => {
        const updatedItems = [...selectedItems];
        updatedItems[index].quantity = parseInt(value);
        setSelectedItems(updatedItems);
    };
    const fetchFoodItems = async () => {
        try {
            const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    
            const response = await fetch('https://localhost:7189/api/MenuFood', {
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
            setFoodItems(data);
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };
    useEffect(() => {
        fetchFoodItems(); 
    }, []);

    const addToOrder = (itemToAdd, quantity) => {
        // Check if the itemToAdd is already in selectedItems
        const existingItemIndex = selectedItems.findIndex(item =>
            item.menuFoodId === itemToAdd.menuFoodId && item.foodName === itemToAdd.foodName
        );
    
        if (existingItemIndex !== -1) {
            // If the item exists, update its quantity
            const updatedItems = [...selectedItems];
            updatedItems[existingItemIndex].quantity += quantity; // Increment quantity
            setSelectedItems(updatedItems);
        } else {
            // If the item does not exist, add it with the specified quantity
            setSelectedItems([...selectedItems, { ...itemToAdd, quantity }]);
        }
    };
    
    
    const removeFromOrder = (indexToRemove) => {
        const updatedItems = selectedItems.filter((item, index) => index !== indexToRemove);
        setSelectedItems(updatedItems);
    };
    const submitOrder = async () => {
        try {
            // Retrieve user ID from JWT token stored in local storage
            const token = localStorage.getItem('token');
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;
    
            // Construct order data with the user ID
            const orderData = {
                userId: userId,
                deliveryLocation,
                deliveryNumber,
                paymentMethod,
                orderItems: selectedItems.map(item => ({
                    menuFoodId: item.menuFoodId,
                    quantity: item.quantity
                }))
            };
            // Add console logs here to check the values of orderData
            console.log('Order data:', orderData);
            console.log('JSON string:', JSON.stringify(orderData));
    
            const response = await fetch('https://localhost:7189/api/Order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit order');
            }
    
            // Reset form fields and selected items upon successful submission
            setSelectedItems([]);
            setDeliveryLocation('');
            setDeliveryNumber('');
            setPaymentMethod('');
    
            // Show success message to the user
            alert('Order submitted successfully!');
        } catch (error) {
            console.error('Error submitting order:', error);
        }
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
                                        <Button variant="primary" onClick={() => {
    const quantity = parseInt(prompt("Enter quantity:"));
    if (!isNaN(quantity) && quantity > 0) {
        addToOrder(foodItem, quantity);
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
                            <h2>Order Summary</h2>
                            <ul>
                                {selectedItems.map((item, index) => (
                                    <li key={index}>
                                        {item.foodName} - {item.foodPrice}{' '}
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
    {/* Order items will be dynamically added */}
    {/* Example: For each selected item, display a row with quantity input */}
    {selectedItems.map((item, index) => (
        <div key={index}>
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
    ))}
    <Button variant="success" onClick={submitOrder}>
        Submit Order
    </Button>
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
