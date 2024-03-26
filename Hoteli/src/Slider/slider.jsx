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
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (newIndex) => {
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentImageIndex(newIndex);
    }
  };

  const handlePrevButtonClick = () => {
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const handleNextButtonClick = () => {
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

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
      <div className="slider-buttons">
        {images.map((_, index) => (
          <button
            key={index}
            className={index === currentImageIndex ? 'active' : ''}
            onClick={() => handleButtonClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
