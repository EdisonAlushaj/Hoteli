import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Reservation = () => {
    const [userId, setUserId] = useState('');
    const [tableId, setTableId] = useState('');
    const [reservationDatetime, setReservationDatetime] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [specialRequest, setSpecialRequest] = useState('');
    const [establishment, setEstablishment] = useState('');

    const handleSave = () => {
        if (!userId || !tableId || !reservationDatetime || !maxGuests || !establishment) {
            toast.error('Please fill in all required fields');
            return;
        }
        const url = `https://localhost:7189/api/TableReservations?userId=${userId}&tableId=${tableId}&reservationDate=${reservationDatetime}&maxGuests=${maxGuests}&specialRequests=${specialRequest}&establishment=${establishment}`;

        axios.post(url)
            .then((result) => {
                if (result.status === 201) {
                    toast.success('Table reservation has been added.');
                    clear();
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const clear = () => {
        setUserId('');
        setTableId('');
        setReservationDatetime('');
        setMaxGuests('');
        setSpecialRequest('');
        setEstablishment('');
    };

    return (
        <Container>
            <ToastContainer />
            <h1 className='text-center' style={{ color: '#999f81' }}>Fill your table reservation</h1>
            <div className='d-flex justify-content-center align-items-center flex-column'>
            <Form style={{ width: '35em', border: '1px solid black', borderRadius: '20px', padding: '20px', background: '#E4E2D6', fontFamily: 'Roboto Slab, serif', marginBottom: "3em" }}>
                <Row>
                    <Col>
                        <Form.Group controlId="userId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter user ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tableId">
                            <Form.Label>Table ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter table ID" value={tableId} onChange={(e) => setTableId(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                
                    <Col>
                        <Form.Group controlId="reservationDatetime">
                            <Form.Label>Reservation Date and Time</Form.Label>
                            <Form.Control type="datetime-local" placeholder="Enter reservation date and time" value={reservationDatetime} onChange={(e) => setReservationDatetime(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="maxGuests">
                            <Form.Label>Max Guests</Form.Label>
                            <Form.Control type="number" placeholder="Enter max guests" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
                        </Form.Group>
                    </Col>
                
                    <Col>
                        <Form.Group controlId="specialRequest">
                            <Form.Label>Special Requests</Form.Label>
                            <Form.Control type="text" placeholder="Enter special requests" value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="establishment">
                            <Form.Label>Establishment</Form.Label>
                            <Form.Control as="select" value={establishment} onChange={(e) => setEstablishment(e.target.value)}>
                                <option value="">Select establishment</option>
                                <option value="Restaurant">Restaurant</option>
                                <option value="Bar">Bar</option>
                                <option value="Cafe">Cafe</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
               
                <div className='d-flex justify-content-center align-items-center flex-column'>
                <Button style={{ background: '#999f81', border: 'none', width: '12em', marginTop: '15px' }} onClick={handleSave}>Add Reservation</Button>
                </div>
            </Form>
            </div>
        </Container>
    );
};

export default Reservation;
