import React, { useState } from "react";
import Slider from "./SliderRoom";
import CoverImg from "./assets/room-cover.jpg";
import foto1 from "./assets/about.jpg";
import foto2 from "./assets/about.jpg";
import foto3 from "./assets/about.jpg";
import "./Rooms.css";

const RoomMain = ({ imageUrls, title, description, capacity, size }) => {
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
    <div className="room-main container-fluid w-100 p-0 pb-5 m-0 gap-3">
      <div className="slider-main slider-container p-0">
        <Slider
          images={imageUrls}
          onNext={handleNextClick}
          onPrev={handlePrevClick}
          currentIndex={currentIndex}
        />
      </div>

      <div className="room-text container-fluid border border-black border-opacity-25 d-flex flex-column justify-content-center align-items-start p-5" style={{ width: "35%"}}>
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

const Rooms = () => {
  const superiorDoubleRoomImages = [foto1, foto2, foto3];
  const standardDoubleRoomImages = [foto2, foto3, foto1];

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
        title="Superior Double Room"
        description="Experience understated luxury inour Superior Double Bed Room. Elegantly designed with a harmonious blend of comfort and style, this space boasts a plush double bed, premium amenities, and a captivating view."
        capacity="1-2 PERSONS"
        size="22M2"
        imageUrls={superiorDoubleRoomImages}
      />

      <RoomMain
        title="Standard Double Room"
        description="Experience the essence of comfort in our Standard Double Room. Tastefully designed with a cozy ambiance, this space offers a comfortable double bed, essential amenities, and a serene atmosphere to unwind."
        capacity="1-2 PERSONS"
        size="20M2"
        imageUrls={standardDoubleRoomImages}
      />
      
      <RoomMain
        title="Standard Double Room"
        description="Experience the essence of comfort in our Standard Double Room. Tastefully designed with a cozy ambiance, this space offers a comfortable double bed, essential amenities, and a serene atmosphere to unwind."
        capacity="1-2 PERSONS"
        size="20M2"
        imageUrls={standardDoubleRoomImages}
      />
      
      <RoomMain
        title="Standard Double Room"
        description="Experience the essence of comfort in our Standard Double Room. Tastefully designed with a cozy ambiance, this space offers a comfortable double bed, essential amenities, and a serene atmosphere to unwind."
        capacity="1-2 PERSONS"
        size="20M2"
        imageUrls={standardDoubleRoomImages}
      />
    </>
  );
};

export default Rooms;