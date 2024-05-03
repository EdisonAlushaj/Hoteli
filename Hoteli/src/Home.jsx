import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Slider from './Slider/slider.jsx';
import Cover from './Home/cover.jsx';
import SlideR from './3DSlide.jsx';
import './Home.css';
import BookImg from './Rooms/RoomIMG/Room1-1.jpg'

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

      <div className=' d-flex justify-content-center align-items-center'>
        <div className='d-flex justify-content-center align-items-center' style={{position: 'absolute', width: '90%'}}>
          <button className='btn' style={{color: '#fff', backgroundColor: '#b07256', borderRadius: '0', width: '10em', height: '3em', fontSize: '1.2em'}}>BOOK NOW</button>
        </div>

        <img src={BookImg} alt="Booking img" className='BookingIMG'/>
      </div>
    </>
  );
};

export default Home;