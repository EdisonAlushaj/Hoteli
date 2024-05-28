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
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState({
        id: '',
        name: '',
        email: '',
        role: ''
    });
    const [userId, setUserId] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get("https://localhost:7189/api/Account/users")
            .then((response) => {
                console.log(response);
                setUsers(response.data); // Update users state with fetched data
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleEdit = (user) => {
        setEditUser(user);
        setUserId(user.id); // Set the user's ID
        setShow(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.patch(`https://localhost:7189/api/Account/update/${userId}`, editUser); // Corrected URL
            toast.success('User updated successfully');
            setShow(false);
            getData();
        } catch (error) {
            console.error("Error updating User:", error);
            toast.error('Failed to update user.');
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this user?")) {
            axios.delete(`${UserCrud}/${id}`)
                .then(() => {
                    toast.success('User has been deleted');
                    getData();
                })
                .catch((error) => {
                    toast.error('Failed to delete user.');
                });
        }
    };

    return (
        <>
            <ToastContainer />
            <div style={{ width: "20em", height: "3em", alignItems: "center" }}>
                <p style={{ fontSize: "2em", margin: "0" }}><b>User Table</b></p>
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
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="d-flex flex-row justify-content-evenly">
                                <button className="btn btn-rounded btn-primary" onClick={() => handleEdit(user)}>Edit</button>
                                <button className="btn btn-rounded btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={() => setShow(false)}>
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
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserInformation;
