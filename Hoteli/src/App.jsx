// App.jsx
import React, { useState } from 'react';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import ExternalCSS from './externalCSS';
import Slider from './slider.jsx';
import ImageSelector from './ImageSelector'; // Importimi i ImageSelector
import './App.css';
import './Footer/Footer.css';

function App() {
  const [selectedImage, setSelectedImage] = useState('foto1.jpg');

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <ExternalCSS />
      <Header />
      <Slider selectedImage={selectedImage} />
      <ImageSelector onSelect={handleImageChange} /> {/* Përdorimi i komponentit ImageSelector */}
      <Footer />
    </>
  );
}

export default App;
