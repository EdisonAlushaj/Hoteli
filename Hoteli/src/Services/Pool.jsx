import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pool = () => {
  const [pools, setPools] = useState([]);
  const [selectedPool, setSelectedPool] = useState(null);
  const [shezlongs, setShezlongs] = useState([]);
  const [selectedShezlong, setSelectedShezlong] = useState(null);
  const [shezlongReservations, setShezlongReservations] = useState([]);
  const [reservationDate, setReservationDate] = useState('');
  const [userId, setUserId] = useState('');

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
          userId: parseInt(userId),
          shezlongId: selectedShezlong.id,
          reservationDate: reservationDate
        }
      });
      console.log('Shezlong reserved successfully:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error('Shezlong already reserved for this date');
      } else {
        console.error('Error reserving shezlong:', error);
      }
    }
  };
  
  
  
  

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Pools as a Service</h1>
      <div className="row">
        <div className="col-md-4">
          <h2>Pools</h2>
          <div className="list-group">
            {pools.map(pool => (
              <button
                key={pool.id}
                type="button"
                className={`list-group-item list-group-item-action ${selectedPool && selectedPool.id === pool.id ? 'active' : ''}`}
                onClick={() => setSelectedPool(pool)}
              >
                <div className="card">
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
        <div className="col-md-8">
          {selectedPool && (
            <div>
              <h2>Shezlongs for Pool {selectedPool.id}</h2>
              <div className="row">
                {shezlongs.map(shezlong => (
                  <div key={shezlong.id} className="col-md-3 mb-3">
                    <div className={`card ${selectedShezlong && selectedShezlong.id === shezlong.id ? 'border-primary' : ''}`}>
                      <div className="card-body">
                        <h5 className="card-title">Shezlong {shezlong.id}</h5>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm mb-2"
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
                <div className="mb-3">
                  <h4>Selected Shezlong</h4>
                  <p>Shezlong {selectedShezlong.id}</p>
                  <form onSubmit={handleReservationSubmit}>
                    <div className="form-group">
                      <label htmlFor="userId">User ID:</label>
                      <input type="text" className="form-control" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="reservationDate">Reservation Date:</label>
                      <input type="date" className="form-control" id="reservationDate" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-success">Reserve Shezlong</button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pool;
