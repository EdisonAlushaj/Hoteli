import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {RoomEndPoint} from'../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomCrud2 = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [Id, setId] = useState('')
    const [roomName, setRoomName] = useState('')
    const [capacity, setCapacity] = useState('')
    const [size, setSize] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')

    const [editId, setEditId] = useState('')
    const [editRoomName, setEditRoomName] = useState('')
    const [editCapacity, setEditCapacity] = useState('')
    const [editSize, setEditSize] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editPrice, setEditPrice] = useState('')
    const [editImage, setEditImage] = useState('')

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(RoomEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editStudent(employes) {
        handleShow();
        setEditRoomName(employes.roomName);
        setEditCapacity(employes.capacity);
        setEditSize(employes.size);
        setEditDescription(employes.description);
        setEditPrice(employes.price);
        setEditImage(employes.image);

        setId(employes.id);
    }
    async function Load() {
        const result = await axios.get(RoomEndPoint);
        setRoomName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${RoomEndPoint}/UpdateRoom/${Id}`, {
                id: Id,
                roomName: editRoomName,
                capacity: editCapacity,
                size: editSize,
                description: editDescription,
                price: editPrice,
                image: editImage,
            });
            toast.success('Room updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating room:", error);
        }
    }

    const handelDelete = (id) => {
        if (window, confirm("Are you sure to delete this room.") == true) {
            axios.delete(`${RoomEndPoint}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Room has been deleted');
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
        const url = RoomEndPoint;
        const data = {
            "roomName": roomName,
            "capacity": capacity,
            "size": size,
            "description": description,
            "price": price,
            "image": image
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Room has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setRoomName('');
        setCapacity('');
        setSize('');
        setDescription('');
        setPrice('');
        setImage('');

        setEditRoomName('');
        setEditCapacity('');
        setEditSize('');
        setEditDescription('');
        setEditPrice('');
        setEditImage('');
        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                {/* <Container>
                    <Row>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Id'
                                value={Id} onChange={(e) => setId(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Room Name'
                                value={roomName} onChange={(e) => setRoomName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Capacity'
                                value={capacity} onChange={(e) => setCapacity(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Size'
                                value={size} onChange={(e) => setSize(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Description'
                                value={description} onChange={(e) => setDescription(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Price'
                                value={price} onChange={(e) => setPrice(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Image'
                                value={image} onChange={(e) => setImage(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <button className='btn btn-primary' onClick={() => handleSave()}>Submit</button>
                        </Col>
                    </Row>
                </Container> */}

                <div className='d-flex justify-content-evenly ' style={{width: "20em", height: "3em", alignItems: "center"}}>
                    <p style={{fontSize: "2em", margin: "0"}}><b>Room Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Room Name</th>
                            <th>Capacity</th>
                            <th>Size</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.roomName}</td>
                                            <td>{item.capacity}</td>
                                            <td>{item.size}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            {/* <td>{item.image}</td> */}
                                            <td>
                                                <img src={item.image} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                                            </td>
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editStudent(item)}>Edit</button>

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

                {/* Add Room */}
                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Room Name'
                                    value={roomName} onChange={(e) => setRoomName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Capacity'
                                    value={capacity} onChange={(e) => setCapacity(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Size'
                                    value={size} onChange={(e) => setSize(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>

                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Price'
                                    value={price} onChange={(e) => setPrice(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Image'
                                    value={image} onChange={(e) => setImage(e.target.value)}
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

                {/* Update Room */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Room Name'
                                    value={editRoomName} onChange={(e) => setEditRoomName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Capacity'
                                    value={editCapacity} onChange={(e) => setEditCapacity(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Size'
                                    value={editSize} onChange={(e) => setEditSize(e.target.value)}
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
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Price'
                                    value={editPrice} onChange={(e) => setEditPrice(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Image'
                                    value={editImage} onChange={(e) => setEditImage(e.target.value)}
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

export default RoomCrud2;