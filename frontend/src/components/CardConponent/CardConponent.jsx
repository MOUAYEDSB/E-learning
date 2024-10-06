import React from 'react';
import Card from './Card';
import { assets } from '../../assets/assets';
import './CardConponent.css';

const CardConponent = () => {
  return (
    <div className='CardConponent'>
      <div id='CardConponent' className="container1">
        <div className="heading">
          <div className="heading-title">Heading</div>
          <div className="heading-subtitle">Subheading</div>
        </div>
        <div className="cards">
          <Card icon={assets.info} />
          <Card icon={assets.info2} />
          <Card icon={assets.info3} />
          <Card icon={assets.info4} />
          <Card icon={assets.info5} />
          <Card icon={assets.info6} />
        </div>
      </div>
    </div>
  );
};

export default CardConponent;
