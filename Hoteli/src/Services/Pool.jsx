import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pool.css';
import cookieUtils from '../cookieUtils.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pool = () => {
  const [pools, setPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [shezlongs, setShezlongs] = useState([]);
  const [selectedShezlong, setSelectedShezlong] = useState(null);
  const [reservationDate, setReservationDate] = useState('');
  const [shezlongReservations, setShezlongReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const userId = cookieUtils.getUserIdFromCookies();

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await axios.get(`https://localhost:7189/api/Pool`);
        setPools(response.data);
      } catch (error) {
        console.error('Error fetching pools:', error);
      }
    };

    fetchPools();
  }, []);

  useEffect(() => {
    const fetchShezlongs = async () => {
      if (selectedPool) {
        try {
          const response = await axios.get(`https://localhost:7189/api/Shezlong`, {
            params: { poolId: selectedPool.id }
          });
          setShezlongs(response.data);
        } catch (error) {
          console.error('Error fetching shezlongs:', error);
        }
      } else {
        setShezlongs([]);
      }
    };

    fetchShezlongs();
  }, [selectedPool]);

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    
    // Check if reservation date is before today
    const today = new Date().toISOString().split('T')[0];
    if (reservationDate < today) {
      toast.error('Cannot reserve shezlong for past dates');
      return;
    }
  
    if (!selectedShezlong || !selectedPool || !userId || !reservationDate) {
      console.error('Please fill out all fields');
      return;
    }
  
    try {
      const response = await axios.post(
        `https://localhost:7189/api/ShezlongReservation`, 
        null, 
        {
          params: {
            userId: userId,
            shezlongId: selectedShezlong.id,
            reservationDate: reservationDate
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Shezlong reserved successfully:', response.data);
  
      // Fetch updated reservations
      const updatedReservations = await axios.get(`https://localhost:7189/api/ShezlongReservation`);
      console.log('Updated reservations:', updatedReservations.data);
  
      // Check if updatedReservations.data is valid
      if (Array.isArray(updatedReservations.data)) {
        setShezlongReservations(updatedReservations.data);
      } else {
        console.error('Invalid data structure for reservations:', updatedReservations.data);
      }
  
      // Close the modal
      setShowModal(false);
  
      // Show toast notification
      toast.success('Shezlong reserved successfully!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error('Shezlong already reserved for this date');
      } else {
        console.error('Error reserving shezlong:', error);
      }
    }
  };
  

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = (shezlong) => {
    setSelectedShezlong(shezlong);
    setShowModal(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className="cover-photooo">
        <h1 className="cover-title">Welcome to Our Pools!</h1>
      </div>
      <div className="container mt-5">
        <h1 className="mb-4">Pools</h1>
        <div className="row">
          {cookieUtils.getUserRoleFromCookies() ? (
            <div className="col-md-4">
              <div className="list-group">
                {pools.length > 0 ? (
                  pools.map(pool => (
                    <button
                      key={pool.id}
                      type="button"
                      className={`list-group-item list-group-item-action ${selectedPool && selectedPool.id === pool.id ? 'active' : ''}`}
                      onClick={() => setSelectedPool(pool)}
                    >
                      <div className="card pool-card">
                        <div className="card-body">
                          <h5 className="card-title">Pool {pool.id}</h5>
                          <p className="card-text">Area: {pool.poolArea}m²</p>
                          <p className="card-text">Duration: {pool.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <p>No pools available</p>
                )}
              </div>
            </div>
          ) : (
            <h1 className="text-start mt-5" style={{ fontSize: '4rem', fontFamily: 'Roboto Slab, serif', color: '#47476b', marginLeft: '2em' }}>Log in/Sign up to be able to make a reservation.</h1>
          )}

          <div className="col-md-8">
            {selectedPool ? (
              <div>
                <h2>Shezlongs for Pool {selectedPool.id}</h2>
                <div className="row">
                  {shezlongs.length > 0 ? (
                    shezlongs.map(shezlong => (
                      <div key={shezlong.id} className="col-md-4 mb-3">
                        <div className={`card shezlong-card ${selectedShezlong && selectedShezlong.id === shezlong.id ? 'border-primary' : ''}`}>
                          <div className="card-body text-center">
                            <h5 className="card-title">Shezlong {shezlong.id}</h5>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => handleShowModal(shezlong)}
                            >
                              Select
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No shezlongs available for this pool</p>
                  )}
                </div>
              </div>
            ) : (
              <p>Please select a pool to view available shezlongs.</p>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reserve Shezlong {selectedShezlong ? selectedShezlong.id : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleReservationSubmit}>
            <div className="form-group">
              <label htmlFor="reservationDate">Reservation Date:</label>
              <input type="date" className="form-control form-control-sm" id="reservationDate" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
            </div>
            <Button variant="success" type="submit">
              Reserve Shezlong
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Pool;
