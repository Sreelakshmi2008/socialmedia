import './NavBar.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { baseUrl} from '../utils/constants';


function NavBar({ name, pic }) {




  return (
    <div className='navbar'>
      <ul>
        <li><Link to="/homepage">Name</Link></li>
        <div className="input-group md-form form-sm form-1 pl-0">
          <div className="input-group-prepend">
            <span className="input-group-text pink lighten-3" id="basic-text1">
              <FontAwesomeIcon icon={faSearch} className="text-black" />
            </span>
          </div>
          <input className="form-control  py-1 small-input" type="text" placeholder="Search accounts.........." aria-label="Search" />
        </div>
      </ul>
      <div className='nav_profile'>
        <img src={baseUrl + pic} alt="Profile" />
        <span>{name}</span>
      </div>
    </div>
  );
}

export default NavBar;
