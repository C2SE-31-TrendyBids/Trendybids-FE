import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductItem from "./ProductItem";
import React from "react";


const ProductRelated = ({productAuctionsRelated = []}) => {

    console.log(productAuctionsRelated);

    const settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToScroll: 1,
        slidesToShow: 4,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        cssEase: 'linear',
        touchThreshold: 100,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: productAuctionsRelated?.length < 4 ? productAuctionsRelated?.length : 4,
                    slidesToScroll: 2
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: productAuctionsRelated?.length < 3 ? productAuctionsRelated?.length : 3,
                    slidesToScroll: 1
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: productAuctionsRelated?.length < 2 ? productAuctionsRelated?.length : 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
        <>
            <h1 className="text-xl font-bold">Relative Products</h1>
            <div className="gap-5 mt-5">
                <Slider {...settings}>
                    {
                        productAuctionsRelated.map((item) => {
                            return (
                                    <ProductItem key={item?.id} infoAuction={item} type={"itemSlider"}/>
                            )
                        })
                    }
                </Slider>
            </div>
        </>
    )

}

export default ProductRelated;