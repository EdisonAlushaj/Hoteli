// Slider.jsx
import React, { useState, useEffect } from 'react';
import './slideshow.css';
import foto1 from './foto-1.jpg';
import foto2 from './foto-2.jpg';
import foto3 from './foto-3.jpg';
import foto4 from './foto-4.jpg';

const Slider = () => {
  const images = [foto1, foto2, foto3, foto4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); // Ndryshoni kohën e ndryshimit të imazheve sipas nevojës
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={index === currentImageIndex ? 'active' : ''}
        />
      ))}
    </div>
  );
};

export default Slider;
