import AdminNav from "../components/AdminNav"
import AdminSide from "../components/AdminSide"
import UserList from "./UserList";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, registeredUsers} from '../utils/constants';


function AdminDash(){

    const [users,setUsers] = useState([])
    const [error, setError] = useState(null);

    const token = localStorage.getItem('jwtTokenAdmin');
    console.log(token)

    // Include the token in the Authorization header
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    useEffect(()=>{
        axios.get(baseUrl+registeredUsers,config)
        .then(response => {
            setUsers(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
            setError(error)
        })}
        ,[])
   
    return(
        <div>
            <AdminSide/>
            <AdminNav/>
            {error ? (
                <div className="error-message">
                    Something went wrong while fetching user details.
                </div>
            ) : (
                <UserList users={users} />
            )}

        </div>
    )
}


export default AdminDash