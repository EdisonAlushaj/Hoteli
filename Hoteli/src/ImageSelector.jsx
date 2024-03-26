import React from 'react';

const ImageSelector = ({ onSelect }) => {
  const handleImageChange = (image) => {
    onSelect(image);
  };

  return (
    <div>
      <button onClick={() => handleImageChange('foto1.jpg')}>Foto 1</button>
      <button onClick={() => handleImageChange('foto2.jpg')}>Foto 2</button>
      <button onClick={() => handleImageChange('foto3.jpg')}>Foto 3</button>
      <button onClick={() => handleImageChange('foto4.jpg')}>Foto 4</button>
    </div>
  );
};

export default ImageSelector;