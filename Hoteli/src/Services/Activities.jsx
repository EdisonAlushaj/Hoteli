import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Activities.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cookieUtils from '../cookieUtils.jsx';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [appliedActivities, setAppliedActivities] = useState(new Set());
  const userId = cookieUtils.getUserIdFromCookies();

  const getToken = () => {
    return cookieUtils.getTokenFromCookies();
  }

  useEffect(() => {
    const fetchActivities = async () => {
      const token = getToken();
      try {
        const response = await axios.get('https://localhost:7189/api/Activities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setActivities(response.data);

        const appliedResponse = await axios.get(`https://localhost:7189/api/UserActivities/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const appliedIds = new Set(appliedResponse.data.map(item => item.activityId));
        setAppliedActivities(appliedIds);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, [userId]);

  const handleApply = async (activityId) => {
    if (appliedActivities.has(activityId)) {
      toast.error('You have already applied for this activity.');
      return;
    }

    const token = getToken();
    try {
      await axios.post(`https://localhost:7189/api/ActivitiesReservation?userId=${userId}&activitiesId=${activityId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Applied successfully!');
      setAppliedActivities(prev => new Set([...prev, activityId]));
    } catch (error) {
      console.error('Error applying for activity:', error);
      toast.error('Failed to apply.');
    }
  };

  return (
    <div className="app">
      <ToastContainer />
      <div className="cover-photoo">
        <h1 className="cover-title">Activities</h1>
      </div>
      {cookieUtils.getUserRoleFromCookies() ? (
        <div className="activities-list">
          {activities.map(activity => (
            <div className="activity" key={activity.id}>
              <img
                src={activity.image}
                alt={activity.name}
                className="activity-image"
                onError={(e) => { e.target.onerror = null; e.target.src = "path/to/placeholder-image.jpg"; }}
              />
              <h2>{activity.name}</h2>
              <p>Location: {activity.location}</p>
              <p>Duration: {activity.duration}</p>
              <p>Cost: ${activity.cost.toFixed(2)}</p>
              <button onClick={() => handleApply(activity.id)}>Apply</button>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-start mt-5" style={{ fontSize: '4rem', fontFamily: 'Roboto Slab, serif', color: '#47476b', marginLeft: '2em' }}>Log in/Sign up to apply for activities.</h1>
      )}
    </div>
  );
};

export default Activities;
