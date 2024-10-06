import React from 'react';
import './Testimonial.css'; // Importing the CSS
import { assets } from '../../assets/assets';

const Testimonial = () => {
  return (
    <div className="testimonial-container">
      <div className="testimonial-content">
        <img 
          src={assets.avatar1}
          alt="Person Avatar"
          className="testimonial-avatar"
        />
        <div className="testimonial-text">
          <p className="testimonial-quote">
            "Those tutorials are concise and go straight to the point. I can’t think of a better place to learn while smiling. And it’s so fun!"
          </p>
          <p className="testimonial-name">Person Name</p>
          <p className="testimonial-title">Weather Presenter</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
