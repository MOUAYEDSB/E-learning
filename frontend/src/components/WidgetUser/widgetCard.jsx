// src/components/GrainesAccounts.js

import React from 'react';
import { assets } from '../../assets/assets';
import './widgetCard.css';

const WidgetCard = () => {
  return (
    <div className="graines-accounts-container">
      <img className="background" src={assets.background} alt="background" />
      <div className="icon-order">
        <img src={assets.iconorder} alt="icon order" />
      </div>
      <div className="contentContainer">
        <div className="main-number">200</div>
        <div className="description">Graines Accounts</div>
        <div className="sub-info">
          <div className="sub-info-icon">
            <img src={assets.background2} alt="background 2" />
            <img className="arrow-icon" src={assets.icon} alt="icon" />
          </div>
          <div className="sub-info-text">4% (30 days)</div>
        </div>
      </div>
    </div>
  );
}

export default WidgetCard;
