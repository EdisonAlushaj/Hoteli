import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { ActivitiesEndPoint } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActivitiesCrud = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [id, setId] = useState('')
    const [name, setname] = useState('')
    const [description, setdescription] = useState('')
    const [location, setlocation] = useState('')
    const [duration, setduration] = useState('')
    const [cost, setcost] = useState('')
    const [image, setimage] = useState('')


    const [editId, setEditId] = useState('')
    const [editname, setEditname] = useState('')
    const [editdescription, setEditdescription] = useState('')
    const [editlocation, setEditlocation] = useState('')
    const [editduration, setEditduration] = useState('')
    const [editcost, setEditcost] = useState('')
    const [editimage, setEditimage] = useState('')

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(ActivitiesEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editActivities(activity) {
        handleShow();

        setEditname(activity.name);
        setEditdescription(activity.description);
        setEditlocation(activity.location);
        setEditduration(activity.duration);
        setEditcost(activity.cost);
        setEditimage(activity.image);
       
        setId(activity.id);
    }
    async function Load() {
        const result = await axios.get(ActivitiesEndPoint);
        setEditname(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${ActivitiesEndPoint}/UpdateActivities/${id}`, {
                id: id,
                name: editname,
                description: editdescription,
                location: editlocation,
                duration: editduration,
                cost: editcost,
                image: editimage
              
            });
            toast.success('Activity updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Activity:", error);
        }
    }


    const handelDelete = (id) => {
        if (window.confirm("Are you sure to delete this Activity.") == true) {
            axios.delete(`${ActivitiesEndPoint}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Activity has been deleted');
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
        const url = ActivitiesEndPoint;
        const data = {
            "name": name,
            "description": description,
            "location": location,
            "duration": duration,
            "cost": cost,
            "image": image
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Activity has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setname('');
        setdescription('');
        setlocation('');
        setduration('');
        setcost('');
        setimage('');

        setEditname('');
        setEditdescription('');
        setEditlocation('');
        setEditduration('');
        setEditcost('');
        setEditimage('');

        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Activities</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Location</th>
                            <th>Duration</th>
                            <th>Cost</th>
                            <th>Image</th>
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
                                            <td>{item.description}</td>
                                            <td>{item.location}</td>
                                            <td>{item.duration}</td>
                                            <td>{item.cost}</td>
                                            {/* <td>{item.image}</td> */}
                                            <td>
                                                <img src={item.image} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                                            </td>
                                           
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editActivities(item)}>Edit</button>

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
                        <Modal.Title>Add Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Name'
                                    value={name} onChange={(e) => setname(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={description} onChange={(e) => setdescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text"  className='form-control' placeholder='Enter location'
                                    value={location} onChange={(e) => setlocation(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter duration'
                                    value={duration} onChange={(e) => setduration(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter cost'
                                    value={cost} onChange={(e) => setcost(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter image'
                                    value={image} onChange={(e) => setimage(e.target.value)}
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
                        <Modal.Title>Update Activity</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Name'
                                    value={editname} onChange={(e) => setEditname(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={editdescription} onChange={(e) => setEditdescription(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter location'
                                    value={editlocation} onChange={(e) => setEditlocation(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter duration'
                                    value={editduration} onChange={(e) => setEditduration(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter cost'
                                    value={editcost} onChange={(e) => setEditcost(e.target.value)}
                                />
                         
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter image'
                                    value={editimage} onChange={(e) => setEditimage(e.target.value)}
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

export default ActivitiesCrud;