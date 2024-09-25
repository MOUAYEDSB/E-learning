import React from 'react';
import './UserCard.css';
import { assets } from './assets';
//import avatar from './assets/avatar.svg';
//import stars from './assets/group-176.svg';

function UserCard() {
  return (
    <div className="card">
      <div className="profile">
        <img className="avatar" src={assets.avatar2} alt="Avatar" />
        <div className="profile-text">
          <span className="name">John Cena</span>
          <span className="time">2 days ago</span>
        </div>
      </div>
      <div className="content">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text.
      </div>
      <div className="rating">
        <img className={assets.group176} src={stars} alt="Rating stars" />
        <span className="rating-value">4.5</span>
      </div>
    </div>
  );
}

export default UserCard;
