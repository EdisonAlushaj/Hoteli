import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css';
import Reservation from './Reservation';

function Menu() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showReservation, setShowReservation] = useState(false);

  const addToOrder = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const removeFromOrder = (indexToRemove) => {
    const updatedItems = selectedItems.filter((item, index) => index !== indexToRemove);
    setSelectedItems(updatedItems);
  };

  const submitOrder = () => {
    console.log('Order submitted:', selectedItems);
    setSelectedItems([]);
  };

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  return (
    <Container>
      <h1 className="text-center mt-5">Menu</h1>
      <Row className="mt-5">
        <Col md={4}>
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
        {/* Additional food items cards */}
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Order Summary</h2>
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                {item}{' '}
                <Button variant="danger" size="sm" onClick={() => removeFromOrder(index)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          {selectedItems.length > 0 && (
            <Button variant="success" onClick={submitOrder}>
              Submit Order
            </Button>
          )}
        </Col>
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
