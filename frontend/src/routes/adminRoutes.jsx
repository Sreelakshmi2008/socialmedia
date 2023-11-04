import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "../pages/LandingPage";
import SignUp from "../pages/SignUpPage";
import Home from "../pages/HomePage";
import Profile from "../pages/ProfilePage";
import AdminLogin from "../pages/AdminLogin";
import AdminDash from "../pages/AdminDash";


function AdminRouter(){
    
   
    return (
        <>
     
        <Routes>
           <Route path='/' element={<AdminLogin/>}/>
           <Route path='/admindash' element={<AdminDash />}/>
           
        </Routes>
        </>
    )
}

export default AdminRouter