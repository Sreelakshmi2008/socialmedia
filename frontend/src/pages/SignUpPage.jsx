import { useState,useEffect,useRef } from 'react';
import './SignUpPage.css';
import axios from 'axios';
import {baseUrl,register} from '../utils/constants';
import { useNavigate,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageCropper from './Cropping';

// Your additional SCSS styles go here



function SignUp(){

    const navigate = useNavigate() 
    const [errors, setErrors] = useState({});
    const [emailError, setEmailError] = useState("");

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
            else if(field=="first_name"){
              alert(`First Name: ${errors[field][0]}`);
            }
            else if(field=="last_name"){
              alert(`Last Name: ${errors[field][0]}`);
            }
            else if(field=="phone"){
              alert(`Phone: ${errors[field][0]}`);
            }
            else if(field=="profile_pic"){
              alert(`Profile Picture: ${errors[field][0]}`);
            }
            else if(field=="password"){
              alert(`Password: ${errors[field][0]}`);
            }
            else if(field=="username"){
              alert(`Username: ${errors[field][0]}`);
            }
          
          
        });

         
        }
    }
    console.log(emailError,"email error")
    
    // setting states for each input in form
    const [first,setFirst]=useState("");
    const [last,setLast]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [pass1,setPass1]=useState("");
    const [pass2,setPass2]=useState("");
    const [profile_pic,setProfile] = useState(null)
    const [image, setImage] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imgAfterCrop, setImgAfterCrop] = useState("");
  const [croppedImageName, setCroppedImageName] = useState("");


  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setCurrentPage("crop-img");
  };

    const onChooseImg = () => {
      event.preventDefault();
      inputRef.current.click();
    };
  
    

    // handle file input change
    const inputRef = useRef();
    const handleFileChange = (event) => {
      if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (e) {
          onImageSelected(reader.result);
        };
        
      }
      
    };

    const dataURLtoFile = (dataURL, fileName) => {
      const arr = dataURL.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
    
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
    
      return new File([u8arr], fileName, { type: mime });
    };

    const onCropDone = (imgCroppedArea) => {
      const canvasEle = document.createElement("canvas");
      canvasEle.width = imgCroppedArea.width;
      canvasEle.height = imgCroppedArea.height;
  
      const context = canvasEle.getContext("2d");
  
      let imageObj1 = new Image();
      imageObj1.src = image;
      imageObj1.onload = function () {
        context.drawImage(
          imageObj1,
          imgCroppedArea.x,
          imgCroppedArea.y,
          imgCroppedArea.width,
          imgCroppedArea.height,
          0,
          0,
          imgCroppedArea.width,
          imgCroppedArea.height
        );
  
        const dataURL = canvasEle.toDataURL("image/jpeg");
  
        const file = dataURLtoFile(dataURL, 'profile_pic.jpg');

    // Update the profile_pic state with the file
    setProfile(file);
      setCroppedImageName(file.name)
  
        // Reset the image state
        setImage("");
  
        setCurrentPage("img-cropped");
      };
    };
  
    // Handle Cancel Button Click
    const onCropCancel = () => {
      setCurrentPage("choose-img");
      setImage("");
    };
  
    console.log(profile_pic)

    
    //   when submit form this fun is called
    const handleSubmit = async (event) => {
        event.preventDefault();

          // Check if email is empty
          if (!email.trim()) {
            setEmailError("Email is required");
            return;
        }
        else if(!email.includes('@')){
          setEmailError("Email Format not required");
            return;

        }
       
        // Clear previous email error if any
        setEmailError("");

        

        // if passwords matches, then we fetch all the data in form and send it to signup function
        if(pass1===pass2){
    
        const formData = new FormData();

        // Append each field to the FormData object
        formData.append('username', first);
        formData.append('name', last);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', pass1);
         

        // Only append profile_pic if it is provided
        if (profile_pic) {
        
            formData.append('profile_pic', profile_pic);
          
        }

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
                <label className='first_label'>Username</label>
                <input className='form-control first_name' type='text' placeholder='Username.......' value={first} onChange={(e) => setFirst(e.target.value)} />
              </div>

              <div className="form-group">

                <label className='last_label'>Name</label>
                <input className='form-control last_name' type='text' placeholder='Your Name.......' value={last} onChange={(e) => setLast(e.target.value)} />
              </div>

              <div className="form-group">
              {/* <span className='error_input'>{emailError? emailError: ""}</span> */}
                <label className='email_label'>Email</label>
                <input className={`form-control email_input ${emailError ? 'error' : ''}`} type='text' placeholder="email......." value={email} onChange={(e) => setEmail(e.target.value)} />
                
        
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
        <input type='file' accept='image/*' ref={inputRef} className='form-control-file profile_pic' onChange={handleFileChange} />
        {/* <button className="btn " onClick={onChooseImg}>
          Choose Image
        </button> */}
{/*                          
                {currentPage === "choose-img" ? (
                   <div>
       
        </div>
      ) : currentPage === "crop-img" ? (
        <ImageCropper
          image={image}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : (
        <div>
          <div>
          
            <p>Cropped Image Name: {croppedImageName}</p>
          </div>

          <button
            onClick={() => {
              setCurrentPage("crop-img");
            }}
            className="btn"
          >
            Crop
          </button>

          <button
            onClick={() => {
              setCurrentPage("choose-img");
              setImage("");
            }}
            className="btn"
          >
            New Image
          </button>
        </div>
      )} */}
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

    );
}

export default SignUp;
