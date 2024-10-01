import React, { useState } from 'react';
import './NavigationBar.css';

const NavigationBar = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track the active nav item

  const navItems = [
    { name: "Home", link: "#HeaderImage" },
    { name: "À propos", link: "#ListItem" },
    { name: "Contact", link: "#ContactPage" },
    { name: "Graines", link: "#ListGraines" }
  ];

  return (
    <div className='NavigationBar' style={{ display: 'flex', gap: '8px', padding: '16px' }}>
      {navItems.map((item, index) => (
        <a 
          href={item.link}
          key={index}
          className={activeIndex === index ? 'selected' : ''}
          onClick={() => setActiveIndex(index)} // Set the active item on click
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: activeIndex === index ? '#fff' : 'transparent',
            color: '#1e1e1e',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '100%'
          }}>
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default NavigationBar;
