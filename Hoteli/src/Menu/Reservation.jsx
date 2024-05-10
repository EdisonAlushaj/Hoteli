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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name ||  !formData.date || !formData.time || !formData.guests || !formData.establishment)  {
      setError('Please fill out all required fields.');
    } else {
      setError('');
      console.log('Form submitted:', formData);
      setFormData({
        name: '',
 
        date: '',
        time: '',
        guests: '',
        specialRequests: '',
        establishment: '' 
      });
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center flex-column'>
      <Form style={{ width: '35em', border: '1px solid black', borderRadius: '20px', padding: '20px', background: '#E4E2D6', fontFamily: 'Roboto Slab, serif', marginBottom: "3em" }} onSubmit={handleSubmit}>
        {error && <Alert variant="danger" style={{ marginBottom: '15px' }}>{error}</Alert>}
        <h1 className='text-center' style={{ color: '#999f81' }}>Fill your table reservation</h1>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={{ marginBottom: '15px' }}
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
                style={{ width: '10em', marginBottom: '15px' }}
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
                style={{ marginBottom: '15px' }}
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
            style={{ marginBottom: '15px' }}
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
            style={{ marginBottom: '15px' }}
          />
        </Form.Group>

        <Form.Group controlId="formEstablishment">
          <Form.Label>Establishment</Form.Label>
          <Form.Select
            name="establishment"
            value={formData.establishment}
            onChange={handleInputChange}
            style={{ marginBottom: '15px' }}
          >
            <option value="">Select establishment</option>
            <option value="Restaurant">Restaurant</option>
            <option value="Bar">Bar</option>
            <option value="Cafe">Cafe</option>
          </Form.Select>
        </Form.Group>

        <div className='d-flex justify-content-center align-items-center flex-column'>
          <Button type="submit" style={{ background: '#999f81', border: 'none', width: '12em' }}>
            Submit
          </Button>
        </div>
      </Form>
      </div>
  );
}

export default Reservation;
