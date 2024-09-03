import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { ActivitiesReservationEndPoint } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookieUtils from '../../cookieUtils.jsx';


const ActivitiesReservationCrud = () => {
    const [showAdd, setShowAdd] = useState(false);

    const userId = cookieUtils.getUserIdFromCookies();
    const [activitiesId, setactivitiesId] = useState('');

    const [data, setData] = useState([]);

    const getToken = () => {
        return cookieUtils.getTokenFromCookies(); // Assuming you stored the JWT in a cookie named 'token'
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(ActivitiesReservationEndPoint, {
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
        if (window.confirm("Are you sure to delete this Activity Reservation?")) {
            axios.delete(`${ActivitiesReservationEndPoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Activity Reservation has been deleted');
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    const handleSave = () => {
        const url = `${ActivitiesReservationEndPoint}?userId=${userId}&activitiesId=${activitiesId}`;

        axios.post(url, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((result) => {
                getData();
                clear();
                toast.success('Activity Reservation has been added.');
                handleCloseAdd();
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const clear = () => {
        // setUserId('');
        setactivitiesId('');

    };

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Activities Reservation</b></p>
                    <button className="btn btn-rounded btn-primary" onClick={handleShowAdd}>Add</button>
                </div>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                            <th>Activities Id</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.user.name}</td>
                                    <td>{item.activitiesId}</td>
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
                        <Modal.Title>Add Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {/* <Col>
                                <input type="number" className='form-control' placeholder='Enter User Id'
                                    value={userId} onChange={(e) => setUserId(e.target.value)}
                                />
                            </Col> */}
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Activity Id'
                                    value={activitiesId} onChange={(e) => setactivitiesId(e.target.value)}
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

export default ActivitiesReservationCrud;
