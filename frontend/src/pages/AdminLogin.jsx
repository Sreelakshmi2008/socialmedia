import './AdminLogin.css'
import axios from 'axios'
import { useState } from 'react';
import {baseUrl,login} from '../utils/constants';
import { useNavigate,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {jwtDecode} from "jwt-decode";




function AdminLogin(){

            
        const navigate = useNavigate()
        const adminlogin = async (credentials) => {
            try {
            const response = await axios.post(baseUrl+login, credentials);
            console.log(response.data);
            const decodedToken = jwtDecode(response?.data?.access);
            if (decodedToken.is_superuser) {
               localStorage.setItem('jwtToken', response.data.access);
            } 
            console.log(decodedToken)
            navigate('/admindash    ', { state: response.data  });
            }
            catch (error) {
            console.error(error);
            }
        };

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (event) => {
            event.preventDefault();
            console.log(email,password,"state")
        
            const formData = {
            email,password
            };
        
            // Call your login function
            await adminlogin(formData);
        
        };



    return (
        <div className="loginbox">
            <h1 className="admin_title">Admin</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' className='adminemail form-control' placeholder='Email.......'
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='password' className='adminpassword form-control' placeholder='Password.......'
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='admin_login btn pt-1' type='submit'>Login</button>
            </form>

        </div>
    )
}


export default AdminLogin