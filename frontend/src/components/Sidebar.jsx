import './SideBar.css';
import { baseUrl} from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';



function SideBar({pic}){
    
    const navigate = useNavigate()
    const handleUserLogout = ()=>{
        localStorage.removeItem('jwtToken');
    
        navigate('/')
      }

    return(
        <div className="box2">
            <div className='myprofile'>
                <img className="myprofile_pic" src={baseUrl+pic} />
                <Link className="myprofile_text" to='/profile'>My Profile</Link>
            </div>
            <div className='myposts'>
                <img className="myposts_pic" src={baseUrl+pic} />
                <span className="myposts_text">My Posts</span>
            </div>
            <div className='savedpost'>
                <img className="savedpost_pic" src={baseUrl+pic} />
                <span className="savedpost_text">Saved Posts</span>
            </div>
            <div className='followers'>
                <img className="followers_pic" src={baseUrl+pic} />
                <span className="followers_text">Followers</span>
            </div>
            <div className='following'>
                <img className="following_pic" src={baseUrl+pic} />
                <span className="following_text">Followings</span>
            </div>
            <div className='messages'>
                  <img className="messages_pic" src={baseUrl+pic} />
                  <span className="messages_text">Messages</span>
            </div>
            <div className='logout'>
                  {/* <img className="messages_pic" src={baseUrl+pic} /> */}
                  <button className="logout_link" onClick={handleUserLogout}>Log Out</button>
            </div>
              
              



        </div>
    )
}


export default SideBar