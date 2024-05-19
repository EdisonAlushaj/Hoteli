import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { FitnesEndPoints } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Fitnes = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [id, setId] = useState('')
    const [fitnesName, setfitnesName] = useState('')
    const [priceDaily, setPriceDaily] = useState('')
    const [priceMonthly, setPriceMonthly] = useState('')
    const [priceOffers, setPriceOffers] = useState('')
    const [image, setImage] = useState('')
    const [hallId, setHallId] = useState('')


    const [editId, setEditId] = useState('')
    const [editFitnesName, setEditFitnesName] = useState('')
    const [editPriceDaily, setEditPriceDaily] = useState('')
    const [editPriceMonthly, setEditPriceMonthly] = useState('')
    const [editPriceOffers, setEditPriceOffers] = useState('')
    const [editImage, setEditImage] = useState('')
    const [editHallId, setEditHallId] = useState('')


    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(FitnesEndPoints)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editFitnes(roles) {
        handleShow();

        setEditFitnesName(roles.fitnesName);
        setEditPriceDaily(roles.priceDaily);
        setEditPriceMonthly(roles.priceMonthly);
        setEditPriceOffers(roles.priceOffers);
        setEditImage(roles.image);
        setEditHallId(roles.hallId);

        setId(roles.id);
    }
    async function Load() {
        const result = await axios.get(FitnesEndPoints);
        setEditFitnesName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${FitnesEndPoints}/UpdateFitnes/${id}`, {
                id: id,
                fitnesName: editFitnesName,
                priceDaily: editPriceDaily,
                priceMonthly: editPriceMonthly,
                priceOffers: editPriceOffers,
                image: editImage,
                hallId: editHallId
            });
            toast.success('Fitnes updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Fitnes:", error);
        }
    }


    const handelDelete = (id) => {
        if (window.confirm("Are you sure to delete this Fitnes.") == true) {
            axios.delete(`${FitnesEndPoints}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Fitnes has been deleted');
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
        const url = FitnesEndPoints;
        const data = {
            "fitnesName": fitnesName,
            "priceDaily": priceDaily,
            "priceMonthly": priceMonthly,
            "priceOffers": priceOffers,
            "image": image,
            "hallId": hallId
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Fitnes has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setfitnesName('');
        setPriceDaily('');
        setPriceMonthly('');
        setPriceOffers('');
        setImage('');
        setHallId('');


        setEditFitnesName('');
        setEditPriceDaily('');
        setEditPriceMonthly('');
        setEditPriceOffers('');
        setEditImage('');
        setEditHallId('');

        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Fitnes Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fitnes Name</th>
                            <th>Price Daily</th>
                            <th>price Monthly</th>
                            <th>Price Offers</th>
                            <th>Image</th>
                            <th>Hall Id</th>
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
                                            <td>{item.fitnesName}</td>
                                            <td>{item.priceDaily}</td>
                                            <td>{item.priceMonthly}</td>
                                            <td>{item.priceOffers}</td>
                                            <td>{item.image}</td>
                                            <td>{item.hallId}</td>

                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editFitnes(item)}>Edit</button>

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
                        <Modal.Title>Add Fitnes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Fitnes Name'
                                    value={fitnesName} onChange={(e) => setfitnesName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Price Daily'
                                    value={priceDaily} onChange={(e) => setPriceDaily(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Price Monthly'
                                    value={priceMonthly} onChange={(e) => setPriceMonthly(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Price Offers'
                                    value={priceOffers} onChange={(e) => setPriceOffers(e.target.value)}
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
                        <Modal.Title>Update Fitnes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Fitnes Name'
                                    value={editFitnesName} onChange={(e) => setEditFitnesName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Price Daily'
                                    value={editPriceDaily} onChange={(e) => setEditPriceDaily(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Price Monthly'
                                    value={editPriceMonthly} onChange={(e) => setEditPriceMonthly(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Price Offers'
                                    value={editPriceOffers} onChange={(e) => setEditPriceOffers(e.target.value)}
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
        </>
    );
};

export default Fitnes;