import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/LandingPage";
import SignUp from "../pages/SignUpPage";
import Home from "../pages/HomePage";
import Profile from "../pages/ProfilePage";


export default function UserRouter(){
    
   
    return (
        <>
     
        <Routes>
           <Route path='/' element={<Landing/>}/>
           <Route path='/register' element={<SignUp />}/>
           <Route path='/homepage' element={<Home />}/>
           <Route path='/profile' element={<Profile />}/>
        </Routes>
        </>
    )
}