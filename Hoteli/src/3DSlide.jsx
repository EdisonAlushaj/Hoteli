import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './3DSlide.css'

import Foto1 from './image/foto-1.jpg'
import Foto2 from './image/foto-2.jpg'
import Foto3 from './image/foto-3.jpg'
import Foto4 from './image/foto-4.jpg'
import Foto5 from './image/foto-5.jpg'
import Foto6 from './image/foto-6.jpg'

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules"



function Slide() {
    return (
        <>

            <div className="container">
                <div className="heading"><p style={{ fontFamily: 'Roboto Slab, serif', fontSize: '5em', color: '#ccc1bd'}}>Hotel Gallery</p></div>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={
                        {
                            rotate: 0
                            ,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }
                    }
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        clickable: true
                    }}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className='swiper_conatiner'
                >
                    <SwiperSlide>
                        <img className="img-fluid" width={500} src={Foto1} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="img-fluid" width={500} src={Foto2} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="img-fluid" width={500} src={Foto3} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className="img-fluid" width={500} src={Foto4} alt="" />
                    </SwiperSlide>
                    {/* <SwiperSlide>
                <img className="img-fluid" width={500} src={Foto5} alt=""/>
                </SwiperSlide> */}
                    <SwiperSlide>
                        <img className="img-fluid" width={500} src={Foto6} alt="" />
                    </SwiperSlide>
                    {/* <div className="slider-controler">
                        <div className="swiper-button-prev slider-arrow">
                            <div className="arrow-icon"></div>
                        </div>
                        <div className="swiper-button-next slider-arrow">
                            <div className="arrow-icon"></div>
                        </div>
                        <div className="swiper-pagination">
                        </div>
                    </div> */}
                    <div className="swiper-pagination"></div>
                </Swiper>

            </div>
        </>
    );
}

export default Slide;