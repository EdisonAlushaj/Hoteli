import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { SaunaEndPoint } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from '../../cookieUtils';

const SaunaCrud = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [Id, setId] = useState('')
    const [name, setName] = useState('')
    const [cost, setcost] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [hallId, setHallId] = useState('')
    const [duration, setDuration] = useState('')

    const [editId, setEditId] = useState('')
    const [editName, setEditName] = useState('')
    const [editcost, setEditcost] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editImage, setEditImage] = useState('')
    const [editHallId, setEditHallId] = useState('')
    const [editDuration, setEditDuration] = useState('')

    const [data, setData] = useState([]);

    const getToken = () => {
        return Cookies.getTokenFromCookies(); // Assuming you stored the JWT in a cookie named 'token'
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(SaunaEndPoint, {
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

    async function editSauna(cafes) {
        handleShow();
        setEditName(cafes.name);
        setEditcost(cafes.cost);
        setEditDescription(cafes.description);
        setEditHallId(cafes.hallId);
        setEditImage(cafes.image);
        setEditDuration(cafes.duration);
        setId(cafes.id);
    }
    async function Load() {
        const result = await axios.get(SaunaEndPoint);
        setName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${SaunaEndPoint}/UpdateSauna/${Id}`, {
                id: Id,
                name: editName,
                cost: editcost,
                description: editDescription,
                image: editImage,
                hallId: editHallId,
                duration: editDuration
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            toast.success('Sauna updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Sauna:", error);
        }
    }


    const handelDelete = (id) => {
        if (window, confirm("Are you sure to delete this Sauna.") == true) {
            axios.delete(`${SaunaEndPoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Sauna has been deleted');
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
        const url = SaunaEndPoint;
        const data = {
            "name": name,
            "cost": cost,
            "description": description,
            "image": image,
            "hallId": hallId,
            "duration": duration
        }

        axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((result) => {
                getData();
                clear();
                toast.success('Sauna has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setName('');
        setcost('');
        setDescription('');
        setImage('');
        setHallId('');
        setDuration('');

        setEditName('');
        setEditcost('');
        setEditDescription('');
        setEditImage('');
        setEditHallId('');
        setEditDuration('');

        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Sauna</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>cost</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Hall Id</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.cost}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <img src={item.image} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                                            </td>

                                            <td>{item.hallId}</td>
                                            <td>{item.duration}</td>

                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editSauna(item)}>Edit</button>

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

                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Sauna</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Sauna Name'
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Sauna cost'
                                    value={cost} onChange={(e) => setcost(e.target.value)}
                                />
                            </Col>

                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Sauna Description'
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Image'
                                    value={image} onChange={(e) => setImage(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Hall Id'
                                    value={hallId} onChange={(e) => setHallId(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Duration'
                                    value={duration} onChange={(e) => setDuration(e.target.value)}
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

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Sauna</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Sauna Name'
                                    value={editName} onChange={(e) => setEditName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter cost'
                                    value={editcost} onChange={(e) => setEditcost(e.target.value)}
                                />
                            </Col>

                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Image'
                                    value={editImage} onChange={(e) => setEditImage(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Hall Id'
                                    value={editHallId} onChange={(e) => setEditHallId(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Duration'
                                    value={editDuration} onChange={(e) => setEditDuration(e.target.value)}
                                />
                            </Col>
                        </Row>
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

export default SaunaCrud;