import { Navigate, Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/AdminLogin";
import AdminDash from "../pages/AdminDash";
import UserDetail from "../pages/userDetails";


function AdminRouter(){
    
   
    return (
        <>
     
        <Routes>
           <Route path='/' element={<AdminLogin/>}/>
           <Route path='/admindash' element={<AdminDash/>}/>
           <Route path='/admin_user/:userEmail' element={<UserDetail/>}/>

           
        </Routes>
        </>
    )
}

export default AdminRouter