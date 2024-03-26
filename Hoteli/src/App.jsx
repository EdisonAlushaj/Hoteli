// App.jsx
import React, { useState } from 'react';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import ExternalCSS from './externalCSS';
import Slider from './Slider/slider.jsx';
import './App.css';
import './Footer/Footer.css';

function App() {
  return (
    <>
      <ExternalCSS />
      <Header />
      <Slider />
      
      <Footer />
    </>
  );
}

export default App;
