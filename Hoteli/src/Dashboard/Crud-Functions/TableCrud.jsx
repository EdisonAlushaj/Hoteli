import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {TableEndPoint} from'../../endpoints';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableCrud = () => {

    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [Id, setId] = useState('')
    const [TableNumber, setTableNumber] = useState('')
    const [MaxGuests, setMaxGuests] = useState('')
    const [Establishment, setEstablishment] = useState('')
   
    const [editId, setEditId] = useState('')
    const [editTableNumber, setEditTableNumber] = useState('')
    const [editMaxGuests, setEditMaxGuests] = useState('')
    const [editEstablishment, setEditEstablishment] = useState('')
   
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(TableEndPoint)
            .then((response) => {
                console.log(response);
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async function editTable(cafes) {
        handleShow();
        setEditTableNumber(cafes.TableNumber);
        setEditMaxGuests(cafes.MaxGuests);
        setEditEstablishment(cafes.Establishment);
       
        setId(cafes.id);
    }
    async function Load() {
        const result = await axios.get(TableEndPoint);
        setTableNumber(result.data);
        console.log(result.data);
    }

    async function update(event) {
        event.preventDefault();
        try {
            await axios.patch(`${TableEndPoint}/UpdateFood/${Id}`, {
                id: Id,
                TableNumber: editTableNumber,
                MaxGuests: editMaxGuests,
                Establishment: editEstablishment,
              
            });
            toast.success('Table updated successfully');
            handleClose();
            getData();
            clear();
        } catch (error) {
            console.error("Error updating Table:", error);
        }
    }


    const handelDelete = (id) => {
        if (window, confirm("Are you sure to delete this room.") == true) {
            axios.delete(`${TableEndPoint}/${id}`)
                .then((result) => {
                    if (result.status == 200) {
                        toast.success('Table has been deleted');
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
        const url = TableEndPoint;
        const data = {
            "TableNumber": TableNumber,
            "MaxGuests": MaxGuests,
            "Establishment": Establishment,
            
        }

        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Food has been added.');
                handleCloseAdd();
            })
    }

    const clear = () => {
        setTableNumber('');
        setMaxGuests('');
        setEstablishment('');
    

        setEditTableNumber('');
        setEditMaxGuests('');
        setEditEstablishment('');
        
        setEditId('');
    }

    return (
        <>
            <Fragment>
                <ToastContainer />
                <div className='d-flex justify-content-evenly ' style={{width: "20em", height: "3em", alignItems: "center"}}>
                    <p style={{fontSize: "2em", margin: "0"}}><b>Tables Table</b></p>
                    <button className="btn btn-rounded btn-primary" style={{}} onClick={() => handleShowAdd()}>Add</button>
                </div>

                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Food Name</th>
                            <th>Food Description</th>
                            <th>Food Price</th>
                            <th>Food Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 ?
                                data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.TableNumber}</td>
                                            <td>{item.MaxGuests}</td>
                                            <td>{item.Establishment}</td>
                                            <td>{item.foodImage}</td>
                                            <td className='d-flex flex-row justify-content-evenly'>
                                                <button className="btn btn-rounded btn-primary" onClick={() => editTable(item)}>Edit</button>

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

                {/* Add MenuCafe */}
                <Modal show={showAdd} onHide={handleCloseAdd}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Table</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Food Name'
                                    value={TableNumber} onChange={(e) => setTableNumber(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Food Description'
                                    value={MaxGuests} onChange={(e) => setMaxGuests(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Food Price'
                                    value={Establishment} onChange={(e) => setEstablishment(e.target.value)}
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

                {/* Update Table */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Food</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Food Name'
                                    value={editTableNumber} onChange={(e) => setEditTableNumber(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Description'
                                    value={editMaxGuests} onChange={(e) => setEditMaxGuests(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="text" className='form-control' placeholder='Enter Price'
                                    value={editEstablishment} onChange={(e) => setEditEstablishment(e.target.value)}
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

export default TableCrud;