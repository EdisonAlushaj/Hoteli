import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { TableReservationsEndPoint } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookieUtils from '../../cookieUtils.jsx';

const TableReservation = () => {
    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const userId = cookieUtils.getUserIdFromCookies();
    const [tableId, setTableId] = useState('');
    const [reservationDatetime, setReservationDatetime] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [specialRequest, setSpecialRequest] = useState('');
    const [establishment, setEstablishment] = useState('');

    const [data, setData] = useState([]);

    const getToken = () => {
        return cookieUtils.getTokenFromCookies(); // Assuming you stored the JWT in a cookie named 'token'
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(TableReservationsEndPoint, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this table reservation?")) {
            axios.delete(`${TableReservationsEndPoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
                .then((result) => {
                    if (result.status === 204 || result.status === 200) {
                        toast.success('Reservation has been deleted');
                        setData(data.filter(item => item.reservationId !== id));
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };

    const handleSave = () => {
        // Check if there's an existing reservation for the same table and datetime
        const existingReservation = data.find(item => item.id === parseInt(tableId, 10) && new Date(item.reservationDate).getTime() === new Date(reservationDatetime).getTime());

        if (existingReservation) {
            // Show toast message that the table is already reserved at that time
            toast.error('The table is already reserved at the selected time.');
            return; // Exit function to prevent further execution
        }

        // Proceed with adding the new reservation
        const url = `${TableReservationsEndPoint}?userId=${userId}&tableId=${tableId}&reservationDate=${reservationDatetime}&maxGuests=${maxGuests}&specialRequests=${specialRequest}&establishment=${establishment}`;

        axios.post(url, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((result) => {
                if (result.status === 201) {
                    toast.success('Table reservation has been added.');
                    getData();
                    clear();
                    handleCloseAdd();
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };




    const clear = () => {
        //setUserId('');
        setTableId('');
        setReservationDatetime('');
        setMaxGuests('');
        setSpecialRequest('');
        setEstablishment('');
    };

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Table Reservation</b></p>
                    <Button className="btn btn-rounded btn-primary" onClick={handleShowAdd}>Add</Button>
                </div>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ReservationId</th>
                            <th>User Name</th>
                            <th>TableId</th>
                            <th>Reservation Date</th>
                            <th>Max Guests</th>
                            <th>Special Request</th>
                            <th>Establishment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.reservationId}</td>
                                        <td>{item.user.name}</td>
                                        <td>{item.tableId}</td>
                                        <td>{new Date(item.reservationDate).toLocaleString()}</td>
                                        <td>{item.maxGuests}</td>
                                        <td>{item.specialRequests}</td>
                                        <td>{item.establishment}</td>
                                        <td className='d-flex flex-row justify-content-evenly'>
                                            <Button className="btn btn-rounded btn-danger" onClick={() => handleDelete(item.reservationId)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))
                                :
                                'Loading...'
                        }
                    </tbody>
                </Table>
                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Table Reservation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {/* <Col>
                                <input type="text" className='form-control' placeholder='Enter userId'
                                    value={userId} onChange={(e) => setUserId(e.target.value)}
                                />
                            </Col> */}
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter tableId'
                                    value={tableId} onChange={(e) => setTableId(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="datetime-local" className='form-control' placeholder='Enter reservation date and time'
                                    value={reservationDatetime} onChange={(e) => setReservationDatetime(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter maxGuests'
                                    value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter specialRequest'
                                    value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <select className='form-control' value={establishment} onChange={(e) => setEstablishment(e.target.value)}>
                                    <option value="">Select establishment</option>
                                    <option value="Restaurant">Restaurant</option>
                                    <option value="Bar">Bar</option>
                                    <option value="Cafe">Cafe</option>
                                </select>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        </>
    );
};

export default TableReservation;
