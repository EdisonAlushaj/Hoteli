import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Spa.css';

const Spa = () => {
  const [spas, setSpas] = useState([]);
  const [selectedSpa, setSelectedSpa] = useState(null);
  const [spaReservations, setSpaReservations] = useState([]);
  const [reservationDate, setReservationDate] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        const response = await axios.get('https://localhost:7189/api/Spa');
        setSpas(response.data);
      } catch (error) {
        console.error('Error fetching spas:', error);
      }
    };

    const fetchSpaReservations = async () => {
      try {
        const response = await axios.get('https://localhost:7189/api/SpaReservation');
        setSpaReservations(response.data);
      } catch (error) {
        console.error('Error fetching spa reservations:', error);
      }
    };

    fetchSpas();
    fetchSpaReservations();
  }, []);

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSpa || !userId || !reservationDate) {
      console.error('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('https://localhost:7189/api/SpaReservation', null, {
        params: {
          userId: parseInt(userId),
          spaId: selectedSpa.id,
          reservationDate: reservationDate
        }
      });
      console.log('Spa reserved successfully:', response.data);
      const updatedReservations = await axios.get('https://localhost:7189/api/SpaReservation');
      setSpaReservations(updatedReservations.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error('Spa already reserved for this date');
      } else {
        console.error('Error reserving spa:', error);
      }
    }
  };

  return (
    <div>
      <div className="cover-photo">
      </div>
      <Container className="mt-5">
        <h1 className="mb-4">Spas</h1>
        <Row>
          <Col md={4}>
            <div className="list-group">
              {spas.map(spa => (
                <Button
                  key={spa.id}
                  variant="light"
                  className={`list-group-item list-group-item-action ${selectedSpa && selectedSpa.id === spa.id ? 'active' : ''}`}
                  onClick={() => setSelectedSpa(spa)}
                >
                  <Card className="spa-card">
                    <Card.Body>
                      <Card.Title>Spa {spa.id}</Card.Title>
                      <Card.Text>Location: {spa.location}</Card.Text>
                      <Card.Text>Description: {spa.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Button>
              ))}
            </div>
          </Col>
          <Col md={8}>
            {selectedSpa && (
              <div>
                <h2>Reserve Spa {selectedSpa.id}</h2>
                <Card className="reservation-form">
                  <Card.Body>
                    <Form onSubmit={handleReservationSubmit}>
                      <Form.Group controlId="userId">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control
                          type="text"
                          value={userId}
                          onChange={(e) => setUserId(e.target.value)}
                          placeholder="Enter your user ID"
                        />
                      </Form.Group>
                      <Form.Group controlId="reservationDate">
                        <Form.Label>Reservation Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={reservationDate}
                          onChange={(e) => setReservationDate(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="success" type="submit" className="btn-block">
                        Reserve Spa
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Spa;
