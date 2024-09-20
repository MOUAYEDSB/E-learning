import './navBar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = ({ setLogin }) => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(assets.defaultProfileImage);
  const [userName, setUserName] = useState("");
  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const storedProfileImg = localStorage.getItem("profileImgURL");
    const storedUserName = localStorage.getItem("nom"); // Get the user's name

    if (storedProfileImg && storedProfileImg !== "null" && storedProfileImg !== "undefined" && storedProfileImg !== "") {
      setProfileImg(`${baseURL}/${storedProfileImg}`);
    } else {
      setProfileImg(assets.defaultProfileImage);
    }

    // Set the user's name if available
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [baseURL]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImgURL");
    localStorage.removeItem("nom"); // Remove the user's name

    setLogin(false);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-search">
        <img src={assets.searchIcon} alt="Search Icon" />
        <form>
          <input type="text" placeholder='Rechercher ...' />
        </form>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-icons">
          <img src={assets.calendarIcon} alt="Calendar Icon" />
          <img src={assets.notificationIcon} alt="Notification Icon" />
        </div>
        <div className="navbar-right-profile">
          <div className="profile-info">
            <h4>{userName}</h4> {/* Display the user's name */}
            <p>Tunisia</p>
          </div>
          <div className='cell profile'>
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

export default Navbar;
