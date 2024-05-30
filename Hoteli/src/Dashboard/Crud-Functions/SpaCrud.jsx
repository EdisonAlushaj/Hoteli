import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {SpaEndPoint} from'../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SpaCrud = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [Id, setId] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [durationInMinutes, setDuration] = useState('')
    const [hallId, setHallId] = useState('')


    const [editId, setEditId] = useState('')
    const [editName, setEditName] = useState('')
    const [editPrice, setEditPrice] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editDuration, setEditDuration] = useState('')
    const [editHallId, setEditHallId] = useState('')


    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(SpaEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editSpa(cafes) {
        handleShow();
        setEditName(cafes.name);
        setEditPrice(cafes.price);
        setEditDescription(cafes.description);
        setEditDuration(cafes.durationInMinutes);
        setEditHallId(cafes.hallId);
     
        setId(cafes.id);
    }
    async function Load() {
        const result = await axios.get(SpaEndPoint);
        setName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${SpaEndPoint}/UpdateSpa/${Id}`, {
                id: Id,
                name: editName,
                price: editPrice,
                description: editDescription,
                durationInMinutes: editDuration,
                hallId: editHallId
            });
            toast.success('Spa updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Spa:", error);
        }
    }


    const handelDelete = (id) => {
        if (window, confirm("Are you sure to delete this spa.") == true) {
            axios.delete(`${SpaEndPoint}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Spa has been deleted');
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
        const url = SpaEndPoint;
        const data = {
            "name": name,
            "price": price,
            "description": description,
            "durationInMinutes": durationInMinutes,
            "hallId": hallId
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Spa has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setName('');
        setPrice('');
        setDescription('');
        setDuration('');
        setHallId('');
      
        setEditName('');
        setEditPrice('');
        setEditDuration('');
        setEditHallId('');
     
        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{width: "20em", height: "3em", alignItems: "center"}}>
                    <p style={{fontSize: "2em", margin: "0"}}><b>Spa Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Spa Name</th>
                            <th>Spa Price</th>
                            <th>Spa Description</th>
                            <th>Spa Duration</th>
                            <th>Hall Id</th>
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
                                            <td>{item.price}</td>
                                            <td>{item.description}</td>
                                            <td>{item.durationInMinutes}</td>
                                            <td>{item.hallId}</td>
                                            
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editSpa(item)}>Edit</button>

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
                        <Modal.Title>Add Spa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Spa Name'
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Spa Price'
                                    value={price} onChange={(e) => setPrice(e.target.value)}
                                />
                            </Col>
                         
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Spa Description'
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Spa Duration'
                                    value={durationInMinutes} onChange={(e) => setDuration(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Hall Id'
                                    value={hallId} onChange={(e) => setHallId(e.target.value)}
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
                        <Modal.Title>Update Spa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Spa Name'
                                    value={editName} onChange={(e) => setEditName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Price'
                                    value={editPrice} onChange={(e) => setEditPrice(e.target.value)}
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
                                <input type="number" className='form-control' placeholder='Enter Duration'
                                    value={editDuration} onChange={(e) => setEditDuration(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Hall Id'
                                    value={editHallId} onChange={(e) => setEditHallId(e.target.value)}
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

export default SpaCrud;