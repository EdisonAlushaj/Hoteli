import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Slider from './Slider/slider.jsx';
import Cover from './Home/cover.jsx';
import SlideR from './3DSlide.jsx';
import './Home.css';

function Home() {

  return (
    <>
      <Slider />
      <Cover />
      <Container style={{}}>
        <p style={{ fontFamily: 'Roboto Slab, serif', fontSize: '6em', width: '4.3em'}} id='Titulli' className='mb-5'>Amenities</p>
        <Row className="align-items-start">
          <Col>
            <h2 style={{fontFamily: 'Roboto Slab, serif'}} className='mb-4'>Reception 24/7</h2>
            <p style={{color: 'gray'}}>Our friendly staff is at your service</p>
            <p style={{color: 'gray'}}>24 hours a day at the reception.</p>
          </Col>
          <Col>
            <h2 style={{fontFamily: 'Roboto Slab, serif'}} className='mb-4'>Parking</h2>
            <p style={{color: 'gray'}}>Underground parking available for</p>
            <p style={{color: 'gray'}}>our clients, for free, 24 hours a day.</p>
          </Col>
          <Col>
            <h2 style={{fontFamily: 'Roboto Slab, serif'}} className='mb-4'>Restaurant</h2>
            <p style={{color: 'gray'}}>The restaurant, where guests can</p>
            <p style={{color: 'gray'}}>have their breakfast, is located on</p>
            <p style={{color: 'gray'}}>the ground floor.</p>
          </Col>
          <Col>
            <h2 style={{fontFamily: 'Roboto Slab, serif'}} className='mb-4'>Lobby</h2>
            <p style={{color: 'gray'}}>Derand Hotel features a modern</p>
            <p style={{color: 'gray'}}>lobby to warmly welcome its guests</p>
            <p style={{color: 'gray'}}>with comfortable seating.</p>
          </Col>
        </Row>
      </Container>
      <SlideR />
    </>
  );
};

export default Home;