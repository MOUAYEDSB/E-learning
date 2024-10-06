import React from "react";
//import Slider from "react-slick";
import "./ListGraines.css"; // Ensure this file exists with proper styling
import { assets } from "../../assets/assets"; // Correct path for your assets

const ListGraines = () => {
  const images = [
    {
      src: assets.pro2, // Correct path for assets
      description: "Image 1 description",
    },
    {
      src: assets.pro3,
      description: "Image 2 description",
    },
    {
      src: assets.pro4,
      description: "Image 3 description",
    },
    {
      src: assets.pro3,
      description: "Image 2 description",
    },
    {
      src: assets.pro2, // Correct path for assets
      description: "Image 1 description",
    }
   
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 images per page
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // Enable automatic navigation
    autoplaySpeed: 3000, // Time interval between slides (in milliseconds)
    responsive: [
      {
        breakpoint: 1024, // Adjust for smaller screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // Adjust for tablet size
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Adjust for mobile size
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container" id="ListGraines">
      <img src={assets.notregraine} className="notregraine" alt="Notre graine" />
      <div className="carousel">
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <div className="image-container">
              <img src={image.src} alt={`Image ${index + 1}`} className="round-image" />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListGraines;
