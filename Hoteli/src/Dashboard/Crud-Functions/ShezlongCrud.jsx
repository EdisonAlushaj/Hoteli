import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {ShezlongEndPoints} from'../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShezlongCrud = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [Id, setId] = useState('')
    const [poolId, setPoolID] = useState('')
   


    const [editId, setEditId] = useState('')
    const [editPoolid, setEditPoolid] = useState('')
    

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(ShezlongEndPoints)
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
        setEditName(cafes.poolId);
        
     
        setId(cafes.id);
    }
    async function Load() {
        const result = await axios.get(ShezlongEndPoints);
        setName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${ShezlongEndPoints}/UpdateSpa/${Id}`, {
                id: Id,
                name: editName,
                foodPrice: editPrice,
                description: editDescription,
                hallId: editHallId
            });
            toast.success('Shezlong updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Spa:", error);
        }
    }


    const handelDelete = (id) => {
        if (window, confirm("Are you sure to delete this shezlong.") == true) {
            axios.delete(`${ShezlongEndPoints}/${id}`)
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

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Shezlong has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setPoolID('');
        
        setEditPoolid('');
       
     
        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{width: "20em", height: "3em", alignItems: "center"}}>
                    <p style={{fontSize: "2em", margin: "0"}}><b>Shezlong Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Pool ID</th>
                            
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
                        <Modal.Title>Add Shezlong</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter PoolID'
                                    value={poolId} onChange={(e) => setPoolID(e.target.value)}
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
                        <Modal.Title>Update Shezlong</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter ID Name'
                                    value={editId} onChange={(e) => setEditId(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter PoolID'
                                    value={editPoolid} onChange={(e) => setEditPoolid(e.target.value)}
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

export default ShezlongCrud;