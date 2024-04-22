import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RoomEndPoint } from "../../endpoints";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoomCrud = () => {

    const [rooms, setRooms] = useState([]);
    const [show, setShow] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [size, setSize] = useState(0);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    const fetchRooms = async () => {
        try {
            const response = await axios.get(`https://localhost:7189/api/Room`);
            setRooms(response.data);
        } catch (error) {
            console.error("Error fetching rooms:", error);
            setRooms([]);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleAddRoom = async () => {
        const newRoom = {
            RoomName: roomName,
            Capacity: capacity,
            Size: size,
            Description: description,
            Price: price,
            Image: image
        };
        try {
            const response = await axios.post('https://localhost:7189/api/Room', newRoom);
            setRooms([...rooms, response.data]);
            setShow(false);
            setRoomName("");
            setCapacity(0);
            setSize(0);
            setDescription("");
            setPrice(0);
            setImage("");
            toast.success("Room added successfully");
        } catch (error) {
            console.error("Error adding room:", error);
            setRooms([]);
            toast.error("Error adding room");
        }
    };

    const handleDeleteRoom = async (id) => {
        try {
            await axios.delete(`${`https://localhost:7189/api/Room`}/${id}`);
            const updatedRooms = rooms.filter((room) => room.Id !== id);
            setRooms(updatedRooms);
            toast.success("Room deleted successfully");
        } catch (error) {
            console.error("Error deleting room:", error);
            setRooms([]);
            toast.error("Error deleting room");
        }
    };

    return (
        <>
            <div className="mb-3">
                <div className='d-flex flex-row align-items-center'>
                    <h3 className="fw-bold fs-4 my-3">Rooms</h3>
                    <button className="btn btn-rounded btn-success ms-3" onClick={() => setShow(true)}>Add</button>
                </div>

                <ToastContainer />

                {show && (
                    <form onSubmit={handleAddRoom}>
                        <input
                            type="text"
                            placeholder="Room Name"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(parseInt(e.target.value))}
                        />
                        <input
                            type="number"
                            placeholder="Size"
                            value={size}
                            onChange={(e) => setSize(parseInt(e.target.value))}
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                        <button type="submit">Add Room</button>
                    </form>
                )}

                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped">
                            <thead>
                                <tr className="highlight" style={{ color: '#fff', textAlign: 'left' }}>
                                    <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Id</th>
                                    <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Room Name</th>
                                    <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Capacity</th>
                                    <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Size</th>
                                    <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Description</th>
                                    <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Price</th>
                                    <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Image</th>
                                    <th scope="col" style={{ backgroundColor: '#b07256', color: '#fff' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.length > 0 ? (
                                    rooms.map((item) => (
                                        <tr key={item.Id}>
                                            <td>{item.Id}</td>
                                            <td>{item.RoomName}</td>
                                            <td>{item.Capacity}</td>
                                            <td>{item.Size}</td>
                                            <td>{item.Description}</td>
                                            <td>{item.Price}</td>
                                            <td>{item.Image}</td>
                                            <td><button className="btn btn-rounded btn-primary">Edit</button></td>
                                            <td><button className="btn btn-rounded btn-danger" onClick={() => handleDeleteRoom(item.Id)}>Delete</button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomCrud;