import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { HallEndPoint } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from '../../cookieUtils';

const Hall = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [Id, setId] = useState('')
    const [hallName, setHallName] = useState('')
    const [floor, setFloor] = useState('')


    const [editId, setEditId] = useState('')
    const [editHallName, setEditHallName] = useState('')
    const [editFloor, setEditFloor] = useState('')

    const [data, setData] = useState([]);

    const getToken = () => {
        return Cookies.getTokenFromCookies(); // Assuming you stored the JWT in a cookie named 'token'
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(HallEndPoint, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editHall(cafes) {
        handleShow();
        setEditHallName(cafes.hallName);
        setEditFloor(cafes.floor);

        setId(cafes.id);
    }
    async function Load() {
        const result = await axios.get(HallEndPoint);
        setHallName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${HallEndPoint}/UpdateHall/${Id}`, {
                id: Id,
                hallName: editHallName,
                floor: editFloor,

            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            toast.success('Hall updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Hall:", error);
        }
    }


    const handelDelete = (id) => {
        if (window, confirm("Are you sure to delete this hall.") == true) {
            axios.delete(`${HallEndPoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Hall has been deleted');
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }

    const handleSave = () => {
        handleShowAdd();
        const url = HallEndPoint;
        const data = {
            "hallName": hallName,
            "floor": floor
        }


        axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((result) => {
                getData();
                clear();
                toast.success('Hall has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setHallName('');
        setFloor('');


        setEditHallName('');
        setEditFloor('');

        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Hall Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Hall Name</th>
                            <th>Floor</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.hallName}</td>
                                            <td>{item.floor}</td>

                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editHall(item)}>Edit</button>

                                                <button className="btn btn-rounded btn-danger" onClick={() => handelDelete(item.id)}>Delete</button>

                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                'Loading...'
                        }

                    </tbody>
                </Table>

                {/* Add MenuCafe */}
                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add MenuFood</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Hall Name'
                                    value={hallName} onChange={(e) => setHallName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Floor'
                                    value={floor} onChange={(e) => setFloor(e.target.value)}
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
                        <Modal.Title>Update Hall</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Hall Name'
                                    value={editHallName} onChange={(e) => setEditHallName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Floor'
                                    value={editFloor} onChange={(e) => setEditFloor(e.target.value)}
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
        </>
    );
};

export default Hall;