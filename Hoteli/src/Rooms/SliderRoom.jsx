import React, { useState } from "react";
import "./Rooms.css";

const SliderRoom = ({ images, onNext, onPrev, currentIndex }) => {
    const slides = React.useRef(null);
    const totalSlides = images.length;

    React.useEffect(() => {
        const translateValue = -currentIndex * 100 + '%';
        slides.current.style.transform = `translateX(${translateValue})`;
    }, [currentIndex]);

    return (
        <div className="container-fluid p-0 w-100 position-relative">
            <div className="slider-container w-100 p-0">
                <div className="slides w-100" ref={slides}>
                    {images.map((image, index) => (
                        <div className="slide" key={index}>
                            <img src={image} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>

                <button className="prev" onClick={onPrev}>&#10094;</button>
                <button className="next" onClick={onNext}>&#10095;</button>
            </div>
        </div>
    );
};

export default SliderRoom;