import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Sauna.css';
import cookieUtils from '../cookieUtils.jsx';

const Sauna = () => {
  const [saunas, setSaunas] = useState([]);
  const [selectedSauna, setSelectedSauna] = useState(null);
  const [reservationDate, setReservationDate] = useState('');
  const [showModal, setShowModal] = useState(false);

  const userId = cookieUtils.getUserIdFromCookies();

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
      setReservationDate('');
      handleCloseModal();
    } catch (error) {
      toast.error("This sauna is already reserved during the selected time slot.");
      console.error('Error adding reservation:', error);
    }
  };

  const handleShowModal = (sauna) => {
    setSelectedSauna(sauna);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSauna(null); 
  };

  return (
    <div>
      <div className="cover-photooooo"></div>
      <Container className="mt-5">
        <h1 className="mb-4"  style={{textAlign: 'center'}}>Saunas</h1>
        <Row>
          {saunas.map(sauna => (
            <Col md={4} key={sauna.id}>
              <Button
                variant="light"
                className={`list-group-item list-group-item-action ${selectedSauna && selectedSauna.id === sauna.id ? 'success' : ''}`}
                onClick={() => handleShowModal(sauna)} 
              >
                <Card className="sauna-card">
                  <Card.Body>
                    <Card.Title>Sauna {sauna.id}</Card.Title>
                    <Card.Img src={sauna.image} style={{maxWidth: '100%', height: '200px', objectFit: 'cover'}}/>
                    <Card.Text>Hall nr: {sauna.hallId}</Card.Text>
                    <Card.Text>Cost: {sauna.cost}$</Card.Text>
                    <Card.Text>Description: {sauna.description}</Card.Text>
                    <Card.Text>Duration: {sauna.duration} minutes</Card.Text>
                  </Card.Body>
                </Card>
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reserve Sauna {selectedSauna && selectedSauna.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReservationSubmit}>
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
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Sauna;
