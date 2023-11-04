import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl,user } from '../utils/constants';
import { Link } from "react-router-dom";
import './ProfilePage.css';
import NavBar from '../components/NavBar'
import SideBar from '../components/Sidebar';

function Profile() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {

        const token = localStorage.getItem('jwtToken');

        // Include the token in the Authorization header
        const config = {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        };

        // Make an HTTP GET request to the backend endpoint
        axios.get(baseUrl + user, config)
        .then(response => {

            setUserName(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });
        }, []

    ); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <NavBar name={userName ? userName.first_name : null}  pic={userName?userName.profile_pic:null}/>
  <SideBar pic={userName?userName.profile_pic:null} />
          {userName ? (
        <div className='profile_div'>
          {console.log(userName)}
          
          <img className='profile_image' src={baseUrl + userName.profile_pic} alt="User Profile" />
          <h1 className='user_name'>{userName.first_name + userName.last_name}</h1>
          <h4 className='details'>Email : {userName.email}<br/><br/>
              Phone Number : {userName.phone}</h4>
          <div className='numbers'>
            <h4 className='number followers_no'>20</h4>
            <h4 className='number following_no'>20</h4>
            <h4 className='number post_no'>20</h4>
          </div>
          
          
          <div className='buttons'>
            <button className='edit_btn edit_profile_btn'>Edit Profile</button>
            <button className='edit_btn change_pic_btn'>Change Profile Pic</button>
            <button className='edit_btn change_pass_btn'>Change Password</button>

          </div>
        


            
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
      {/* <Link to='/homepage'>Back to home</Link> */}
    </>
  );
}

export default Profile;
