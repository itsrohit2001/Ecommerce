import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
//import slide from './slide';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import Slide from "./slide";

function Hero() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>{<Slide isFirstSlide={true} />}</SwiperSlide>
        <SwiperSlide>
          {<Slide isFirstSlide={false} name={"This is the second slide"} />}
        </SwiperSlide>
        <SwiperSlide>{<Slide isFirstSlide={false} />}</SwiperSlide>
      </Swiper>
    </>
  );
}

export default Hero;
