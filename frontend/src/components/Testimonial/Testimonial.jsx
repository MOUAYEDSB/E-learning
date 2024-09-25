import React from 'react';
import { assets } from '../../assets/assets';

const Testimonial = () => {
  return (
    <div style={{
      backgroundColor: '#ff007b', // Set the background color to pink
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '50px 20px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        borderRadius: '8px',
        maxWidth: '946px'
      }}>
        <img 
          src={assets.avatar1}
          alt="Person Avatar"
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            marginRight: '20px'
          }}
        />
        <div style={{
          color: '#fff'
        }}>
          <p style={{
            fontSize: '22px',
            lineHeight: '33.6px',
            marginBottom: '16px',
            fontFamily: 'Source Sans Pro, sans-serif'
          }}>
            « Those tutorials are concise and go straight to the point. I can’t think of a better place to learn smiling. And it’s so fun!
          </p>
          <p style={{
            fontSize: '22px',
            lineHeight: '33.6px',
            fontWeight: '700',
            marginBottom: '8px',
            fontFamily: 'Source Sans Pro, sans-serif'
          }}>
            Person Name
          </p>
          <p style={{
            fontSize: '22px',
            lineHeight: '33.6px',
            fontStyle: 'italic',
            fontFamily: 'Source Sans Pro, sans-serif'
          }}>
            weather presenter
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
