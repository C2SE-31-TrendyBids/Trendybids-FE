import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlideImage = ({images = []}) => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        cssEase: 'linear',
        touchThreshold: 100,
    };

    return (
        <div className="w-full">
            <Slider {...settings}>
                {
                    images.map((image) => {
                        return (
                            <div key={image.id} className="rounded w-full h-[500px] shadow overflow-hidden">
                                <img
                                    className="rounded w-full h-full object-cover transition-all hover:cursor-pointer hover:scale-110"
                                    src={image.prdImageURL} alt={image.id}/>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default SlideImage