import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, registeredUsers} from '../utils/constants';

const UserList = () => {
  const [users,setUsers] = useState([])
  useEffect(
    axios.get(baseUrl+registeredUsers)
    .then(response => {
        setUsers.append(response.data);
        console.log(response.data)
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
    })
    ,[])

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
