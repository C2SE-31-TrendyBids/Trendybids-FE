import React, {useEffect, useState} from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { IoClose } from "react-icons/io5";

const ImageGallery = ({images = [], selectedImg = {}, setShowGallery}) => {
    const [currentImage, setCurrentImage] = useState(selectedImg)
    const [currentIndex, setCurrentIndex] = useState(selectedImg.id ? images.findIndex((img) => img.id === selectedImg.id) : 0);
    const [imgPreview, setImgPreview] = useState(images);

    const displayedImg= 15;

    useEffect(() => {
        if (images.length > 0) {
            setCurrentImage(images[currentIndex]);
            updateImgPreview();
        }
    }, [currentIndex, images]);

    const handleNext = () => {
        setCurrentIndex(prevIndex => {
            if (prevIndex === images.length - 1) {
                return prevIndex;
            } else {
                return (prevIndex + 1) % images.length;
            }
        });
    };

    const handlePrev = () => {
        setCurrentIndex(prevIndex => {
            if (prevIndex === 0) {
                return prevIndex;
            } else {
                return (prevIndex - 1 + images.length) % images.length;
            }
        });
    };

    const updateImgPreview = () => {
        let start = currentIndex - Math.floor(displayedImg / 2);
        let end = start + displayedImg;

        if (start < 0) {
            end -= start; // add the negative start to the end
            start = 0; // set start to 0
        }

        if (end > images.length) {
            start -= end - images.length; // subtract the overflow from start
            end = images.length; // set end to the length of images
        }

        start = Math.max(start, 0); // ensure start is not negative
        setImgPreview(images.slice(start, end));
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.keyCode) {
                case 27: // esc close
                    handleClose();
                    break;
                case 37: // left arrow
                    handlePrev();
                    break;
                case 39: // right arrow
                    handleNext();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleClose = () => {
        setCurrentImage(null);
        setShowGallery(false)
    }

    return (
        <div className="modal-backdrop fixed inset-0 z-[100] overflow-x-hidden overflow-y-auto focus:outline-none px-9 bg-opacity-30">
            <button
                    className="absolute top-3 right-2.5 p-3 rounded-full text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-950"
                    onClick={handleClose}
            >
                <IoClose size="25px" className="bg-transparent"/>
            </button>
            <div className="w-full h-[90%] overflow-hidden mx-auto relative">
                <button className={`absolute top-[50%] left-2 p-3 rounded-full bg-gray-100 h-fit hover:bg-gray-200 ${currentIndex === 0 && "opacity-20"}`} onClick={handlePrev}>
                    <GrPrevious size='25px'/>
                </button>
                <img className="rounded w-full h-full object-contain transition-all hover:cursor-pointer"
                     src={currentImage?.url}
                     alt={currentImage?.id}/>
                <button className={`absolute bottom-[43%] right-2 p-3 rounded-full bg-gray-100 h-fit hover:bg-gray-200 ${currentIndex === images.length - 1 && "opacity-20"}`} onClick={handleNext}>
                    <GrNext size='25px'/>
                </button>
            </div>
            <div className='h-[10%] flex justify-center items-center py-2 px-auto'>
                    {imgPreview.map((image, index) => {
                        return (
                            <div key={image.id} className={`mr-3`}>
                                <img
                                     onClick={() => setCurrentImage(imgPreview[index])}
                                     className={`w-14 h-14 object-cover rounded transition-all hover:border-2 hover:cursor-pointer ${image.id !== currentImage.id && 'opacity-25'}`}
                                     src={image.url} alt={image.id}/>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default ImageGallery