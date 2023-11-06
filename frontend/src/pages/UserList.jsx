import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'

const UserList = ({users}) => {
  

  return (
    <div>
      <h2 style={{color:'black',fontSize:'20px',marginLeft:'25%',marginTop:'5%'}}>User List</h2>
      <ol style={{
        display:'flex',
        flexDirection:'column',
        marginLeft:'30%',
        marginTop:'2%',
        overflow:'scroll'
       
      }}>
        {users.map((user, index) => (
          <li className='mb-2' key={user.id}>
            <Link to={`/admin/admin_user/${user.email}`} style={{ backgroundColor:'transparent',textDecoration: 'none', color: 'blue', transformOrigin: 'center', display: 'inline-block' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            > {user.email}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default UserList;
