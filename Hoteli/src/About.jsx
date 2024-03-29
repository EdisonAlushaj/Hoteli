import React, { Component } from "react";
import Foto from './assets/about.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

class About extends Component {
  render() {
    return (
      <>
      <div className="h">
            <img src={Foto} className="w-100" style={{ height: '50em' }}alt="Cover Image"/>
      </div>
      </>
    );
  }
}

export default About;
