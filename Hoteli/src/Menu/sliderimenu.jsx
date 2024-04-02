import React, { useState, useEffect } from 'react';
import './slideshow.css';
import foto1 from './foto1.jpg';
import foto2 from './foto2.jpg';
import foto3 from './foto3.jpg';

const TextOverlay = ({ text, top, left }) => {
  return (
    <div className="text-overlay" style={{ top, left }}>
      <p>{text}</p>
    </div>
  );
};

const Slider = () => {
  const imagesWithText = [
    { src: foto1, text: "Traditional Spanish dish with a variety of fresh seafood and rice." },
    { src: foto2, text: "Enjoy refreshing drinks at Ibiza Drinks Bar." },
    { src: foto3, text: "Indulge in a selection of coffee and sweet treats." },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === imagesWithText.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevButtonClick = () => {
    const newIndex = currentImageIndex === 0 ? imagesWithText.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const handleNextButtonClick = () => {
    const newIndex = currentImageIndex === imagesWithText.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="slider">
      <button className="prev" onClick={handlePrevButtonClick}>
        {currentImageIndex === 0 ? '' : ''}
      </button>
      {imagesWithText.map(({ src, text }, index) => (
        <div key={index}>
          <img src={src} alt={`Slide ${index + 1}`} className={index === currentImageIndex ? 'active' : ''} />
          {currentImageIndex === index && <TextOverlay text={text} top="80%" left="10%" />}
        </div>
      ))}
      <button className="next" onClick={handleNextButtonClick}>
        {currentImageIndex === 1 ? 'Drinks' : ''}
      </button>
      <div className="slider-buttons">
        {imagesWithText.map((_, index) => (
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
