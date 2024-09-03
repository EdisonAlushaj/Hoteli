import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { PoolEndPoint } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from '../../cookieUtils';

const Pool = () => {
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [id, setId] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');
    const [poolArea, setPoolArea] = useState('');
    const [numberofGuests, setNumberofGuests] = useState('');
    const [hallId, setHallId] = useState('');

    const [editId, setEditId] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editDuration, setEditDuration] = useState('');
    const [editPoolArea, setEditPoolArea] = useState('');
    const [editNumberofGuests, setEditNumberofGuests] = useState('');
    const [editHallId, setEditHallId] = useState('');

    const [data, setData] = useState([]);

    const getToken = () => {
        return Cookies.getTokenFromCookies(); // Assuming you stored the JWT in a cookie named 'token'
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(PoolEndPoint, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function editPool(pool) {
        handleShow();
        setEditDate(pool.date);
        setEditDuration(pool.duration);
        setEditPoolArea(pool.poolArea);
        setEditNumberofGuests(pool.numberofGuests);
        setEditHallId(pool.hallId);
        setEditId(pool.id);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${PoolEndPoint}/UpdatePool/${editId}`, {
                id: editId,
                date: editDate,
                duration: editDuration,
                poolArea: editPoolArea,
                numberofGuests: editNumberofGuests,
                hallId: editHallId,
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            toast.success('Pool updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Pool:", error);
        }
    }

    const handelDelete = (id) => {
        if (window.confirm("Are you sure to delete this Pool.") === true) {
            axios.delete(`${PoolEndPoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Pool has been deleted');
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    }

    const handleSave = () => {
        const data = {
            date: date,
            duration: duration,
            poolArea: poolArea,
            numberofGuests: numberofGuests,
            hallId: hallId,
        }

        axios.post(PoolEndPoint, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then(() => {
                getData();
                clear();
                toast.success('Pool has been added.');
                handleCloseAdd();
            })
            .catch((error) => {
                toast.error("Error adding Pool:", error);
            });
    }

    const clear = () => {
        setDate('');
        setDuration('');
        setPoolArea('');
        setNumberofGuests('');
        setHallId('');
        setEditDate('');
        setEditDuration('');
        setEditPoolArea('');
        setEditNumberofGuests('');
        setEditHallId('');
        setEditId('');
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className='d-flex justify-content-evenly' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                <p style={{ fontSize: "2em", margin: "0" }}><b>Pool Table</b></p>
                <button className="btn btn-rounded btn-primary" onClick={handleShowAdd}>Add</button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Pool Area</th>
                        <th>Number of Guests</th>
                        <th>Hall Id</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.date}</td>
                            <td>{item.duration}</td>
                            <td>{item.poolArea}</td>
                            <td>{item.numberofGuests}</td>
                            <td>{item.hallId}</td>
                            <td className='d-flex flex-row justify-content-evenly'>
                                <button className="btn btn-rounded btn-primary" onClick={() => editPool(item)}>Edit</button>
                                <button className="btn btn-rounded btn-danger" onClick={() => handelDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    )) : 'Loading...'}
                </tbody>
            </Table>

            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Pool</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="date" className='form-control' placeholder='Enter date'
                                value={date} onChange={(e) => setDate(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Duration'
                                value={duration} onChange={(e) => setDuration(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Pool Area'
                                value={poolArea} onChange={(e) => setPoolArea(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Number Of Guests'
                                value={numberofGuests} onChange={(e) => setNumberofGuests(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <input type="number" className='form-control' placeholder='Enter Hall Id'
                                value={hallId} onChange={(e) => setHallId(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <br />
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Pool</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="date" className='form-control' placeholder='Enter date'
                                value={editDate} onChange={(e) => setEditDate(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Duration'
                                value={editDuration} onChange={(e) => setEditDuration(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Pool Area'
                                value={editPoolArea} onChange={(e) => setEditPoolArea(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="number" className='form-control' placeholder='Enter Number of Guests'
                                value={editNumberofGuests} onChange={(e) => setEditNumberofGuests(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <input type="number" className='form-control' placeholder='Enter Hall Id'
                                value={editHallId} onChange={(e) => setEditHallId(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={update}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
};

export default Pool;
