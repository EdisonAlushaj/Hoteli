import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { FitnesApplyEndPoint } from '../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import cookieUtils from '../../cookieUtils.jsx';

const GymReservation= () => {
    const [showAdd, setShowAdd] = useState(false);

    const userId = cookieUtils.getUserIdFromCookies();
    const [fitnesId, setfitnesId] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(FitnesApplyEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this Fitnes Apply?")) {
            axios.delete(`${FitnesApplyEndPoint}/${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Fitnes Apply has been deleted');
                        setData(data.filter(item => item.reservationId !== id));
                    } else {
                        toast.error('Failed to delete Fitnes Apply');
                    }
                })
                .catch((error) => {
                    console.error("Error deleting Fitnes Apply:", error);
                    toast.error('Error deleting Fitnes Apply. Please try again.');
                });
        }
    };
    

    const handleSave = () => {
        const url = `${FitnesApplyEndPoint}?userId=${userId}&fitnesId=${fitnesId}`;

        axios.post(url)
            .then((result) => {
                getData();
                clear();
                toast.success('Fitnes Apply has been added.');
                handleCloseAdd();
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const clear = () => {
        // setUserId('');
        setfitnesId('');
    };

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Fitnes Apply</b></p>
                    <button className="btn btn-rounded btn-primary" onClick={handleShowAdd}>Add</button>
                </div>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Id</th>
                            <th>Fitnes Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.fitnesId}</td>
                                    <td className='d-flex flex-row justify-content-evenly'>
                                        <button className="btn btn-rounded btn-danger" onClick={() => handleDelete(item.reservationId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : 'Loading...'}
                    </tbody>
                </Table>

                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Apply</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {/* <Col>
                                <input type="number" className='form-control' placeholder='Enter User Id'
                                    value={userId} onChange={(e) => setUserId(e.target.value)}
                                />
                            </Col> */}
                            <Col>
                                <input type="number" className='form-control' placeholder='Enter Fitnes Id'
                                    value={fitnesId} onChange={(e) => setfitnesId(e.target.value)}
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

export default GymReservation;