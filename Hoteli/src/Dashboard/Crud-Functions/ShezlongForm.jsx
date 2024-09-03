import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { ShezlongEndPoints } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from '../../cookieUtils';

const ShezlongForm = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [id, setId] = useState('')
    const [poolId, setPoolId] = useState('')

    const [editId, setEditId] = useState('')
    const [editPoolId, setEditPoolId] = useState('')

    const [data, setData] = useState([]);

    const getToken = () => {
        return Cookies.getTokenFromCookies(); // Assuming you stored the JWT in a cookie named 'token'
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(ShezlongEndPoints, {
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

    async function editShezlong(roles) {
        handleShow();

        setEditPoolId(roles.poolId);

        setId(roles.id);
    }
    async function Load() {
        const result = await axios.get(ShezlongEndPoints);
        setEditPoolId(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${ShezlongEndPoints}/UpdateShezlong/${id}`, {
                id: id,
                poolId: editPoolId,
                
              
            }, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            toast.success('Shezlong updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Shezlong:", error);
        }
    }

    const handelDelete = (id) => {
        if (window.confirm("Are you sure to delete this Shezlong.") == true) {
            axios.delete(`${ShezlongEndPoints}/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Shezlong has been deleted');
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
        const url = ShezlongEndPoints;
        const data = {
            "poolId": poolId,
        }
    
        axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        })
            .then((result) => {
                getData();
                clear();
                toast.success('Shezlong has been added.');
                handleCloseAdd();
            })
            .catch((error) => {
                console.error("Error adding Shezlong:", error);
                toast.error("Error adding Shezlong. Please try again.");
            });
    }

    const clear = () => {
        setId('');
        setPoolId('');

        setEditId('');
        setEditPoolId('');

    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>ShezlongTable</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>poolId</th>
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
                                            <td>{item.poolId}</td>
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editShezlong(item)}>Edit</button>

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
                        <Modal.Title>Add Shezlong</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter poolId'
                                    value={poolId} onChange={(e) => setPoolId(e.target.value)}
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
                        <Modal.Title>Update Shezlong</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter poolId'
                                    value={editPoolId} onChange={(e) => setEditPoolId(e.target.value)}
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

export default ShezlongForm;