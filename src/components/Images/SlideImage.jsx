import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageGallery from "../ImageGallery/ImageGallery";
import logo from "../../assets/images/logo.jpg";

const SlideImage = ({images = []}) => {
    const [showGallery, setShowGallery] = useState(false)
    const [selectedImg, setSelectedImg] = useState({})
    const [listImg, setListImg] = useState([])


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

    const handleShowGallery = () => {
        const imagesCustom = images.map(image => {
                return {
                    id: image?.id,
                    url: image?.prdImageURL
                }
            }
        );
        setListImg(imagesCustom)
        setShowGallery(true);
    }


    return (
        <div className="w-full">
            {images.length > 1 ? (
                <Slider {...settings}>
                    {images.map((image) => (
                        <div key={image.id} className="rounded w-full h-[500px] shadow overflow-hidden">
                            <img
                                onClick={handleShowGallery}
                                className="rounded w-full h-full object-cover transition-all hover:cursor-pointer hover:scale-110"
                                src={image?.prdImageURL} alt={image?.id}
                            />
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="rounded w-full h-[500px] shadow overflow-hidden">
                    <img
                        onClick={handleShowGallery}
                        className="rounded w-full h-full object-cover transition-all hover:cursor-pointer hover:scale-110"
                        src={images[0]?.prdImageURL || ""} alt={images[0]?.id || ""}
                        onError={(e) => { e.target.onerror = null; e.target.src = logo; }}
                    />
                </div>
            )}
            {showGallery && <ImageGallery images={listImg} selectedImg={selectedImg} setShowGallery={setShowGallery}/>}
        </div>
    )
}

export default SlideImage