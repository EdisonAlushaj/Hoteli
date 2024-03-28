import React, { useState, useEffect } from 'react';
import Slider from './Slider/slider.jsx';
import Cover from './Home/cover.jsx';

function Home (){
  return (
    <>
      <Slider />
      <Cover />
    </>
  );
};

export default Home;