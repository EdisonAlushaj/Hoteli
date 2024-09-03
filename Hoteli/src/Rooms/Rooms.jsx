import React, { useState, useEffect } from "react";
import Slider from "./SliderRoom";
import CoverImg from "./RoomIMG/room-cover.jpg";
import { RoomEndPoint } from '../endpoints';
import Booking from '../Booking/RoomBooking.jsx';
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import Cookies from '../cookieUtils';

import foto1 from "./RoomIMG/Room1-1.jpg";
import foto2 from "./RoomIMG/Room1-2.jpg";
import foto3 from "./RoomIMG/Room1-3.jpg";
import foto4 from "./RoomIMG/Room1-4.jpg";
import foto5 from "./RoomIMG/Room1-5.jpg";

import foto6 from "./RoomIMG/Room2-1.jpg";
import foto7 from "./RoomIMG/Room2-2.jpg";
import foto8 from "./RoomIMG/Room2-3.jpg";
import foto9 from "./RoomIMG/Room2-4.jpg";
import foto10 from "./RoomIMG/Room2-5.jpg";

import foto11 from "./RoomIMG/Room3-1.jpg";
import foto12 from "./RoomIMG/Room3-2.jpg";
import foto13 from "./RoomIMG/Room3-3.jpg";
import foto14 from "./RoomIMG/Room3-4.jpg";
import foto15 from "./RoomIMG/Room3-5.jpg";

import foto16 from "./RoomIMG/Room4-1.jpg";
import foto17 from "./RoomIMG/Room4-2.jpg";
import foto18 from "./RoomIMG/Room4-3.jpg";
import foto19 from "./RoomIMG/Room4-4.jpg";
import foto20 from "./RoomIMG/Room4-5.jpg";

import foto21 from "./RoomIMG/Room5-1.jpg";
import foto22 from "./RoomIMG/Room5-2.jpg";
import foto23 from "./RoomIMG/Room5-3.jpg";
import foto24 from "./RoomIMG/Room5-4.jpg";
import foto25 from "./RoomIMG/Room5-5.jpg";
import "./Rooms.css";

const RoomMain = ({ row, roomId, imageUrls, title, description, capacity, size }) => {

  const [currentIndex, setCurrentIndex] = useState(0);


  const handleNextClick = () => {
    if (currentIndex < imageUrls.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(imageUrls.length - 1);
    }
  };
  return (
    <>
      {row % 2 === 1 ? (
        <LayoutOne
          title={title}
          capacity={capacity}
          size={size}
          description={description}
          imageUrls={imageUrls}
          currentIndex={currentIndex}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      ) : (
        <LayoutTwo
          title={title}
          capacity={capacity}
          size={size}
          description={description}
          imageUrls={imageUrls}
          currentIndex={currentIndex}
          handleNextClick={handleNextClick}
          handlePrevClick={handlePrevClick}
        />
      )}
    </>
  );
};

// LayoutOne component
const LayoutOne = ({ title, capacity, size, description, imageUrls, currentIndex, handleNextClick, handlePrevClick }) => {
  return (
    <div className="room-main container-fluid w-100 p-0 pb-5 m-0 gap-3">
      <div className="slider-main slider-container p-0">
        <Slider
          images={imageUrls}
          onNext={handleNextClick}
          onPrev={handlePrevClick}
          currentIndex={currentIndex}
        />
      </div>

      <div className="room-text container-fluid border border-black border-opacity-25 d-flex flex-column justify-content-center align-items-start p-5" style={{ width: "35%" }}>
        <p className="w-75 text-start" style={{ fontSize: '2.5em' }}>{title}</p>
        <p className="text-sm-start">Capacity: {capacity}</p>
        <p className="text-start">Size: {size}</p>
        <p className="text-xl-start">{description}</p>

        <button type="button" className="btn">
          <NavLink style={{ color: "black" }} to="/booking">View More</NavLink>
        </button>
      </div>
    </div>
  );
};

// LayoutTwo component
const LayoutTwo = ({ title, capacity, size, description, imageUrls, currentIndex, handleNextClick, handlePrevClick }) => {
  return (
    <div className="room-main container-fluid w-100 p-0 pb-5 m-0 gap-3">
      <div className="room-text container-fluid border border-black border-opacity-25 d-flex flex-column justify-content-center align-items-start p-5" style={{ width: "35%" }}>
        <p className="w-75 text-start" style={{ fontSize: '2.5em' }}>{title}</p>
        <p className="text-sm-start">Capacity: {capacity}</p>
        <p className="text-start">Size: {size}</p>
        <p className="text-xl-start">{description}</p>

        <button type="button" className="btn">
          VIEW MORE
        </button>
      </div>

      <div className="slider-main slider-container p-0">
        <Slider
          images={imageUrls}
          onNext={handleNextClick}
          onPrev={handlePrevClick}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
};

const Rooms = () => {
  const superiorDoubleRoomImages = [foto1, foto2, foto3, foto4, foto5];
  const superiorTwinRoomImages = [foto6, foto7, foto8, foto9, foto10];
  const deluxeDoubleRoomImages = [foto11, foto12, foto13, foto14, foto15];
  const premiumDoubleRoomImages = [foto16, foto17, foto18, foto19, foto20];
  const juniorSuiteImages = [foto21, foto22, foto23, foto24, foto25];

  const [roomsItems, setRooms] = useState([]);

  const getToken = () => {
    return Cookies.getTokenFromCookies(); // Assuming you stored the JWT in a cookie named 'token'
  }

  const fetchRooms = async () => {
    try {
      const response = await fetch('https://localhost:7189/api/Room', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <div className="cover d-flex justify-content-center align-items-center">
        <p className="text-center position-absolute" style={{ fontFamily: 'Roboto Slab, serif', fontSize: '5em', color: '#fff' }}>
          Rooms
        </p>

        <img src={CoverImg} className="img-fluid d-block" alt="Cover Image" />
      </div>
      {
        roomsItems.map((roomItem, index) => (
          <RoomMain
            key={index}
            row={index + 1}
            roomId={roomItem.Id}
            title={roomItem.roomName}
            description={roomItem.description}
            capacity={roomItem.capacity}
            size={roomItem.size}
            imageUrls={[roomItem.image]}
          />
        ))
      }

    </>
  );
};

export default Rooms;
