import React, { Component } from "react";
import CoverImg from './assets/room-cover.jpg';

class Rooms extends Component {
    render() {
      return (
      <>
        <div className="">
          <img src={CoverImg} class="img-fluid" style={{marginTop: "10em", width: "100%", height: "10em"}} alt="Cover Image"/>
        </div>
      </>
      );
    }
  }
  
export default Rooms;