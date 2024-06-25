import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { FitnesEquipmentsEndPoints } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FitnesEquipments = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [id, setId] = useState('')
    const [gymEqName, setGymEqName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [fitnesId, setFitnesId] = useState('')


    const [editId, setEditId] = useState('')
    const [editGymEqName, setEditGymEqName] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editImage, setEditImage] = useState('')
    const [editFitnesId, setEditFitnesId] = useState('')


    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(FitnesEquipmentsEndPoints)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editFitnesEquipment(roles) {
        handleShow();

        setEditGymEqName(roles.gymEqName);
        setEditDescription(roles.description);
        setEditImage(roles.image);
        setEditFitnesId(roles.fitnesId);

        setId(roles.id);
    }
    async function Load() {
        const result = await axios.get(FitnesEquipmentsEndPoints);
        setGymEqName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${FitnesEquipmentsEndPoints}/UpdateFitnesEquipmet/${id}`, {
                id: id,
                gymEqName: editGymEqName,
                description: editDescription,
                image: editImage,
                fitnesId: editFitnesId
            });
            toast.success('Fitnes Equipment updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Fitnes Equipment:", error);
        }
    }


    const handelDelete = (id) => {
        if (window.confirm("Are you sure to delete this Fitnes Equipment.") == true) {
            axios.delete(`${FitnesEquipmentsEndPoints}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Fitnes Equipment has been deleted');
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
        const url = FitnesEquipmentsEndPoints;
        const data = {
            "gymEqName": gymEqName,
            "description": description,
            "image": image,
            "fitnesId": fitnesId,
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Fitnes Equipment has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setGymEqName('');
        setDescription('');
        setImage('');
        setFitnesId('');


        setEditGymEqName('');
        setEditDescription('');
        setEditImage('');
        setEditFitnesId('');

        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Fitnes Equipments Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fitnes Equipment Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Fitnesl Id</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.gymEqName}</td>
                                            <td>{item.description}</td>
                                            {/* <td>{item.image}</td> */}
                                            <td>
                                                <img src={item.image} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                                            </td>
                                            <td>{item.fitnesId}</td>

                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editFitnesEquipment(item)}>Edit</button>

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
                        <Modal.Title>Add Fitnes Equipment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Fitnes Equipment'
                                    value={gymEqName} onChange={(e) => setGymEqName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Image'
                                    value={image} onChange={(e) => setImage(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Fitnes Id'
                                    value={fitnesId} onChange={(e) => setFitnesId(e.target.value)}
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
                        <Modal.Title>Update Fitnes Equipment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Fitnes Equipment'
                                    value={editGymEqName} onChange={(e) => setEditGymEqName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={editDescription} onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Image'
                                    value={editImage} onChange={(e) => setEditImage(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Fitnes Id'
                                    value={editFitnesId} onChange={(e) => setEditFitnesId(e.target.value)}
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

export default FitnesEquipments;