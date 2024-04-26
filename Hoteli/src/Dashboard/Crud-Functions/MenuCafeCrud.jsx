import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {MenuCafeEndPoint} from'../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuCafeCrud = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [Id, setId] = useState('')
    const [cafeName, setCafeName] = useState('')
    const [cafeDescription, setCafeDescription] = useState('')
    const [cafePrice, setCafePrice] = useState('')
    const [cafeImage, setCafeImage] = useState('')

    const [editId, setEditId] = useState('')
    const [editCafeName, setEditCafeName] = useState('')
    const [editCafeDescription, setEditCafeDescription] = useState('')
    const [editCafePrice, setEditCafePrice] = useState('')
    const [editCafeImage, setEditCafeImage] = useState('')

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(MenuCafeEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editMenuCafe(cafes) {
        handleShow();
        setEditCafeName(cafes.cafeName);
        setEditCafeDescription(cafes.cafeDescription);
        setEditCafePrice(cafes.cafePrice);
        setEditCafeImage(cafes.cafeImage);
        setId(cafes.id);
    }
    async function Load() {
        const result = await axios.get(MenuCafeEndPoint);
        setCafeName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${MenuCafeEndPoint}/UpdateCafe/${Id}`, {
                id: Id,
                cafeName: editCafeName,
                cafeDescription: editCafeDescription,
                cafePrice: editCafePrice,
                cafeImage: editCafeImage,
            });
            toast.success('MenuCafe updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating MenuCafe:", error);
        }
    }


    const handelDelete = (id) => {
        if (window, confirm("Are you sure to delete this room.") == true) {
            axios.delete(`${MenuCafeEndPoint}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('MenuCafe has been deleted');
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
        const url = MenuCafeEndPoint;
        const data = {
            "cafeName": cafeName,
            "cafeDescription": cafeDescription,
            "cafePrice": cafePrice,
            "image": cafeImage
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
        setCafeName('');
        setCafeDescription('');
        setCafePrice('');
        setCafeImage('');

        setEditCafeName('');
        setEditCafeDescription('');
        setEditCafePrice('');
        setEditCafeImage('');
        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{width: "20em", height: "3em", alignItems: "center"}}>
                    <p style={{fontSize: "2em", margin: "0"}}><b>Coffee&Sweets Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Cafe Name</th>
                            <th>Cafe Description</th>
                            <th>Cafe Price</th>
                            <th>Cafe Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.cafeName}</td>
                                            <td>{item.cafeDescription}</td>
                                            <td>{item.cafePrice}</td>
                                            <td>{item.cafeImage}</td>
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editMenuCafe(item)}>Edit</button>

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
                        <Modal.Title>Add MenuCafe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Cafe Name'
                                    value={cafeName} onChange={(e) => setCafeName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Cafe Description'
                                    value={cafeDescription} onChange={(e) => setCafeDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Cafe Price'
                                    value={cafePrice} onChange={(e) => setCafePrice(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Cafe Image'
                                    value={cafeImage} onChange={(e) => setCafeImage(e.target.value)}
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

                {/* Update MenuCafe */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Room Name'
                                    value={editCafeName} onChange={(e) => setEditCafeName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={editCafeDescription} onChange={(e) => setEditCafeDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Price'
                                    value={editCafePrice} onChange={(e) => setEditCafePrice(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Image'
                                    value={editCafeImage} onChange={(e) => setEditCafeImage(e.target.value)}
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

export default MenuCafeCrud;