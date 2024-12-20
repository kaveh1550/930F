import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientDashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [upcomingConsultations, setUpcomingConsultations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/client_dashboard/')
      .then(response => {
        setConsultations(response.data.pastConsultations);
        setUpcomingConsultations(response.data.upcomingConsultations);
      })
      .catch(error => console.error('Failed to fetch data:', error));
  }, []);

  return (
    <div>
      <h2>Dashboard Client</h2>

      <h3>Past Consultations</h3>
      {consultations.length > 0 ? (
        <ul>
          {consultations.map(item => (
            <li key={item.id}>
              {item.date} - Advisor: {item.advisorName} - Cost: ${item.cost}
            </li>
          ))}
        </ul>
      ) : (
        <p>No consultations available.</p>
      )}

      <h3>Upcoming Consultations</h3>
      {upcomingConsultations.length > 0 ? (
        <ul>
          {upcomingConsultations.map(item => (
            <li key={item.id}>
              {item.date} with {item.advisorName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming consultations.</p>
      )}
    </div>
  );
};

export default ClientDashboard;
