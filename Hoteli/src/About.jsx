import React, { Component } from "react";
import Foto from './assets/about.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

class About extends Component {
  render() {
    return (
      <>
        <div className="h">
          <img src={Foto} className="w-100" style={{ height: '50em' }} alt="Cover Image" />
        </div>
        <h1 className="h1 fade-in-left" style={{ color: '#b07256' }}>About Us</h1>
        <textarea name="" id="" cols="100" rows="10" style={{ border: 0 }}>Perched majestically in the center of the city, our hotel stands as a testament to Prishtina’s rich tapestry of history and its dynamic future. A seamless blend of modern elegance and cherished traditions, our seven-story haven invites guests to experience the best of both worlds.
          As you step into our world, you’ll find yourself enveloped in an atmosphere that seamlessly fuses the allure of contemporary sophistication with the echoes of a cultural heritage that stretches back in time. Our commitment to you is nothing short of delivering an experience that exceeds your expectations – a promise that finds its roots in Prishtina’s very soul.
          At the heart of our ethos is an unwavering commitment to provide you with an essence of
          luxury. This pledge is more than just a statement; it is a lived experience. Every interaction, every service, and every gesture by our dedicated team is meticulously crafted to immerse you in a</textarea>
      </>
    );
  }
}

export default About;
