import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Spa.css';  // Assuming you have additional custom CSS for Spa
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookieUtils from '../cookieUtils.jsx';

const ReserveSpaModal = ({ show, handleClose, spa, onSubmit }) => {
  const [reservationDate, setReservationDate] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(reservationDate);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reserve Spa {spa.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="reservationDate">
            <Form.Label>Reservation Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" className="btn-block">
            Reserve Spa
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const Spa = () => {
  const [spas, setSpas] = useState([]);
  const [selectedSpa, setSelectedSpa] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const userId = cookieUtils.getUserIdFromCookies();

  const getToken = () => {
    return cookieUtils.getTokenFromCookies(); // Assuming you stored the JWT in a cookie named 'token'
  }

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        const response = await axios.get('https://localhost:7189/api/Spa', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setSpas(response.data);
      } catch (error) {
        console.error('Error fetching spas:', error);
      }
    };

    fetchSpas();
  }, []);

  const handleReservationSubmit = async (reservationDate) => {
    if (!selectedSpa || !userId || !reservationDate) {
      console.error('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post(`https://localhost:7189/api/SpaReservation?userId=${userId}&spaId=${selectedSpa.id}&reservationStart=${reservationDate}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      toast.success('Spa Reservation has been added.');
      console.log('Reservation added successfully:', response.data);
      setShowReservationModal(false);
    } catch (error) {
      toast.error("This spa is already reserved during the selected time slot.");
      console.error('Error adding reservation:', error);
    }
  };

  const openReservationModal = (spa) => {
    setSelectedSpa(spa);
    setShowReservationModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
    setSelectedSpa(null);
  };

  return (
    <div>
      <ToastContainer />
      <div className="cover-photo"></div>
      <Container className="mt-5">
        <h1 className="mb-4" style={{ textAlign: 'center', backgroundColor: 'grey' }}>Spas</h1>
        <Row>
          {spas.map(spa => (
            <Col key={spa.id} md={3} className="mb-4">
              <Button
                variant="light"
                className={`list-group-item list-group-item-action ${selectedSpa && selectedSpa.id === spa.id ? 'success' : ''}`}
                onClick={() => openReservationModal(spa)}
              >
                <Card className="spa-card">
                  <Card.Body>
                    <Card.Title className="spa-name">{spa.name}</Card.Title>
                    <div className="card-info">
                      <Form.Label>Duration:</Form.Label>
                      <Card.Text>{spa.durationInMinutes} minutes</Card.Text>
                    </div>
                    <div className="card-info">
                      <Form.Label>Price:</Form.Label>
                      <Card.Text>${spa.price}</Card.Text>
                    </div>
                    <div className="card-info">
                      <Form.Label>Location:</Form.Label>
                      <Card.Text>{spa.hallId}</Card.Text>
                    </div>
                    <div className="card-info">
                      <Form.Label>{spa.description}</Form.Label>
                    </div>
                  </Card.Body>
                </Card>
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      {selectedSpa && (
        <ReserveSpaModal
          show={showReservationModal}
          handleClose={closeReservationModal}
          spa={selectedSpa}
          onSubmit={handleReservationSubmit}
        />
      )}
    </div>
  );
};

export default Spa;
