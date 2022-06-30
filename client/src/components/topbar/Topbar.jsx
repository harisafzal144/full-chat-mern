import './topbar.css';
import {
  Search,
  // Person,
  // Chat,
  // Notifications,
} from '@material-ui/icons';
// import RoomIcon from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar() {
  let history = useHistory();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  function handleLogOut() {
    //remove from local storage
    localStorage.removeItem('user');
    history.push('/login');
    window.location.reload(false);
    //console.log('after remove user form localStorage', user);
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">Ikonic-chat</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink" onClick={() => history.push('/')}>
            Homepage
          </span>
          {/* <span className="topbarLink">Timeline</span> */}
        </div>
        <div className="topbarLinks">
          <span
            className="topbarLink"
            onClick={() => history.push('/messenger')}
          >
            chat
          </span>
          {/* <span className="topbarLink">Timeline</span> */}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          <div className="topbarIconItem">
            {/* <Chat /> */}
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            {/* <Notifications /> */}
            {/* <span className="topbarIconBadge">1</span> */}
            <span style={{ marginRight: '5px' }}>{`${
              user.username.charAt(0).toUpperCase() + user.username.slice(1)
            }`}</span>
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : 'http://localhost:3000/assets/person/profile_0.jpg'
                }
                alt=""
                className="topbarImg"
              />
            </Link>
          </div>
        </div>

        {/* <RoomIcon /> */}
        <button className="lgbtn" type="button" onClick={handleLogOut}>
          LogOut
        </button>
      </div>
    </div>
  );
}
