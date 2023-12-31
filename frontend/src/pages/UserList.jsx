import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'

const UserList = ({users}) => {

  const [showdeletedusers,setShowDeletedUsers] = useState(false)
  const filteredusers = showdeletedusers?users.filter((user)=>user.is_deleted):users.filter((user)=>!user.is_deleted)
  console.log(filteredusers)
  return (
    <div>
      <div style={{color:'black',fontSize:'15px',marginLeft:'25%',marginTop:'5%'}}>
      <button style={{ marginLeft: '75%' }} onClick={() => setShowDeletedUsers(!showdeletedusers)}>
          {showdeletedusers ? 'Show All Users' : 'Show Deleted Users'}
        </button>
      <h2>User List</h2>
      </div>

      <ol style={{
        display:'flex',
        flexDirection:'column',
        marginLeft:'30%',
        marginTop:'2%',
        overflow:'scroll'
       
      }}>
                {filteredusers.map((user, index) => (
          <li className='mb-2' key={user.id}>
            {user.is_deleted ? (
              <span>{user.email}</span>
            ) : (
              <Link
                to={`/admin/admin_user/${user.email}`}
                style={{
                  backgroundColor: 'transparent',
                  textDecoration: 'none',
                  color: 'blue',
                  transformOrigin: 'center',
                  display: 'inline-block',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {user.email}
              </Link>
            )}
          </li>
        ))}



      </ol>
    </div>
  );
};

export default UserList;
