import React from "react";
import Slider from "react-slick";
import Foto1 from './image/foto-1.jpg'
import Foto2 from './image/foto-2.jpg'
import Foto3 from './image/foto-3.jpg'
import Foto4 from './image/foto-4.jpg'
import Foto5 from './image/foto-5.jpg'
import Foto6 from './image/foto-6.jpg'

function DSlider () {
    var settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <Slider {...settings} >
          <div>
          <img className="img-fluid" width={500} src={Foto1} alt=""/>
          </div>
          <div>
          <img className="img-fluid" width={500} src={Foto2} alt=""/>
          </div>
          <div>
          <img className="img-fluid" width={500} src={Foto3}  alt=""/>
          </div>
          <div>
          <img className="img-fluid" width={500} src={Foto4} alt=""/>
          </div>
          {/* <div>
          <img className="img-fluid"src={Foto5} style={{height:"30em"}} alt=""/>
          </div> */}
          <div>
          <img className="img-fluid" width={500} src={Foto6} alt=""/>
          </div>
        </Slider>
      );
}

export default DSlider;