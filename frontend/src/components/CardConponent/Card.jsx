import React from 'react';
import './Card.css';

const Card = ({ icon }) => {
  return (
    <div className="card">
      <img src={icon} alt="Info icon" className="card-icon" />
      <div className="card-content">
        <div className="card-title">Title</div>
        <div className="card-body">
          Body text for whatever you’d like to say. Add main takeaway points,
          quotes, anecdotes, or even a very very short story.
        </div>
      </div>
    </div>
  );
};

export default Card;