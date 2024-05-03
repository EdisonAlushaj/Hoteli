import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {MenuDrinkEndPoint} from'../../endpoints';
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
    const [drinkName, setDrinkName] = useState('')
    const [drinkDescription, setDrinkDescription] = useState('')
    const [drinkPrice, setDrinkPrice] = useState('')
    const [drinkImage, setDrinkImage] = useState('')

    const [editId, setEditId] = useState('')
    const [editDrinkName, setEditDrinkName] = useState('')
    const [editDrinkDescription, setEditDrinkDescription] = useState('')
    const [editDrinkPrice, setEditDrinkPrice] = useState('')
    const [editDrinkImage, setEditDrinkImage] = useState('')

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(MenuDrinkEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editMenuDrink(drinks) {
        handleShow();
        setEditDrinkName(drinks.drinkName);
        setEditDrinkDescription(drinks.drinkDescription);
        setEditDrinkPrice(drinks.drinkPrice);
        setEditDrinkImage(drinks.drinkImage);
        setId(drinks.id);
    }
    async function Load() {
        const result = await axios.get(MenuDrinkEndPoint);
        setDrinkName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${MenuDrinkEndPoint}/UpdateDrink/${Id}`, {
                id: Id,
                drinkName: editDrinkName,
                drinkDescription: editDrinkDescription,
                drinkPrice: editDrinkPrice,
                drinkImage: editDrinkImage,
            });
            toast.success('MenuDrink updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating MenuDrink:", error);
        }
    }


    const handelDelete = (id) => {
        if (window, confirm("Are you sure to delete this drink.") == true) {
            axios.delete(`${MenuDrinkEndPoint}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('MenuDrink has been deleted');
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
        const url = MenuDrinkEndPoint;
        const data = {
            "drinkName": drinkName,
            "drinkDescription": drinkDescription,
            "drinkPrice": drinkPrice,
            "drinkImage": drinkImage
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('MenuDrink has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setDrinkName('');
        setDrinkDescription('');
        setDrinkPrice('');
        setDrinkImage('');

        setEditDrinkName('');
        setEditDrinkDescription('');
        setEditDrinkPrice('');
        setEditDrinkImage('');
        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{width: "20em", height: "3em", alignItems: "center"}}>
                    <p style={{fontSize: "2em", margin: "0"}}><b>Drink Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Drink Name</th>
                            <th>Drink Description</th>
                            <th>Drink Price</th>
                            <th>Drink Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.drinkName}</td>
                                            <td>{item.drinkDescription}</td>
                                            <td>{item.drinkPrice}</td>
                                            <td>{item.drinkImage}</td>
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editMenuDrink(item)}>Edit</button>

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
                        <Modal.Title>Add MenuDrink</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Drink Name'
                                    value={drinkName} onChange={(e) => setDrinkName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Drink Description'
                                    value={drinkDescription} onChange={(e) => setDrinkDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Drink Price'
                                    value={drinkPrice} onChange={(e) => setDrinkPrice(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Drink Image'
                                    value={drinkImage} onChange={(e) => setDrinkImage(e.target.value)}
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
                        <Modal.Title>Update Drink</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Drink Name'
                                    value={editDrinkName} onChange={(e) => setEditDrinkName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={editDrinkDescription} onChange={(e) => setEditDrinkDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Price'
                                    value={editDrinkPrice} onChange={(e) => setEditDrinkPrice(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Image'
                                    value={editDrinkImage} onChange={(e) => setEditDrinkImage(e.target.value)}
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