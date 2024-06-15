import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookieUtils from '../cookieUtils.jsx';

const Gym = () => {
    const [data, setData] = useState([]);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedFitnesId, setSelectedFitnesId] = useState(null);
    const userId = cookieUtils.getUserIdFromCookies();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://localhost:7189/api/Fitnes')
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleApply = (fitnesId) => {
        setSelectedFitnesId(fitnesId);
        setShowApplyModal(true);
    }

    const handleSave = () => {
        const url = `https://localhost:7189/api/FitnesApply?userId=${userId}&fitnesId=${selectedFitnesId}`;

        axios.post(url)
            .then((result) => {
                toast.success('Applied to gym successfully.');
                setShowApplyModal(false);
                setSelectedFitnesId(null);
            })
            .catch((error) => {
                toast.error('Error applying to gym.');
            });
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-center' style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: "2em" }}><b>Gyms</b></p>
                </div>

                {cookieUtils.getUserRoleFromCookies() ? (
                    <>
                        <Row>
                            {
                                data && data.length > 0 ?
                                    data.map((item, index) => (
                                        <Col key={index} md={4} style={{ marginBottom: '20px' }}>
                                            <Card>
                                                <Card.Img variant="top" src={item.image} alt={item.fitnesName} />
                                                <Card.Body className="d-flex flex-column align-items-center">
                                                    <Card.Title style={{ fontSize: "1.5em", textAlign: "center" }}>{item.fitnesName}</Card.Title>
                                                    <Card.Text style={{ fontSize: "1.2em", textAlign: "center" }}>
                                                        <b>Description:</b> {item.description}
                                                        <br />
                                                        <b>Price:</b> {item.price}
                                                        <br />
                                                        <b>Hall Id:</b> {item.hallId}
                                                    </Card.Text>
                                                    <Button variant="primary" style={{ fontSize: "1.2em", backgroundColor: "#b07256", borderColor: "#b07256" }} onClick={() => handleApply(item.id)}>Apply</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                    :
                                    <Col>
                                        <p>Loading...</p>
                                    </Col>
                            }
                        </Row>
                    </>
                ) :
                    <>
                        <h1 className="text-start mt-5" style={{ fontSize: '4rem', fontFamily: 'Roboto Slab, serif', color: '#47476b', marginLeft: '2em' }}>Log in/Sign up to be able to apply for the gym.</h1>
                    </>
                }



                <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Application</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to apply to this gym?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowApplyModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        </>
    );
};

export default Gym;