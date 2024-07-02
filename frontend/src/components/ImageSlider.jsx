import React from 'react';
import { Slide } from 'react-slideshow-image';


const ImageSlider = () => {
    const images = [
        "https://res.cloudinary.com/lus-terry/image/upload/v1718207939/webShop/ohidyezbjcjf5emsbpxh.jpg",
        "https://res.cloudinary.com/lus-terry/image/upload/v1718207939/webShop/ohidyezbjcjf5emsbpxh.jpg",
        "https://res.cloudinary.com/lus-terry/image/upload/v1718207939/webShop/ohidyezbjcjf5emsbpxh.jpg",
    ];

    return (
        <Slide>
            {images.map((image, index) => (
                <div key={index} className="each-slide-effect">
                    <img className="h-full  object-cover" src={image} alt={`Slide ${index + 1}`} />
                </div>
            ))}
        </Slide>
    );
};

export default ImageSlider;
