import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {RoomEndPoint} from'../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableReservation = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [Id, setId] = useState('')
    const [userId, setuserId] = useState('')
    const [tableId, settableId] = useState('')
    const [reservationDate, setreservationDate] = useState('')
    const [reservationTime, setreservationTime] = useState('')
    const [maxGuests, setmaxGuests] = useState('')
    const [establishment, setestablishment] = useState('')

    const [editId, setEditId] = useState('')
    const [edituserId, setEdituserId] = useState('')
    const [edittableId, setEdittableId] = useState('')
    const [editreservationDate, setEditreservationDate] = useState('')
    const [editreservationTime, setEditreservationTime] = useState('')
    const [editmaxGuests, setEditmaxGuests] = useState('')
    const [editestablishment, setEditestablishment] = useState('')

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(RoomEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editStudent(employes) {
        handleShow();
        setEdituserId(employes.userId);
        setEdittableId(employes.tableId);
        setEditreservationDate(employes.reservationDate);
        setEditreservationTime(employes.reservationTime);
        setEditmaxGuests(employes.maxGuests);
        setEditestablishment(employes.establishment);

        setId(employes.id);
    }
    async function Load() {
        const result = await axios.get(RoomEndPoint);
        setuserId(result.data);
        console.log(result.data);
    }

  

    const handelDelete = (id) => {
        if (window, confirm("Are you sure to delete this tablereservation.") == true) {
            axios.delete(`${RoomEndPoint}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Reservation has been deleted');
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
        const url = RoomEndPoint;
        const data = {
            "userId": userId,
            "tableId": tableId,
            "reservationDate": reservationDate,
            "reservationTime": reservationTime,
            "maxGuests": maxGuests,
            "establishment": establishment
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Tableresweervation has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setuserId('');
        settableId('');
        setreservationDate('');
        setreservationTime('');
        setmaxGuests('');
        setestablishment('');

        setEdituserId('');
        setEdittableId('');
        setEditreservationDate('');
        setEditreservationTime('');
        setEditmaxGuests('');
        setEditestablishment('');
        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
       

                <div className='d-flex justify-content-evenly ' style={{width: "20em", height: "3em", alignItems: "center"}}>
                    <p style={{fontreservationDate: "2em", margin: "0"}}><b>Room Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Room Name</th>
                            <th>tableId</th>
                            <th>reservationDate</th>
                            <th>reservationTime</th>
                            <th>maxGuests</th>
                            <th>establishment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.userId}</td>
                                            <td>{item.tableId}</td>
                                            <td>{item.reservationDate}</td>
                                            <td>{item.reservationTime}</td>
                                            <td>{item.maxGuests}</td>
                                            <td>{item.establishment}</td>
                                            <td className='d-flex flex-row justify-content-evenly'>
                                            

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

                {/* Add Room */}
                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Room Name'
                                    value={userId} onChange={(e) => setuserId(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter tableId'
                                    value={tableId} onChange={(e) => settableId(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter reservationDate'
                                    value={reservationDate} onChange={(e) => setreservationDate(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter reservationTime'
                                    value={reservationTime} onChange={(e) => setreservationTime(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>

                            <Col>
                                <input type="text" className='form-control' placeholder='Enter maxGuests'
                                    value={maxGuests} onChange={(e) => setmaxGuests(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter establishment'
                                    value={establishment} onChange={(e) => setestablishment(e.target.value)}
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

           
            </Fragment>
        </>
    );
};

export default TableReservation;