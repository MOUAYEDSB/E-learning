import React, { useState } from 'react';
import './SideBar.css';

const SideBar = ({ setCurrentComponent }) => {
  const [showExtraButtons, setShowExtraButtons] = useState(false);

  const toggleExtraButtons = () => {
    setShowExtraButtons(!showExtraButtons);
  };

  return (
    <div className="admin-users-list">
      <div className="side-bar">
        <div className="graines-2"></div>
        <div className="vector-1"></div>
        <div className="group-37348">
          <div className="container-2">
            <div className="group-53">
              <button className="styled-button" onClick={() => setCurrentComponent('Dashboard')}>
                <div className="vuesaxoutlinecategory">
                  <img className="category" src="assets/vectors/Category3_x2.svg" alt="Category" />
                </div>
                <div className="dashboard">Dashboard</div>
              </button>
            </div>

            <div className="group-6031">
              <button className="styled-button" onClick={() => setCurrentComponent('Home')}>
                <img className="ionicon-hhomedefault" src="assets/vectors/IoniconHhomedefault2_x2.svg" alt="Home" />
                <div className="dashboard">Home</div>
              </button>
            </div>

            <div className="group-51">
              <button className="styled-button" onClick={toggleExtraButtons}>
                <div className="vuesaxlinearprofile-2-user">
                  <img className="profile-2-user" src="assets/vectors/Profile2User2_x2.svg" alt="Users" />
                </div>
                <div className="liste-dutilisateurs">Liste d’utilisateurs</div>
                <div className="vuesaxoutlinearrow-down">
                  <img className="vector-27" src="assets/vectors/Vector5_x2.svg" alt="Arrow Down" />
                </div>
              </button>
              {showExtraButtons && (
                <div className="styles-button">
                  <button className="styled-button4" onClick={() => setCurrentComponent('ListeParents')}>
                    <span className="parents">Parents</span>
                  </button>
                  <button className="styled-button4" onClick={() => setCurrentComponent('ListeGraines')}>
                    <span className="graines">Graines</span>
                  </button>
                  <button className="styled-button4" onClick={() => setCurrentComponent('ListeFormateurs')}>
                    <span className="formateurs">Formateurs</span>
                  </button>
                </div>
              )}
            </div>

            <div className="group-37344">
              <button className="styled-button" onClick={() => setCurrentComponent('Groupes')}>
                <div className="group">
                  <img className="vector" src="assets/vectors/Vector159_x2.svg" alt="Groups" />
                </div>
                <div className="dashboard">Groupes</div>
              </button>
            </div>

            <div className="group-49">
              <button className="styled-button" onClick={() => setCurrentComponent('Messages')}>
                <div className="vuesaxlinearmessage">
                  <img className="message" src="assets/vectors/Message1_x2.svg" alt="Messages" />
                </div>
                <div className="dashboard">Messages</div>
              </button>
            </div>

            <div className="group-601">
              <button className="styled-button" onClick={() => setCurrentComponent('Parametre')}>
                <div className="vuesaxlinearsetting-2">
                  <img className="setting-2" src="assets/vectors/Setting2_x2.svg" alt="Settings" />
                </div>
                <div className="dashboard">Parametre</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
