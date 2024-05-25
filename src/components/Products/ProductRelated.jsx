import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductItem from "./ProductItem";
import React from "react";


const ProductRelated = ({productAuctionsRelated = []}) => {

    console.log(productAuctionsRelated);

    const settings = {
        dots: false,
        infinite: productAuctionsRelated.length > 1,
        speed: 200,
        slidesToScroll: 1,
        slidesToShow: Math.min(productAuctionsRelated.length, 4),
        initialSlide: 0,
        autoplay: productAuctionsRelated.length > 1,
        autoplaySpeed: 2000,
        arrows: false,
        cssEase: 'linear',
        touchThreshold: 100,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: Math.min(productAuctionsRelated.length, 4),
                    slidesToScroll: 2
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(productAuctionsRelated.length, 3),
                    slidesToScroll: 1
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: Math.min(productAuctionsRelated.length, 2),
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
                        productAuctionsRelated?.length > 1 ?
                            productAuctionsRelated.map((item) => {
                                return (
                                    <ProductItem key={item?.id} infoAuction={item} type={"itemSlider"}/>
                                )
                            })
                            :
                           <div className='w-[300px]'>
                               <ProductItem key={productAuctionsRelated[0]?.id} infoAuction={productAuctionsRelated[0]}
                                            type={"itemSlider"}/>
                           </div>
                    }
                </Slider>
            </div>
        </>
    )

}

export default ProductRelated;