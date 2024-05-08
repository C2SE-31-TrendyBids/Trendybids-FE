import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageGallery from "../ImageGallery/ImageGallery";

const ImagesComp = ({images = []}) => {
    const [showGallery, setShowGallery] = useState(false)
    const [selectedImg, setSelectedImg] = useState({})
    const [thisImage, setThisImage] = useState({})
    const [listImg, setListImg] = useState([])

    const settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: images?.length < 5 ? images?.length : 5,
        slidesToScroll: 1,
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
                    slidesToShow: images?.length < 4 ? images?.length : 4,
                    slidesToScroll: 2
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: images?.length < 3 ? images?.length : 3,
                    slidesToScroll: 1
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: images?.length < 2 ? images?.length : 2,
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


    useEffect(() => {
        if (images.length > 0) {
            setThisImage(images[0])
        }
    }, [images])


    const handleShowGallery = () => {
        const imagesCustom = images.map(image => {
                return {
                    id: image.id,
                    url: image.prdImageURL
                }
            }
        );
        setListImg(imagesCustom)
        setShowGallery(true);
    }

    console.log(images)

    return (
        <div className="w-full">
            <div className="rounded w-full h-[500px] shadow overflow-hidden">
                <img className="rounded w-full h-full object-cover transition-all hover:cursor-pointer hover:scale-110"
                     onClick={handleShowGallery}
                     src={thisImage?.prdImageURL}
                     alt={thisImage?.id}/>
            </div>
            {images.length > 1 &&
                <div className="my-5">
                    <Slider {...settings}>
                        {
                            images.map((image, index) => {
                                return (
                                    <div key={image.id} className="pr-5">
                                        <img onMouseOver={() => setThisImage(image)}
                                             className="w-full h-[110px] object-cover rounded transition-all hover:border-2 hover:border-primaryColor hover:cursor-pointer"
                                             src={image.prdImageURL} alt={image.id}/>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            }
            {showGallery && <ImageGallery images={listImg} selectedImg={selectedImg}
                                          setShowGallery={setShowGallery}/>}
        </div>
    )
}

export default ImagesComp