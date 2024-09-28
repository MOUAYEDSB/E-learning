import React from 'react';
import './UserCard.css';
import { assets } from '../../assets/assets';

function UserCard() {
  return (
    <div className="UseCard">
      <div className="profile">
        <div>
        <img className="avatar" src={assets.avatar1} alt="Avatar" />
        </div>
        <div className="profile-text">
          <p className="name">John Cena</p>
          <p className="time">2 days ago</p>
        </div>
      </div>
      <div className="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text.
      </div>
      <div className="rating">
        <img className="stars" src={assets.group176} alt="Rating stars" />
        <span className="rating-value">4.5</span>
      </div>
    </div>
  );
}

export default UserCard;