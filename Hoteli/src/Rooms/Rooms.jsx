import React, { useState } from "react";
import Slider from "./SliderRoom";
import CoverImg from "./RoomIMG/room-cover.jpg";
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

const RoomMain = ({ roomId, imageUrls, title, description, capacity, size }) => {

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
      {roomId % 2 === 1 ? (
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
        <p className="fs-1 w-75 text-start">{title}</p>
        <p className="text-sm-start">Capacity: {capacity}</p>
        <p className="text-start">Size: {size}</p>
        <p className="text-xl-start">{description}</p>

        <button type="button" className="btn">
          VIEW MORE
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
        <p className="fs-1 w-75 text-start">{title}</p>
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

  return (
    <>
      <div className="cover d-flex justify-content-center align-items-center">
        <p className="text-center fs-1 position-absolute" style={{ color: "#fff" }}>
          Rooms
        </p>

        <img src={CoverImg} className="img-fluid d-block" alt="Cover Image" />
      </div>

      {/* Replace the existing Room-main divs with the new RoomMain component */}
      <RoomMain
        roomId={1}
        title="Superior Double Room"
        description="Experience understated luxury inour Superior Double Bed Room. Elegantly designed with a harmonious blend of comfort and style, this space boasts a plush double bed, premium amenities, and a captivating view."
        capacity="1-2 PERSONS"
        size="22M2"
        imageUrls={superiorDoubleRoomImages}
      />

      <RoomMain
        roomId={2}
        title="Superior Twin Room"
        description="Experience the essence of comfort in our Standard Double Room. Tastefully designed with a cozy ambiance, this space offers a comfortable double bed, essential amenities, and a serene atmosphere to unwind."
        capacity="1-2 PERSONS"
        size="20M2"
        imageUrls={superiorTwinRoomImages}
      />

      <RoomMain
        roomId={3}
        title="Deluxe Double Room"
        description="Experience the essence of comfort in our Standard Double Room. Tastefully designed with a cozy ambiance, this space offers a comfortable double bed, essential amenities, and a serene atmosphere to unwind."
        capacity="1-2 PERSONS"
        size="20M2"
        imageUrls={deluxeDoubleRoomImages}
      />

      <RoomMain
        roomId={4}
        title="Premium Double Room"
        description="Experience the essence of comfort in our Standard Double Room. Tastefully designed with a cozy ambiance, this space offers a comfortable double bed, essential amenities, and a serene atmosphere to unwind."
        capacity="1-2 PERSONS"
        size="20M2"
        imageUrls={premiumDoubleRoomImages}
      />

      <RoomMain
        roomId={5}
        title="Junior Suite"
        description="Experience the essence of comfort in our Standard Double Room. Tastefully designed with a cozy ambiance, this space offers a comfortable double bed, essential amenities, and a serene atmosphere to unwind."
        capacity="1-2 PERSONS"
        size="20M2"
        imageUrls={juniorSuiteImages}
      />
    </>
  );
};

export default Rooms;