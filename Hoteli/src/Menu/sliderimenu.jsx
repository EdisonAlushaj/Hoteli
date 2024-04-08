import React, { useState } from 'react';
import './slideshow.css';
import foto1 from './foto1.jpg';
import foto2 from './foto2.jpg';
import foto3 from './foto3.jpg';

const TextOverlay = ({ text, top, left, style }) => {
  return (
    <div className="text-overlay" style={{ top, left, ...style }}>
      <p>{text}</p>
    </div>
  );
};

const Slider = ({ onMenuChange }) => {
  const imagesWithText = [
    {
      src: foto1,
      text: "Traditional Spanish dish with a variety of fresh seafood and rice.",
      style: {
        color: '#F5F5F5',
        borderRadius: '5px',
        padding: '10px',
        left: '60%',
        top: '30%',
        fontSize: '47px',
      },
    },
    {
      src: foto2,
      text: "Enjoy refreshing drinks at Ibiza Drinks Bar.",
      style: {
        color: '#F5F5F5',
        borderRadius: '5px',
        padding: '10px',
        left: '50%',
        top: '30%',
        width: '14em',
        height: '17em',
        fontSize: '47px',
      },
    },
    {
      src: foto3,
      text: "Indulge in a selection of coffee and sweet treats.",
      style: {
        color: '#F5F5F5',
        borderRadius: '5px',
        padding: '10px',
        left: '50%',
        top: '30%',
        width: '12em',
        height: '15em',
        fontSize: '50px',
      },
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMenuButtonClick = (index) => {
    setCurrentImageIndex(index);
    onMenuChange(index);
  };

  return (
    <div className="slider">
      {imagesWithText.map(({ src, text, style }, index) => (
        <div key={index}>
          <img src={src} alt={`Slide ${index + 1}`} className={index === currentImageIndex ? 'active' : ''} />
          {currentImageIndex === index && <TextOverlay text={text} top="80%" left="10%" style={style} />}
        </div>
      ))}
      <div className="slider-buttons">
        {imagesWithText.map((_, index) => (
          <button
            key={index}
            className={index === currentImageIndex ? 'active' : ''}
            onClick={() => handleMenuButtonClick(index)}
          >
            {index === 2 ? 'Coffee & More' : index === 0 ? 'Food' : 'Drinks'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
