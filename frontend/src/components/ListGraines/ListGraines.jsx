import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import "./ListGraines.css"; // Create this CSS file for styling
import { assets } from "../../assets/assets";

const ListGraines = () => {
  const images = [
    {
      src: "./src/assets/pro_2.png",
      description: "Image 1 description",
    },
    {
      src: "./src/assets/pro_3.png",
      description: "Image 2 description",
    },
    {
      src: "./src/assets/pro_4.png",
      description: "Image 3 description",
    },
    {
      src: "./src/assets/pro_2.png",
      description: "Image 4 description",
    },
    {
      src: "./src/assets/pro_3.png",
      description: "Image 5 description",
    },
    {
      src: "./src/assets/pro_4.png",
      description: "Image 6 description",
    },
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
      <img src={assets.notregraine} className="notregraine"/>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <div className="image-container">
              <img src={image.src} alt={`Image ${index + 1}`} className="round-image" />
            </div>
            <p className="description"></p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ListGraines;