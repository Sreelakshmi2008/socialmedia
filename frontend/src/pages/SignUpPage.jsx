import { useState } from 'react';
import './SignUpPage.css';
import axios from 'axios';
import {baseUrl,register} from '../utils/constants';
import { useNavigate,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function SignUp(){

    const navigate = useNavigate() 
    const [errors, setErrors] = useState({});

    // function which sends data to backend signup view function
    const signupUser = async (credentials) => {
        try {
          
            const response = await axios.post(baseUrl + register, credentials, {
              headers: {
                'Content-Type': 'multipart/form-data',  // Important for handling files
              },
            });
         
          console.log(response.data);
          navigate('/')
        } catch (error) {
          setErrors(error.response.data);
          console.error(error.response.data);
          Object.keys(errors).forEach(field => {
            console.log(field)
            if(field=="email"){
              alert(`Email : ${errors[field][0]}`);
            }
            if(field=="first_name"){
              alert(`First Name: ${errors[field][0]}`);
            }
            if(field=="last_name"){
              alert(`Last Name: ${errors[field][0]}`);
            }
            if(field=="phone"){
              alert(`Phone: ${errors[field][0]}`);
            }
            if(field=="profile_pic"){
              alert(`Profile Picture: ${errors[field][0]}`);
            }
            if(field=="password"){
              alert(`Password: ${errors[field][0]}`);
            }
          
        });

         
        }
    }
    
    // setting states for each input in form
    const [first,setFirst]=useState("");
    const [last,setLast]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [pass1,setPass1]=useState("");
    const [pass2,setPass2]=useState("");
    const [profile_pic,setProfile] = useState(null)

    
    // handle file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfile(file);
      };
    
    
    //   when submit form this fun is called
    const handleSubmit = async (event) => {
        event.preventDefault();
        

        // if passwords matches, then we fetch all the data in form and send it to signup function
        if(pass1===pass2){
    
        const formData = new FormData();

        // Append each field to the FormData object
        formData.append('first_name', first);
        formData.append('last_name', last);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', pass1);
        formData.append('profile_pic', profile_pic);

        console.log(formData)
        // Call your signup function
        await signupUser(formData);
       
        }

        // if passwords donot match, alert users
        else{
            alert("Passwords donot match")
        }


    };
        return(
          <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="box mt-5">
            <h1 className="title2 text-center">Create Your Account</h1>
            <form className='signupForm' onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="form-group">
                <label className='first_label'>First Name</label>
                <input className='form-control first_name' type='text' placeholder='First Name.......' value={first} onChange={(e) => setFirst(e.target.value)} />
              </div>

              <div className="form-group">
                <label className='last_label'>Last Name</label>
                <input className='form-control last_name' type='text' placeholder='Last name.......' value={last} onChange={(e) => setLast(e.target.value)} />
              </div>

              <div className="form-group">
                <label className='email_label'>Email</label>
                <input className='form-control email_input' type='text' placeholder='Email.......' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="form-group">
                <label className='phone'>Phone Number</label>
                <input className='form-control phone_input' type='text' placeholder='Phone Number......' value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div className="form-group">
                <label className='pass1'>Password</label>
                <input className='form-control pass1_input' type='password' placeholder='Password.......' value={pass1} onChange={(e) => setPass1(e.target.value)} />
              </div>

              <div className="form-group">
                <label className='pass2'>Confirm Password</label>
                <input className='form-control pass2_input' type='password' placeholder='Confirm Password.......' value={pass2} onChange={(e) => setPass2(e.target.value)} />
              </div>

              <div className="form-group">
                <label className='profile'>Select your profile pic</label>
                <input type='file' className='form-control-file profile_pic' onChange={handleFileChange} />
              </div>

              <button className='btn btn-block create pt-0' type='submit'>Create Account</button>
            </form>

            <p className="text-center mt-3">
              <Link className='link2' to="/">Sign in to your account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
            // <>
            //     <div className="box">
                
            //             <h1 className='title2'>Create Your Account</h1>
            //             <form className='signupForm'  onSubmit={handleSubmit} encType="multipart/form-data">
            //             <label className='first_label'>First Name</label>
            //             <input className='first_name'type='text' placeholder='First Name.......'value={first} onChange={(e)=>setFirst(e.target.value)}></input>

            //             <label className='last_label'>Last Name</label>
            //             <input className='last_name' type='text' placeholder='Last name.......' value={last} onChange={(e)=>setLast(e.target.value)}></input>

            //             <label className='email_label'>Email</label>
            //             <input className='email_input' type='text' placeholder='Email.......' value={email} onChange={(e)=>setEmail(e.target.value)}></input>

            //             <label className='phone'>Phone Number</label>
            //             <input className='phone_input' type='text' placeholder='Phone Number......' value={phone} onChange={(e)=>setPhone(e.target.value)}></input>

            //             <label className='pass1'>Password</label>
            //             <input className='pass1_input'type='password' placeholder='Password.......'value={pass1} onChange={(e)=>setPass1(e.target.value)}></input>

            //             <label className='pass2'>Confirm Password</label>
            //             <input className='pass2_input' type='password' placeholder='confirm Password.......'value={pass2} onChange={(e)=>setPass2(e.target.value)}></input>
                    


            //             <label className='profile'>Select your profile pic</label>
            //             <input type='file' className='profile_pic' onChange={handleFileChange}></input>
            
            //             <button className='create' type='submit'>Create</button>
                    
                        
            //             </form>
            //             <a className='link2' href="#">Sign in to your account</a>
                        
            //     </div>
            // </>

    );
}

export default SignUp;
