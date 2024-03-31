import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';
import Reservation from './Reservation';

function Menu() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showReservation, setShowReservation] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
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
      deliveryAddress,
      paymentMethod,
    });
    setSelectedItems([]);
    setDeliveryAddress('');
    setPaymentMethod('');
  };

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  return (
    <Container fluid>
      <h1 className="text-center mt-5">Menu</h1>
      <Row className="mt-5">
        <Col md={8}>
          <Row>
            <Col>
              <Card>
                <Card.Img variant="top" src="food_item_1.jpg" />
                <Card.Body>
                  <Card.Title>Seafood Paella</Card.Title>
                  <Card.Text>
                    Traditional Spanish dish with a variety of fresh seafood and rice.
                  </Card.Text>
                  <Card.Text className="text-muted">$18.99</Card.Text>
                  <Button variant="primary" onClick={() => addToOrder('Seafood Paella')}>
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
                <Form.Group controlId="formDeliveryAddress">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
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
                    <option value="cash-at-door">Cash - At Door</option>
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
      <Row className="mt-5">
        <Col>
          {/* Reservation Button */}
          <Button variant="info" onClick={toggleReservation}>
            Make Reservation
          </Button>
          {showReservation && <Reservation />}
        </Col>
      </Row>
    </Container>
  );
}

export default Menu;
