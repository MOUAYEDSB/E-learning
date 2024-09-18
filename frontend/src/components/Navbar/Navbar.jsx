import './navBar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setLogin }) => {
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Update login state
    setLogin(false);

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-search">
        <img src={assets.searchIcon} alt="" />
        <form>
          <input type="text" placeholder='Rechercher ...' />
        </form>
      </div>
      <div className="navbar-right">
        <div className="navbar-right-icons">
          <img src={assets.calendarIcon} alt="" />
          <img src={assets.notificationIcon} alt="" />
        </div>
        <div className="navbar-right-profile">
          <div className="profile-info">
            <h4>Ahmed Trabelsi</h4>
            <p>N, Tunisia</p>
          </div>
          <div className='cell profile'>
            <img src={assets.profileImg} onClick={() => navigate("/profile")} alt="Profile" />
          </div>
          {/* Logout Button */}
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
