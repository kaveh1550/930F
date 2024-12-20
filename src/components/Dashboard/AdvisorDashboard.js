import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdvisorDashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/api/advisor_dashboard/')
      .then(response => {
        setConsultations(response.data.consultations);
        setEarnings(response.data.totalEarnings);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Dashboard Advisor</h2>
      <p><strong>Total Earnings: </strong>${earnings}</p>

      <h3>Consultation History</h3>
      {consultations.length > 0 ? (
        <ul>
          {consultations.map(item => (
            <li key={item.id}>
              {item.date} - Client: {item.clientName} - Fee: ${item.fee}
            </li>
          ))}
        </ul>
      ) : (
        <p>No consultations available.</p>
      )}
    </div>
  );
};

export default AdvisorDashboard;
