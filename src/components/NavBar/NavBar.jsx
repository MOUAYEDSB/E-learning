import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './NavBar.css';

const NavBar = ({ setCurrentComponent, userImage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.vuesaxlinearprofil-1')) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <div className="admin-users-list">
      <div className="container-4">
        
        <div className="group-598">
          <div className="vuesaxtwotonesearch-normal">
            <button className='styled-button3'>
              <img className="search-normal" src="assets/vectors/SearchNormal13_x2.svg" alt="Search"/>
            </button>  
          </div>
          <input type='text' className='custom-input' placeholder="Search..." />
        </div>

        <div className="container-3">
          <div className="group-640">
            <div className="vuesaxlinearcalendar-2">
              <button className='styled-button2' onClick={() => setCurrentComponent('Calendar')}>
                <img className="calendar-2" src="assets/vectors/Calendar27_x2.svg" alt="Calendar"/>
              </button>
            </div>

            <div className="vuesaxlinearnotification">
              <button className='styled-button2' onClick={() => setCurrentComponent('Notifications')}>
                <img className="vuesaxlinearnotification-1" src="assets/vectors/Vuesaxlinearnotification8_x2.svg" alt="Notification"/>
              </button>
            </div>

            <div className="vuesaxlinearprofil-1 relative">
              <img 
                className="user-profile-image" 
                src={userImage} 
                alt="User" 
                onClick={toggleMenu} 
              />
              {isMenuOpen && (
                <div className='menu-container absolute bg-white rounded-lg shadow w-32 top-full right-0 mt-2'>
                  <button className='menu-button' onClick={() => setCurrentComponent('Profile')}>Profile</button>
                  <button className='menu-button' onClick={() => setCurrentComponent('Parametre')}>Settings</button>
                  <button className='menu-button'>Log Out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
