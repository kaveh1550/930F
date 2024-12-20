import React, { useEffect, useState } from 'react';
import { api } from '../api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>List of Users</h2>
      {users.map(user => (
        <p key={user.id}>{user.name} - {user.email}</p>
      ))}
    </div>
  );
};

export default UserList;
