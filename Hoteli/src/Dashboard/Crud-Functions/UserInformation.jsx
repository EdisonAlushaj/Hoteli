import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserCrud } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserInformation = () => {
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [userData, setUserData] = useState([]);
    const [editUser, setEditUser] = useState({
        id: '',
        name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(UserCrud)
            .then((response) => {
                console.log(response);
                setUserData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    async function editUserHandler(user) {
        setShow(true);
        setEditUser({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this user.")) {
            axios.delete(`${UserCrud}/${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('User has been deleted');
                        getData();
                    }
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };
    const handleSave = () => {
        const url = UserCrud;
        const data = {
            name: editUser.name,
            email: editUser.email,
            role: editUser.role
        };
    
        axios.post(url, data)
            .then((result) => {
                getData();
                toast.success('User has been added.');
                handleCloseAdd();
            })
            .catch((error) => {
                console.error("Error adding User:", error);
                toast.error('Failed to add user.');
            });
    };

    const handleClose = () => setShow(false);
    const handleCloseAdd = () => setShowAdd(false);

    const update = async () => {
        try {
            await axios.patch(`${UserCrud}/${editUser.id}`, editUser);
            toast.success('User updated successfully');
            handleClose();
            getData();
        } catch (error) {
            console.error("Error updating User:", error);
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="d-flex justify-content-between" style={{ width: "20em", height: "3em", alignItems: "center" }}>
                <p style={{ fontSize: "2em", margin: "0" }}><b>User Table</b></p>
                <button className="btn btn-rounded btn-primary" onClick={() => setShowAdd(true)}>Add</button>
            </div>

            <br />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="d-flex flex-row justify-content-evenly">
                                <button className="btn btn-rounded btn-primary" onClick={() => editUserHandler(user)}>Edit</button>
                                <button className="btn btn-rounded btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="Enter User Name"
                                value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                            />
                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="Enter User Email"
                                value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="Enter User Role"
                                value={editUser.role} onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
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

            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Add User form inputs */}
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
        </>
    );
};

export default UserInformation;