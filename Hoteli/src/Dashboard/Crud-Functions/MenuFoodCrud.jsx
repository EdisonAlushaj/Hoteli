import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {MenuFoodEndPoint} from'../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuFoodCrud = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [Id, setId] = useState('')
    const [foodName, setFoodName] = useState('')
    const [foodDescription, setFoodDescription] = useState('')
    const [foodPrice, setFoodPrice] = useState('')
    const [foodImage, setFoodImage] = useState('')

    const [editId, setEditId] = useState('')
    const [editFoodName, setEditFoodName] = useState('')
    const [editFoodDescription, setEditFoodDescription] = useState('')
    const [editFoodPrice, setEditFoodPrice] = useState('')
    const [editFoodImage, setEditFoodImage] = useState('')

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(MenuFoodEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editMenuFood(cafes) {
        handleShow();
        setEditFoodName(cafes.foodName);
        setEditFoodDescription(cafes.foodDescription);
        setEditFoodPrice(cafes.foodPrice);
        setEditFoodImage(cafes.foodImage);
        setId(cafes.id);
    }
    async function Load() {
        const result = await axios.get(MenuFoodEndPoint);
        setFoodName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${MenuFoodEndPoint}/UpdateFood/${Id}`, {
                id: Id,
                foodName: editFoodName,
                foodDescription: editFoodDescription,
                foodPrice: editFoodPrice,
                foodImage: editFoodImage,
            });
            toast.success('MenuFood updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating MenuFood:", error);
        }
    }


    const handelDelete = (id) => {
        if (window, confirm("Are you sure to delete this room.") == true) {
            axios.delete(`${MenuFoodEndPoint}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('MenuFood has been deleted');
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
        const url = MenuFoodEndPoint;
        const data = {
            "foodName": foodName,
            "foodDescription": foodDescription,
            "foodPrice": foodPrice,
            "foodImage": foodImage
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Food has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setFoodName('');
        setFoodDescription('');
        setFoodPrice('');
        setFoodImage('');

        setEditFoodName('');
        setEditFoodDescription('');
        setEditFoodPrice('');
        setEditFoodImage('');
        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{width: "20em", height: "3em", alignItems: "center"}}>
                    <p style={{fontSize: "2em", margin: "0"}}><b>Food Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Food Name</th>
                            <th>Food Description</th>
                            <th>Food Price</th>
                            <th>Food Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.foodName}</td>
                                            <td>{item.foodDescription}</td>
                                            <td>{item.foodPrice}</td>
                                            <td>
    <img src={item.foodImage} style={{ maxWidth: "100px", maxHeight: "100px" }} />
</td>
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editMenuFood(item)}>Edit</button>

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
                                <input type="text" className='form-control' placeholder='Enter Food Name'
                                    value={foodName} onChange={(e) => setFoodName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Food Description'
                                    value={foodDescription} onChange={(e) => setFoodDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Food Price'
                                    value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Food Image'
                                    value={foodImage} onChange={(e) => setFoodImage(e.target.value)}
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

                {/* Update MenuFood */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Food</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Food Name'
                                    value={editFoodName} onChange={(e) => setEditFoodName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={editFoodDescription} onChange={(e) => setEditFoodDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Price'
                                    value={editFoodPrice} onChange={(e) => setEditFoodPrice(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Image'
                                    value={editFoodImage} onChange={(e) => setEditFoodImage(e.target.value)}
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

export default MenuFoodCrud;