import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomCrud2 = () => {
    const empdata = [
        {
            Id: 1,
            RoomName: 'Room1',
            Capacity: 2,
            Size: 22,
            Description: 'Description1',
            Price: 100,
            Image: 'image1',
        },
        {
            Id: 2,
            RoomName: 'Room2',
            Capacity: 2,
            Size: 23,
            Description: 'Description32',
            Price: 100,
            Image: 'image2',
        },
        {
            Id: 3,
            RoomName: 'Room3',
            Capacity: 3,
            Size: 23,
            Description: 'Description3',
            Price: 100,
            Image: 'image3',
        },
    ];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
        // setData(empdata);
        getData();
    }, []);

    const getData = () => {
        axios.get('https://localhost:7189/api/Room')
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handelEdit = (id) => {
        //alert(id);
        handleShow();
    }

    const handelDelete = (id) => {
        alert(id);
    }

    const handleUpdate = () => {

    }

    const handleSave = () => {
        const url = 'https://localhost:7189/api/Room';
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
                <ToastContainer/>
                <Container>
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
                </Container>

                <br /><br />

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
                                            <td>{index+1}</td>
                                            <td>{item.roomName}</td>
                                            <td>{item.capacity}</td>
                                            <td>{item.size}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td>{item.image}</td>
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => handelEdit(item.Id)}>Edit</button>
                                                <button className="btn btn-rounded btn-danger" onClick={() => handelDelete(item.Id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                :
                                'Loading...'
                        }

                    </tbody>
                </Table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Id'
                                    value={editId} onChange={(e) => setEditId(e.target.value)}
                                />
                            </Col>
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
                        <Button variant="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        </>
    );
};

export default RoomCrud2;
