import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Activities.css';
import cookieUtils from '../cookieUtils.jsx';

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('https://localhost:7189/api/Activities');
        setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const handleApply = async (id) => {
    const userId = cookieUtils.getUserIdFromCookies();
    try {
      await axios.post(`https://localhost:7189/api/ActivitiesReservation?userId=${userId}&activitiesId=${id}`);
      alert('Applied successfully!');
    } catch (error) {
      console.error('Error applying for activity:', error);
      alert('Failed to apply.');
    }
  };

  return (
    <div className="app">
      <div className="cover-photoo">
        <h1 className="cover-title">Activities</h1>
      </div>
      {cookieUtils.getUserRoleFromCookies() ? (
        <>
          <div className="activities-list">
            {activities.map(activity => (
              <div className="activity" key={activity.id}>
                {console.log('Image URL:', activity.image)}
                <img
                  src={activity.image}
                  alt={activity.name}
                  className="activity-image"
                  onError={(e) => { e.target.onerror = null; e.target.src = "path/to/placeholder-image.jpg"; }}
                />
                <h2>{activity.name}</h2>
                <p>{activity.description}</p>
                <p>Location: {activity.location}</p>
                <p>Duration: {activity.duration}</p>
                <p>Cost: ${activity.cost.toFixed(2)}</p>
                <button onClick={() => handleApply(activity.id)}>Apply</button>
              </div>
            ))}
          </div>
        </>
      ) :
        <>
          <h1 className="text-start mt-5" style={{ fontSize: '4rem', fontFamily: 'Roboto Slab, serif', color: '#47476b', marginLeft: '2em' }}>Log in/Sign up to be apply for the activities.</h1>
        </>
      }


    </div>
  );
};

export default Activities;
