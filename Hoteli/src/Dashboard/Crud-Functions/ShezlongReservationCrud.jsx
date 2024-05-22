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

const TableReservation = () => {
    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [userId, setUserId] = useState('');
    const [tableId, setTableId] = useState('');
    const [reservationDatetime, setReservationDatetime] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [specialRequest, setSpecialRequest] = useState('');
    const [establishment, setEstablishment] = useState('');

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(TableReservationsEndPoint)
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
            axios.delete(`${TableReservationsEndPoint}/${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Reservation has been deleted');
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    };

    const handleSave = () => {
        const url = `${TableReservationsEndPoint}?userId=${userId}&tableId=${tableId}&reservationDatetime=${reservationDatetime}&maxGuests=${maxGuests}&specialRequest=${specialRequest}&establishment=${establishment}`;

        axios.post(url)
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
        setUserId('');
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
                            <th>UserId</th>
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
                                        <td>{item.userId}</td>
                                        <td>{item.tableId}</td>
                                        <td>{item.reservationDatetime}</td>
                                        <td>{item.maxGuests}</td>
                                        <td>{item.specialRequest}</td>
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
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter userId'
                                    value={userId} onChange={(e) => setUserId(e.target.value)}
                                />
                            </Col>
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
