import React from 'react';
import './HeaderImage.css';
import NavigationBar from './NavigationBar';

import { NavLink, useNavigate } from 'react-router-dom';
const HeaderImage = () => (
  <div className="headerImage"id='HeaderImage'>
    {/*<img src={assets.group37356} alt="Header" style={{ width: '100%' }} /> */}
    <NavigationBar />
    <NavLink exact to='/login'>
    <button className='ConnectButton' style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 24px',
      backgroundColor: '#2e294e',
      borderRadius: '8px',
      border: '1px solid #2c2c2c',
      cursor: 'pointer'
    }}>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '100%',
        color: '#f5f5f5'
      }}>
        Se Connecter
      </span>
    </button>
    </NavLink>
  </div>
);

export default HeaderImage;
