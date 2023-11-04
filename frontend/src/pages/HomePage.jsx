import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl,user } from '../utils/constants';
import { Link } from "react-router-dom";
import NavBar from '../components/NavBar';
import SideBar from '../components/Sidebar';


function Home() {
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
      
      
    </>
  );
}

export default Home;
