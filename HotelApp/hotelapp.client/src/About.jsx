import React, { useEffect } from "react";
import Foto from './assets/about.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Foto1 from './image/foto-1.jpg';
import { Row, Col } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import './About-us/about-us.css';


const About = () => {


  return (
    <>
      <div className="h">
        <img src={Foto} className="w-100" style={{ height: '30em', objectFit: "cover" }} alt="Cover Image" />
      </div>
      <h1 className="h1 text-start animated-heading" data="About Us" id="h1" style={{ color: '#b07256',marginLeft:'2.5em' }}>About Us</h1>
      <div className="d-flex justify-content-around align-items-center" style={{ marginTop: '3em' }}>
        <Row>
          <Col xs={5} md={6} className="" style={{ width: '25em', marginLeft: '10em' }}>
            <div style={{ marginLeft: '2em' }}>
              <h1>Our Mission</h1>
              <p>Our hotel, a distinguished accommodation center, aims to provide an excellent experience for every visitor. Located in a splendid setting in the heart of [location], our mission is to offer a warm and welcoming environment, ensuring that every guest feels greeted and cared for. With a continuous commitment to excellent service and attention to detail, we strive to make each visitor's stay memorable. Our dedicated team is here to ensure that every request is addressed with care and to create an exceptional experience for all who choose to stay with us.</p>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <img src={Foto1} alt="Image" className="w-100" style={{ height: '30em', marginLeft: '25em' }} />
          </Col>
        </Row>
      </div>
      <div className="d-flex justify-content-around align-items-center" style={{ marginTop: '5em', marginBottom: '3em' }}>
        <Row>
          <Col xs={5} md={6} className="" style={{ marginLeft: '-5em' }}>
            <img src={Foto1} alt="Image" className="w-100" style={{ height: '30em' }} />
          </Col>
          <Col xs={12} md={4} style={{ width: '25em', marginLeft: '12em', marginTop: '3em' }}>
            <div style={{ marginLeft: '2em' }}>
              <h1>Our Mission</h1>
              <p>Our hotel, a distinguished accommodation center, aims to provide an excellent experience for every visitor. Located in a splendid setting in the heart of [location], our mission is to offer a warm and welcoming environment, ensuring that every guest feels greeted and cared for. With a continuous commitment to excellent service and attention to detail, we strive to make each visitor's stay memorable. Our dedicated team is here to ensure that every request is addressed with care and to create an exceptional experience for all who choose to stay with us.</p>
            </div>
          </Col>
        </Row>
      </div>
      <NavLink to="/Rooms" className="text-decoration-none"> <button className="btn btn-circle">Rooms</button></NavLink>
      <NavLink to="/Menu" className="text-decoration-none"><button className="btn btn-circle">Restaurant</button></NavLink>

    </>
  );
}

export default About;
