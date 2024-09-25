import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './FilterPeriodeButton.css';

const FilterPeriodeButton = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('11 April 2024 - 21 May 2024');

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (period) => {
    setSelectedPeriod(period);
    setDropdownOpen(false);
  };

  return (
    <div className="filter-periode-button">
      <div className="icon-and-background">
        <img src={assets.rectangle147} className="icon-background" alt="icon background" />
        
      </div>
      <div className="text-group">
        <span className="filter-text">Filter Periode</span>
        <span className="date-text">{selectedPeriod}</span>
      </div>
      <img
        src={assets.arrowdown1}  // renamed from icon2 to dropdownIcon
        className="dropdown-icon"
        alt="dropdown"
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="dropdown-options">
          <div onClick={() => handleOptionClick('7 Days')}>7 Days</div>
          <div onClick={() => handleOptionClick('15 Days')}>15 Days</div>
          <div onClick={() => handleOptionClick('30 Days')}>30 Days</div>
        </div>
      )}
    </div>
  );
};

export default FilterPeriodeButton;
