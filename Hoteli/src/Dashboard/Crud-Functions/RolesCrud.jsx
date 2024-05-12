import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { RolesEndPoint } from '../../endpoints';
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
    const [roleName, setRoleName] = useState('')
    const [roleContractType, setRoleContractType] = useState('')
    const [roleSalary, setRoleSalary] = useState('')
    const [roleDepartment, setRoleDepartment] = useState('')
    const [roleUniformRequirements, setRoleUniformRequirements] = useState(false);
    const [roleLanguageSkills, setRoleLanguageSkills] = useState('')
    const [roleStartDate, setRoleStartDate] = useState('')
    const [roleEndDate, setRoleEndDate] = useState('')

    const [editId, setEditId] = useState('')
    const [editRoleName, setEditRoleName] = useState('')
    const [editRoleContractType, setEditRoleContractType] = useState('')
    const [editRoleSalary, setEditRoleSalary] = useState('')
    const [editRoleDepartment, setEditRoleDepartment] = useState('')
    const [editRoleUniformRequirements, setEditRoleUniformRequirements] = useState(false)
    const [editRoleLanguageSkills, setEditRoleLanguageSkills] = useState('')
    const [editRoleStartDate, setEditRoleStartDate] = useState('')
    const [editRoleEndDate, setEditRoleEndDate] = useState('')

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(RolesEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editRole(roles) {
        handleShow();

        setEditRoleName(roles.roleName);
        setEditRoleContractType(roles.roleContractType);
        setEditRoleSalary(roles.roleSalary);
        setEditRoleDepartment(roles.roleDepartment);
        setEditRoleUniformRequirements(roles.roleUniformRequirements);
        setEditRoleLanguageSkills(roles.roleLanguageSkills);
        setEditRoleStartDate(roles.roleStartDate);
        setEditRoleEndDate(roles.roleEndDate);
        setId(roles.roleId);
    }
    async function Load() {
        const result = await axios.get(RolesEndPoint);
        setRoleName(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${RolesEndPoint}/UpdateRole/${Id}`, {
                roleId: Id,
                roleName: editRoleName,
                roleContractType: editRoleContractType,
                roleSalary: editRoleSalary,
                roleDepartment: editRoleDepartment,
                roleUniformRequirements: editRoleUniformRequirements,
                roleLanguageSkills: editRoleLanguageSkills,
                roleStartDate: editRoleStartDate,
                roleEndDate: editRoleEndDate,
            });
            toast.success('Role updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Role:", error);
        }
    }


    const handelDelete = (id) => {
        if (window.confirm("Are you sure to delete this Role.") == true) {
            axios.delete(`${RolesEndPoint}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Role has been deleted');
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
        const url = RolesEndPoint;
        const data = {
            "roleName": roleName,
            "roleContractType": roleContractType,
            "roleSalary": roleSalary,
            "roleDepartment": roleDepartment,
            "roleUniformRequirements": roleUniformRequirements,
            "roleLanguageSkills": roleLanguageSkills,
            "roleStartDate": roleStartDate,
            "roleEndDate": roleEndDate
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Role has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setRoleName('');
        setRoleContractType('');
        setRoleSalary('');
        setRoleDepartment('');
        setRoleUniformRequirements('');
        setRoleLanguageSkills('');
        setRoleStartDate('');
        setRoleEndDate('');

        setEditRoleName('');
        setEditRoleContractType('');
        setEditRoleSalary('');
        setEditRoleDepartment('');
        setEditRoleUniformRequirements('');
        setEditRoleLanguageSkills('');
        setEditRoleStartDate('');
        setEditRoleEndDate('');
        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Role Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Role Name</th>
                            <th>Contract Type</th>
                            <th>Salary</th>
                            <th>Role Department</th>
                            <th>Uniform Requirements</th>
                            <th>Language Skills</th>
                            <th>Start Date</th>
                            <th>End Date</th>
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
                                            <td>{item.roleName}</td>
                                            <td>{item.roleContractType}</td>
                                            <td>{item.roleSalary}</td>
                                            <td>{item.roleDepartment}</td>
                                            <td>{item.roleUniformRequirements == true ? 'Required' : 'Not Required'}</td>
                                            <td>{item.roleLanguageSkills}</td>
                                            <td>{item.roleStartDate}</td>
                                            <td>{item.roleEndDate}</td>
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editRole(item)}>Edit</button>

                                                <button className="btn btn-rounded btn-danger" onClick={() => handelDelete(item.roleId)}>Delete</button>

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
                        <Modal.Title>Add Role</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Role'
                                    value={roleName} onChange={(e) => setRoleName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Contract Type'
                                    value={roleContractType} onChange={(e) => setRoleContractType(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="number" min="1" className='form-control' placeholder='Enter Salary'
                                    value={roleSalary} onChange={(e) => setRoleSalary(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Department'
                                    value={roleDepartment} onChange={(e) => setRoleDepartment(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="checkbox"
                                    checked={roleUniformRequirements}
                                    onChange={(e) => setRoleUniformRequirements(e.target.checked)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Language Skills'
                                    value={roleLanguageSkills} onChange={(e) => setRoleLanguageSkills(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="date" className='form-control' placeholder='Enter Start Date'
                                    value={roleStartDate} onChange={(e) => setRoleStartDate(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="date" className='form-control' placeholder='Enter End Date'
                                    value={roleEndDate} onChange={(e) => setRoleEndDate(e.target.value)}
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
                                <input type="text" className='form-control' placeholder='Enter Role'
                                    value={editRoleName} onChange={(e) => setEditRoleName(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Contract Type'
                                    value={editRoleContractType} onChange={(e) => setEditRoleContractType(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="number" min="1" className='form-control' placeholder='Enter Salary'
                                    value={editRoleSalary} onChange={(e) => setEditRoleSalary(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Department'
                                    value={editRoleDepartment} onChange={(e) => setEditRoleDepartment(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="checkbox"
                                    checked={editRoleUniformRequirements}
                                    onChange={(e) => setEditRoleUniformRequirements(e.target.checked)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Language Skills'
                                    value={editRoleLanguageSkills} onChange={(e) => setEditRoleLanguageSkills(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="date" className='form-control' placeholder='Enter User Start Date'
                                    value={editRoleStartDate} onChange={(e) => setEditRoleStartDate(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="date" className='form-control' placeholder='Enter End Date'
                                    value={editRoleEndDate} onChange={(e) => setEditRoleEndDate(e.target.value)}
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