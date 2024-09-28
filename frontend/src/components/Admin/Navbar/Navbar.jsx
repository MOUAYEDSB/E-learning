import "././navBar.css";
import { assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API requests

// eslint-disable-next-line react/prop-types
const Navbar = ({ setLogin }) => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(assets.defaultProfileImage);
  const [userName, setUserName] = useState(""); // State for the user's name
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const storedProfileImg = localStorage.getItem("profileImgURL");
    const storedUserName = localStorage.getItem("nom"); // Get the user's name

    if (
      storedProfileImg &&
      storedProfileImg !== "null" &&
      storedProfileImg !== "undefined" &&
      storedProfileImg !== ""
    ) {
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
    localStorage.removeItem("nom");

    setLogin(false);
    navigate("/login");
  };

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    let query;

    // Check if searchTerm contains specific keywords
    if (searchTerm.startsWith("email:")) {
      const email = searchTerm.split("email:")[1].trim();
      query = `email=${email}`;
    } else if (searchTerm.startsWith("role:")) {
      const role = searchTerm.split("role:")[1].trim();
      query = `role=${role}`;
    } else {
      const name = searchTerm.trim();
      query = `nom=${name}`;
    }

    try {
      const response = await axios.get(`${baseURL}/api/user?${query}`);
      setSearchResults(response.data.users); // Update search results state
      console.log(response.data); // Log the search results to the console
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-search">
        <img src={assets.searchIcon} alt="Search Icon" />
        <form onSubmit={handleSearch}>
          {" "}
          {/* Attach the search handler */}
          <input
            type="text"
            placeholder="Rechercher ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
          />
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
          <div className="cell profileA">
            <img
              src={profileImg}
              onClick={() => navigate("/profile")}
              alt="Profile"
            />
          </div>
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* Display search results if available */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((user) => (
            <div key={user._id} className="search-result-item">
              <h5>
                {user.nom} ({user.email}, {user.role})
              </h5>{" "}
              {/* Display user's name, email, and role */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
