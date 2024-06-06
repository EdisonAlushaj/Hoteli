import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { RoomBookingEndPoint } from '../../endpoints.js';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookieUtils from '../../cookieUtils.jsx';

const RoomBooking = () => {
    const [showAdd, setShowAdd] = useState(false);

    const userId = cookieUtils.getUserIdFromCookies();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [roomBookingItems, setRoomBookingItems] = useState([{ roomId: '', quantity: '' }]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(RoomBookingEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        console.log("Deleting room booking with ID:", id);
        if (window.confirm("Are you sure to delete this room booking?")) {
            // Update UI immediately
            setData(data.filter(item => item.roomBookingId !== id));

            // Send request to delete order from the server
            axios.delete(`${RoomBookingEndPoint}/${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        toast.success('Room booking has been deleted');
                    }
                })
                .catch((error) => {
                    toast.error(error);
                    // If the server request fails, revert the UI state
                    getData(); // Fetch updated list of orders to revert UI state
                });
        }
    };


    const handleSave = () => {
        if (!userId || !paymentMethod || !checkInDate || !checkOutDate || roomBookingItems.length === 0) {
            toast.error('Please fill all the required fields.');
            return;
        }

        const RoomBookingDto = {
            id: userId,
            paymentMethod: paymentMethod,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            roomBookingItems: roomBookingItems.map(item => ({
                roomId: parseInt(item.roomId),
                quantity: parseInt(item.quantity),
                roomName: 'Room'
            }))
        };

        axios.post(RoomBookingEndPoint, RoomBookingDto)
            .then((result) => {
                getData();
                clear();
                toast.success('Room Booking has been added.');
                handleCloseAdd();
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const clear = () => {
        // setUserId('');
        setPaymentMethod('');
        setCheckInDate('');
        setCheckOutDate('');
        setRoomBookingItems([{ roomId: '', quantity: '' }]);
    };

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const handleRoomBookingItemsChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRoomBookingItems = [...roomBookingItems];
        updatedRoomBookingItems[index][name] = value;
        setRoomBookingItems(updatedRoomBookingItems);
    };

    const addRoomBooking = () => {
        setRoomBookingItems([...roomBookingItems, { roomId: '', quantity: '' }]);
    };

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly' style={{ width: "20em", height: "3em", alignItems: "center" }}>
                    <p style={{ fontSize: "2em", margin: "0" }}><b>Room Booking</b></p>
                    <button className="btn btn-rounded btn-primary" onClick={handleShowAdd}>Add</button>
                </div>
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>User Name</th>
                            <th>Payment Method</th>
                            <th>Check In Date</th>
                            <th>Check Out Date</th>
                            <th>Total Price</th>
                            <th>Booking Items</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.roomBookingId}</td>
                                    <td>{item.user.name}</td>
                                    <td>{item.paymentMethod}</td>
                                    <td>{item.checkInDate}</td>
                                    <td>{item.checkOutDate}</td>
                                    <td>{item.totalBookingPrice}</td><td>
                                        {item.roomBookingItems.map((bookingItem, idx) => (
                                            <div key={idx} className="card mb-2" style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '10px' }}>
                                                <div className="card-body">
                                                    <p className="card-text"><strong>Room ID:</strong> {bookingItem.roomId}</p>
                                                    <p className="card-text"><strong>Room Name:</strong> {bookingItem.roomName}</p>
                                                    <p className="card-text"><strong>Quantity: </strong> {bookingItem.quantity} </p>
                                                    <p className="card-text"><strong>Price:</strong> ${bookingItem.price} </p>
                                                    <p className="card-text"><strong>Price * Quantity:</strong>  ${bookingItem.price * bookingItem.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className='d-flex flex-row justify-content-evenly'>
                                        <button className="btn btn-rounded btn-danger" onClick={() => handleDelete(item.roomBookingId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : 'Loading...'}
                    </tbody>
                </Table>

                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            {/* <Col>
                                <input type="number" className='form-control' placeholder='Enter User Id'
                                    value={userId} onChange={(e) => setUserId(e.target.value)}
                                />
                            </Col> */}
                            <Col>
                                <select className='form-control' value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <option value="">Select payment method</option>
                                    <option value="card-online">Card - Online</option>
                                    <option value="cash-at-delivery">Cash - At Delivery</option>
                                </select>
                            </Col>
                            <Col>
                                <input type="date" className='form-control' placeholder='Enter Date'
                                    value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="date" className='form-control' placeholder='Enter Date'
                                    value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)}
                                />
                            </Col>
                        </Row>
                        {roomBookingItems.map((item, index) => (
                            <Row key={index}>
                                <Col>
                                    <input type="number" className='form-control' placeholder='Room Id'
                                        name="roomId" value={item.roomId} onChange={(e) => handleRoomBookingItemsChange(index, e)}
                                    />
                                </Col>
                                <Col>
                                    <input type="number" className='form-control' placeholder='Quantity'
                                        name="quantity" value={item.quantity} onChange={(e) => handleRoomBookingItemsChange(index, e)}
                                    />
                                </Col>
                            </Row>
                        ))}
                        <Button variant="secondary" onClick={addRoomBooking}>Add Booking</Button>
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

export default RoomBooking;
