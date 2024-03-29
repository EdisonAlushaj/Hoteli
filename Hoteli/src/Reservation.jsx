import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

function Reservation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    specialRequests: '',
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    

    if (name === "guests" && parseInt(value) < 1) {

      return;
    }
  
    // Update vlerën e formës
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.guests) {
      setError('Please fill out all required fields.');
    } else {
      setError('');
      console.log('Form submitted:', formData);
   
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: '',
        specialRequests: '',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="formGuests">
        <Form.Label>Number of Guests</Form.Label>
        <Form.Control
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="formSpecialRequests">
        <Form.Label>Special Requests</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Any special requests or comments?"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Reservation;
