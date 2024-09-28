import './navBarParents.css';
import { assets } from '../../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const NavbarParents = ({ setLogin }) => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(assets.defaultProfileImage);
  const [userName, setUserName] = useState("");
  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const storedProfileImg = localStorage.getItem("profileImgURL");
    const storedUserName = localStorage.getItem("nom");

    if (storedProfileImg && storedProfileImg !== "null" && storedProfileImg !== "undefined" && storedProfileImg !== "") {
      setProfileImg(`${baseURL}/${storedProfileImg}`);
    } else {
      setProfileImg(assets.defaultProfileImage);
    }

    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [baseURL]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImgURL");
    localStorage.removeItem("nom");

    setLogin(false);
    navigate("/login");
  };

  return (
    <div className="navbar-parents">
      <div className="navbar-parents-search">
        <img src={assets.searchIcon} alt="Search Icon" />
        <form>
          <input type="text" placeholder='Rechercher ...' />
        </form>
      </div>
      <div className="navbar-parents-right">
        <div className="navbar-parents-right-icons">
          <img src={assets.calendarIcon} alt="Calendar Icon" />
          <img src={assets.notificationIcon} alt="Notification Icon" />
        </div>
        <div className="navbar-parents-right-profile">
          <div className="profile-info">
            <h4>{userName}</h4>
            <p>Tunisia</p>
          </div>
          <div className='cell profileP'>
            <img src={profileImg} onClick={() => navigate("/profile")} alt="Profile" />
          </div>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavbarParents;
