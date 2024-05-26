import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Activities.css';

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
    try {
      await axios.post(`https://localhost:7189/api/Activities/${id}/apply`);
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
    </div>
  );
};

export default Activities;
