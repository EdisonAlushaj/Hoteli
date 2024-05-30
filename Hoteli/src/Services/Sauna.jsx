import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Sauna.css';

const Sauna = () => {
  const [saunas, setSaunas] = useState([]);
  const [selectedSauna, setSelectedSauna] = useState(null);
  const [saunaReservations, setSaunaReservations] = useState([]);
  const [reservationDate, setReservationDate] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchSaunas = async () => {
      try {
        const response = await axios.get('https://localhost:7189/api/Sauna');
        setSaunas(response.data);
      } catch (error) {
        console.error('Error fetching saunas:', error);
      }
    };
    fetchSaunas();
  }, []);

     const handleReservationSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSauna || !userId || !reservationDate) {
      console.error('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post(`https://localhost:7189/api/SaunaReservation?userId=${userId}&saunaId=${selectedSauna.id}&reservationStart=${reservationDate}`);
      toast.success('Sauna Reservation has been added.');
      console.log('Reservation added successfully:', response.data);
      setUserId('');
      setReservationDate('');
    } catch (error) {
      toast.error("This sauna is already reserved during the selected time slot.");
      console.error('Error adding reservation:', error);
    }
  };

   
  return (
    <div>
      <div className="cover-photooooo"></div>
      <Container className="mt-5">
        <h1 className="mb-4">Saunas</h1>
        <Row>
          <Col md={4}>
            <div className="list-group">
              {saunas.map(sauna => (
                <Button
                  key={sauna.id}
                  variant="light"
                  className={`list-group-item list-group-item-action ${selectedSauna && selectedSauna.id === sauna.id ? 'active' : ''}`}
                  onClick={() => setSelectedSauna(sauna)}
                >
                  <Card className="sauna-card">
                    <Card.Body>
                      <Card.Title>Sauna {sauna.id}</Card.Title>
                      <Card.Text>Hall nr: {sauna.hallId}</Card.Text>
                      <Card.Text>Cost: {sauna.cost}$</Card.Text>
                      <Card.Text>Description: {sauna.description}</Card.Text>
                      <Card.Text>Duration: {sauna.duration}</Card.Text>
                    </Card.Body>
                  </Card>
                </Button>
              ))}
            </div>
          </Col>
          <Col md={8}>
            {selectedSauna && (
              <div>
                <h2>Reserve Sauna {selectedSauna.id}</h2>
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
                          type="datetime-local"
                          value={reservationDate}
                          onChange={(e) => setReservationDate(e.target.value)}
                        />
                      </Form.Group>
                      <Button variant="success" type="submit" className="btn-block">
                        Reserve Sauna
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Sauna;
