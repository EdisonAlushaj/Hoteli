import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { SaunaReservationEndPoint } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SaunaReservationCrud= () => {
    const [showAdd, setShowAdd] = useState(false);

    const [userId, setUserId] = useState('');
    const [saunaId, setsaunaId] = useState('');
    const[reservationDate,setReservationDate] =useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(SaunaReservationEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this Sauna Reservation?")) {
            axios.delete(`${SaunaReservationEndPoint}/${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Sauna Reservation has been deleted');
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    const handleSave = () => {
        const url = `${SaunaReservationEndPoint}?userId=${userId}&saunaId=${saunaId}&reservationDate=${reservationDate}`;

        axios.post(url)
            .then((result) => {
                getData();
                clear();
                toast.success('Sauna Reservation has been added.');
                handleCloseAdd();
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const clear = () => {
        setUserId('');
        setsaunaId('');
        setReservationDate('');
    };

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Sauna Reservation</b></p>
                    <button className="btn btn-rounded btn-primary" onClick={handleShowAdd}>Add</button>
                </div>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Id</th>
                            <th>Sauna Id</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.userId}</td>
                                    <td>{item.saunaId}</td>
                                    <td>{item.reservationDate}</td>
                                    <td className='d-flex flex-row justify-content-evenly'>
                                        <button className="btn btn-rounded btn-danger" onClick={() => handleDelete(item.reservationId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : 'Loading...'}
                    </tbody>
                </Table>

                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Sauna</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter User Id'
                                    value={userId} onChange={(e) => setUserId(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Sauna Id'
                                    value={saunaId} onChange={(e) => setsaunaId(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="date" className='form-control' placeholder='Enter Date '
                                    value={reservationDate} onChange={(e) => setReservationDate(e.target.value)}
                                />
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

export default SaunaReservationCrud;
