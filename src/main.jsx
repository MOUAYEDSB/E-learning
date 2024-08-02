import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import SideBar from './components/SideBar/SideBar.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Dashbord from './components/Dashbord/Dashbord.jsx';
import Groupes from './components/Groupes/Groupes.jsx';
import Home from './components/Home/Home.jsx';
import ListeFormateurs from './components/ListeFormateurs/ListeFormateurs.jsx';
import ListeParents from './components/ListeParents/ListeParents.jsx';
import ListeGraines from './components/ListeGraines/ListeGraines.jsx';
import Messages from './components/Messages/Messages.jsx';
import Parametre from './components/Parametre/Parametre.jsx';
import Calendar from './components/Calendar/Calendar.jsx';
import Notifications from './components/Notifications/Notifications.jsx';
import Profile from './components/Profile/Profile.jsx';

const App = () => {
  const [currentComponent, setCurrentComponent] = useState(null);

  const renderComponent = () => {
    switch (currentComponent) {
      case 'Dashboard':
        return <Dashbord />;
      case 'Home':
        return <Home />;
      case 'Groupes':
        return <Groupes />;
      case 'ListeFormateurs':
        return <ListeFormateurs />;
      case 'ListeParents':
        return <ListeParents />;
      case 'ListeGraines':
        return <ListeGraines />;
      case 'Messages':
        return <Messages />;
      case 'Parametre':
        return <Parametre />;
      case 'Parametre':
          return <Parametre />;
      case 'Profile':
        return <Profile />;
        case 'Notifications':
        return <Notifications />;
        case 'Calendar':
        return <Calendar />;  
      default:
        return <div className="admin-users-list"><div className="container-1"><div>Select a component from the sidebar or navbar</div></div></div>  
    }
  };

  return (
    <React.StrictMode>
      <NavBar setCurrentComponent={setCurrentComponent} userImage="assets/images/Image1.png" />
        <SideBar setCurrentComponent={setCurrentComponent} />
        <div style={{ flex: 1, padding: '20px' }}>
          {renderComponent()}
        </div>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
