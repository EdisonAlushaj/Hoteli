import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {UsersEndPoint} from'../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersCrud = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [Id, setId] = useState('')
    const [userFullName, setUserFullName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userContactNumber, setUserContactNumber] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const [editId, setEditId] = useState('')
    const [editUserFullName, setEditUserFullName] = useState('')
    const [editUserEmail, setEditUserEmail] = useState('')
    const [editUserContactNumber, setEditUserContactNumber] = useState('')
    const [editUserPassword, setEditUserPassword] = useState('')

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(UsersEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editUser(cafes) {
        handleShow();
        setEditUserFullName(cafes.userFullName);
        setEditUserEmail(cafes.userEmail);
        setEditUserContactNumber(cafes.userContactNumber);
        setEditUserPassword(cafes.userPassword);
        setId(cafes.userId);
    }
    async function Load() {
        const result = await axios.get(UsersEndPoint);
        setUserFullName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${UsersEndPoint}/UpdateUser/${Id}`, {
                userId: Id,
                userFullName: editUserFullName,
                userEmail: editUserEmail,
                userContactNumber: editUserContactNumber,
                userPassword: editUserPassword,
            });
            toast.success('User updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating User:", error);
        }
    }


    const handelDelete = (id) => {
        if (window.confirm("Are you sure to delete this user.") == true) {
            axios.delete(`${UsersEndPoint}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('User has been deleted');
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
        const url = UsersEndPoint;
        const data = {
            "userFullName": userFullName,
            "userEmail": userEmail,
            "userContactNumber": userContactNumber,
            "userPassword": userPassword
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('User has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setUserFullName('');
        setUserEmail('');
        setUserContactNumber('');
        setUserPassword('');

        setEditUserFullName('');
        setEditUserEmail('');
        setEditUserContactNumber('');
        setEditUserPassword('');
        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{width: "20em", height: "3em", alignItems: "center"}}>
                    <p style={{fontSize: "2em", margin: "0"}}><b>User Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>UserFullName</th>
                            <th>UserEmail</th>
                            <th>UserContactNumber</th>
                            <th>UserPassword</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.userFullName}</td>
                                            <td>{item.userEmail}</td>
                                            <td>{item.userContactNumber}</td>
                                            <td>{item.userPassword}</td>
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editUser(item)}>Edit</button>

                                                <button className="btn btn-rounded btn-danger" onClick={() => handelDelete(item.userId)}>Delete</button>
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
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter User Full Name'
                                    value={userFullName} onChange={(e) => setUserFullName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter User Email'
                                    value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter User Contact Number'
                                    value={userContactNumber} onChange={(e) => setUserContactNumber(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter User Password'
                                    value={userPassword} onChange={(e) => setUserPassword(e.target.value)}
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
                        <Modal.Title>Update User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter User FullName'
                                    value={editUserFullName} onChange={(e) => setEditUserFullName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter User Email'
                                    value={editUserEmail} onChange={(e) => setEditUserEmail(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter User Contact Number'
                                    value={editUserContactNumber} onChange={(e) => setEditUserContactNumber(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter User Password'
                                    value={editUserPassword} onChange={(e) => setEditUserPassword(e.target.value)}
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

export default UsersCrud;