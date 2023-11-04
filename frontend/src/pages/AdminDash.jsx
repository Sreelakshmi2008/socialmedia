import AdminNav from "../components/AdminNav"
import AdminSide from "../components/AdminSide"
import UserList from "./UserList"

function AdminDash(){
   
    return(
        <div>
            <AdminSide/>
            <AdminNav />
            <UserList />

        </div>
    )
}


export default AdminDash