import React, { useState, useEffect } from 'react';
import Slider from './Slider/slider.jsx';
import Cover from './Home/cover.jsx';
// import Slider3D from './3DSlider.jsx'
import SlideR from './3DSlide.jsx'

function Home (){
  return (
    <>
      <Slider />
      <Cover />
      
      <SlideR/>
    </>
  );
};

export default Home;