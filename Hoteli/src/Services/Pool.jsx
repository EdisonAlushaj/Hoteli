import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pool.css';
import cookieUtils from '../cookieUtils.jsx';

const Pool = () => {
  const [pools, setPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [shezlongs, setShezlongs] = useState([]);
  const [selectedShezlong, setSelectedShezlong] = useState(null);
  const [shezlongReservations, setShezlongReservations] = useState([]);
  const [reservationDate, setReservationDate] = useState('');

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

    const fetchShezlongs = async () => {
      try {
        const response = await axios.get(`https://localhost:7189/api/Shezlong`);
        setShezlongs(response.data);
      } catch (error) {
        console.error('Error fetching shezlongs:', error);
      }
    };

    const fetchShezlongReservations = async () => {
      try {
        const response = await axios.get(`https://localhost:7189/api/ShezlongReservation`);
        setShezlongReservations(response.data);
      } catch (error) {
        console.error('Error fetching shezlong reservations:', error);
      }
    };

    fetchPools();
    fetchShezlongs();
    fetchShezlongReservations();
  }, []);

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    if (!selectedShezlong || !selectedPool || !userId || !reservationDate) {
      console.error('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post(`https://localhost:7189/api/ShezlongReservation`, null, {
        params: {
          userId: userId,
          shezlongId: selectedShezlong.id,
          reservationDate: reservationDate
        }
      });
      console.log('Shezlong reserved successfully:', response.data);
      const updatedReservations = await axios.get(`https://localhost:7189/api/ShezlongReservation`);
      setShezlongReservations(updatedReservations.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error('Shezlong already reserved for this date');
      } else {
        console.error('Error reserving shezlong:', error);
      }
    }
  };

  return (
    <div>
      <div className="cover-photooo">
        <h1 className="cover-title">Welcome to Our Pools!</h1>
      </div>
      <div className="container mt-5">
        <h1 className="mb-4">Pools</h1>
        <div className="row">
          {cookieUtils.getUserRoleFromCookies() ? (
            <>
              <div className="col-md-4">
                <div className="list-group">
                  {pools.map(pool => (
                    <button
                      key={pool.id}
                      type="button"
                      className={`list-group-item list-group-item-action ${selectedPool && selectedPool.id === pool.id ? 'active' : ''}`}
                      onClick={() => setSelectedPool(pool)}
                    >
                      <div className="card pool-card">
                        <div className="card-body">
                          <h5 className="card-title">Pool {pool.id}</h5>
                          <p className="card-text">Date: {pool.date}</p>
                          <p className="card-text">Duration: {pool.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) :
            <>
              <h1 className="text-start mt-5" style={{ fontSize: '4rem', fontFamily: 'Roboto Slab, serif', color: '#47476b', marginLeft: '2em' }}>Log in/Sign up to be able to make a reservation.</h1>
            </>
          }


          <div className="col-md-8">
            {selectedPool && (
              <div>
                <h2>Shezlongs for Pool {selectedPool.id}</h2>
                <div className="row">
                  {shezlongs.map(shezlong => (
                    <div key={shezlong.id} className="col-md-4 mb-3">
                      <div className={`card shezlong-card ${selectedShezlong && selectedShezlong.id === shezlong.id ? 'border-primary' : ''}`}>
                        <div className="card-body text-center">
                          <h5 className="card-title">Shezlong {shezlong.id}</h5>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => setSelectedShezlong(shezlong)}
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedShezlong && (
                  <div className="reservation-form">
                    <h4>Reserve Shezlong {selectedShezlong.id}</h4>
                    <form onSubmit={handleReservationSubmit}>
                      <div className="form-group">
                        <label htmlFor="reservationDate">Reservation Date:</label>
                        <input type="date" className="form-control form-control-sm" id="reservationDate" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
                      </div>
                      <button type="submit" className="btn btn-success btn-sm btn-block">Reserve Shezlong</button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pool;
