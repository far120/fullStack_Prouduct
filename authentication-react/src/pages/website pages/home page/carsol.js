import React from 'react';

const show = [
    { src: "./img/collection-baskets-with-sign-that-says-christmas-it_955834-58391.jpg" },
    { src: "./img/flat-design-colorful-vector-illustration-concept-grocery-delivery_808505-2777.avif" },
    { src: "./img/flat-supermarket-webinar-template_23-2149374571.jpg" },
    { src: "./img/mother-her-son-leaving-shop-after-shopping_82574-12295.avif" },
    { src: "./img/sale-background-supermarket-template_23-2149378053.jpg" }
];

export default function Carsol() {
    if (show.length === 0) return null;
    return (
        <div className="mb-10 w-full flex justify-center">
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-lg bg-white">
                <div className="relative">
                    {/* Carousel Images */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                        {show.map((item, index) => (
                            <div key={index} className="flex-shrink-0 w-full snap-center">
                                <img src={item.src} alt={`Slide ${index + 1}`} className="w-full h-72 md:h-[400px] object-cover transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {show.map((_, index) => (
                            <span key={index} className="w-3 h-3 rounded-full bg-blue-300 border-2 border-white shadow-md inline-block"></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
