import React, { useState, useEffect } from 'react';
import './slideshow.css';
import foto1 from './foto1.jpg';
import foto2 from './foto2.jpg';
import foto3 from './foto3.jpg';


const Slider = () => {
  const images = [foto1, foto2, foto3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000); 
    return () => clearInterval(interval);
  }, []);

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
      <button className="prev" onClick={handlePrevButtonClick}>{currentImageIndex === 0 ? 'Food' : 'Drinks'}</button>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={index === currentImageIndex ? 'active' : ''}
        />
      ))}
      <button className="next" onClick={handleNextButtonClick}>{currentImageIndex === 0 ? 'Drinks' : 'Coffee & More'}</button>
      <div className="slider-buttons">
        {images.map((_, index) => (
          <button
            key={index}
            className={index === currentImageIndex ? 'active' : ''}
            onClick={() => setCurrentImageIndex(index)}
          >
            {index === 2 ? 'Coffee & More' : index === 0 ? 'Food' : 'Drinks'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
