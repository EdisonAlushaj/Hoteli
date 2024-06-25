import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import cookieUtils from '../cookieUtils.jsx';

const Reservation = () => {
    const userId = cookieUtils.getUserIdFromCookies();

    const [tableId, setTableId] = useState('');
    const [reservationDatetime, setReservationDatetime] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [specialRequest, setSpecialRequest] = useState('');
    const [establishment, setEstablishment] = useState('');
    const [tables, setTables] = useState([]); // State for tables

    useEffect(() => {
        if (establishment) {
            // Fetch tables based on establishment
            axios.get(`https://localhost:7189/api/Table/by-establishment/${establishment}`)
                .then(response => {
                    setTables(response.data);
                })
                .catch(error => {
                    toast.error('Error fetching tables for the selected establishment');
                });
        } else {
            setTables([]);
        }
    }, [establishment]);

    useEffect(() => {
        if (tableId) {
            // Fetch the selected table details
            axios.get(`https://localhost:7189/api/Table/${tableId}`)
                .then(response => {
                    setMaxGuests(response.data.maxGuests);
                })
                .catch(error => {
                    toast.error('Error fetching table details');
                });
        } else {
            setMaxGuests('');
        }
    }, [tableId]);

    const handleSave = async () => {
        if (!userId || !tableId || !reservationDatetime || !maxGuests || !establishment) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Validate reservation date/time
        const now = new Date().toISOString();
        if (reservationDatetime < now) {
            toast.error('Cannot reserve table for past dates or times');
            return;
        }

        const specialRequestText = specialRequest.trim() === '' ? 'none' : specialRequest;
        // Fetch existing reservations for the specified table
        try {
            const existingReservations = await axios.get(`https://localhost:7189/api/TableReservations`);

            // Check for overlapping reservations
            const reservationTime = new Date(reservationDatetime).getTime();
            const threeHoursLater = reservationTime + 3 * 60 * 60 * 1000;

            const conflict = existingReservations.data.some(reservation => {
                const existingReservationTime = new Date(reservation.reservationDate).getTime();
                return reservation.id === parseInt(tableId) && (
                    (reservationTime <= existingReservationTime && existingReservationTime < threeHoursLater) ||
                    (existingReservationTime <= reservationTime && reservationTime < existingReservationTime + 3 * 60 * 60 * 1000)
                );
            });

            if (conflict) {
                toast.error('Table is already reserved for this date and time or within the next 3 hours');
                return;
            }

        } catch (error) {
            toast.error('Error checking existing reservations');
            return;
        }

        // Create the reservation
        const url = `https://localhost:7189/api/TableReservations?userId=${userId}&tableId=${tableId}&reservationDate=${reservationDatetime}&maxGuests=${maxGuests}&specialRequests=${specialRequestText}&establishment=${establishment}`;

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
        setTableId('');
        setReservationDatetime('');
        setMaxGuests('');
        setSpecialRequest('');
        setEstablishment('');
        setTables([]);
    };

    return (
        <Container>
            <ToastContainer />
            <h1 className='text-center' style={{ color: '#999f81' }}>Fill your table reservation</h1>
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <Form style={{ width: '35em', border: '1px solid black', borderRadius: '20px', padding: '20px', background: '#E4E2D6', fontFamily: 'Roboto Slab, serif', marginBottom: "3em" }}>
                    {cookieUtils.getUserRoleFromCookies() ? (
                        <>
                            <Row>
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

                                <Col>
                                    <Form.Group controlId="tableId">
                                        <Form.Label>Table ID</Form.Label>
                                        <Form.Control as="select" value={tableId} onChange={(e) => setTableId(e.target.value)} disabled={!establishment}>
                                            <option value="">Select table</option>
                                            {tables.map(table => (
                                                <option key={table.id} value={table.id}>{table.tableNumber}</option>
                                            ))}
                                        </Form.Control>
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
                                    <Form.Control type="number" placeholder="Enter max guests" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} readOnly />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="specialRequest">
                                    <Form.Label>Special Requests</Form.Label>
                                    <Form.Control type="text" placeholder="Enter special requests " value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <div className='d-flex justify-content-center align-items-center flex-column'>
                                <Button style={{ background: '#999f81', border: 'none', width: '12em', marginTop: '15px' }} onClick={handleSave}>Add Reservation</Button>
                            </div>
                        </>
                    ) :
                        <>
                            <Row>
                                <Col>
                                    <Form.Group className='d-flex justify-content-center'>
                                        <p style={{marginBottom: '0'}}>Please Log In or Sign Up</p>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </>
                    }
                </Form>
            </div>
        </Container>
    );
};

export default Reservation;
