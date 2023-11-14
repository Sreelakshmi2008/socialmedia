import './LandingPage.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import {baseUrl,login,auth} from '../utils/constants';
import { useNavigate,Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import GoogleLogin from "react-google-login";


function Landing(){


const navigate = useNavigate()

useEffect(()=>{
const isLoggedIn = localStorage.getItem('jwtToken');
if (isLoggedIn) {
    navigate('/homepage');  // Redirect to the homepage
}
},[])
const loginUser = async (credentials) => {
    try {
      const response = await axios.post(baseUrl+login, credentials);
      console.log(response.data);
      localStorage.setItem('jwtToken', response.data.access);
      localStorage.setItem('refreshjwtToken', response.data.refresh);

      navigate('/homepage', { state: response.data  });
    } catch (error) {
      console.error(error);
      alert("wrong username or password")
    }
  };

const [email_or_username, setEmail] = useState('');
const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email_or_username,password,"state")
 
    const formData = {
      email_or_username,password
    };
  
    // Call your login function
    await loginUser(formData);
   
  };

 


// // get env vars
// const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
// const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;
// const handleGoogleLogin = (response) => {
//   axios
//     .post(baseUrl+auth, {
//       token: response.accessToken,
//       backend: "google-oauth2",
//       grant_type: "convert_token",
//       client_id: drfClientId,
//       client_secret: drfClientSecret,
//     })
//     .then((res) => {
//       const { access_token, refresh_token } = res.data;
//       console.log({ access_token, refresh_token });
//       localStorage.setItem("jwtToken", access_token);
//       localStorage.setItem("refreshjwtToken", refresh_token);
//       navigate('/homepage')
//     })
//     .catch((err) => {
//       console.log("Error Google login", err);
//     });
// };
    return(
      <>
       <div className="container">
          <div className="row">
              <div className="col-md-6 first">
                  <div className='rect1'></div>
                  <div className='rect2'></div>
                  <div className='rect3'></div>
                  <div className='rect4'></div>
                  <h1 className='welcome'>Welcome !!!</h1>
                  <h1 className='tagline'>Get connected with people</h1>
              </div>
              <div className="col-md-6 second">
                  <div className='rectangle'>
                      <h1 className='title'>Nameee</h1>
                      <form onSubmit={handleSubmit}>
                          <input type='text' className='email form-control' placeholder='Username or Email.......'
                              value={email_or_username} onChange={(e) => setEmail(e.target.value)} />
                          <input type='password' className='password form-control' placeholder='Password.......'
                              value={password} onChange={(e) => setPassword(e.target.value)} />
                          <button className='login btn pt-1' type='submit'>Login</button>
                      </form>
                      <a className='forgot' href="#">Forgot password???</a>
                      <span className='text'>If you dont have one, create your account here........
                          <Link to="/register" className='link'>signup</Link>
                      </span>
                      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}

                      {/* <GoogleLogin
        clientId={googleClientId}
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={(response) => handleGoogleLogin(response)}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            type="button"
            class="login-with-google-btn"
          >
            Sign in with Google
          </button>
        )}
        onFailure={(err) => console.log("Google Login failed", err)}
      /> */}
                  </div>
              </div>
          </div>
      </div>

         
      </>

    );
}

export default Landing;
