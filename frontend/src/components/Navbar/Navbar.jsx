import './navBar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = ({ setLogin }) => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(assets.defaultProfileImage); // Default image
  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000"; // Use VITE_BASE_URL from .env or fallback

  useEffect(() => {
    // Fetch the profile image from localStorage
    const storedProfileImg = localStorage.getItem("profileImgURL");
    console.log(`Stored Profile Image URL: ${storedProfileImg}`);

    // Check if the stored profile image is valid and not empty
    if (storedProfileImg && storedProfileImg !== "null" && storedProfileImg !== "undefined" && storedProfileImg !== "") {
      // Prepend the base URL to the stored profile image URL
      setProfileImg(`${baseURL}/${storedProfileImg}`);
    } else {
      // If no valid image is found, set the default profile image
      setProfileImg(assets.defaultProfileImage);
    }
  }, [baseURL]);

  // Logout function
  const logout = () => {
    // Remove the token and profile image from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImgURL");

    // Update login state
    setLogin(false);

    // Redirect to the login page
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
            <h4>Ahmed Trabelsi</h4>
            <p>Tunisia</p>
          </div>
          <div className='cell profile'>
            {/* Dynamically render the user's profile image */}
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
