import React, { useEffect, useState } from 'react';

const show = [
    {
        src:"./img/collection-baskets-with-sign-that-says-christmas-it_955834-58391.jpg"
    },
    {
        src:"./img/flat-design-colorful-vector-illustration-concept-grocery-delivery_808505-2777.avif"
    },
    {
        src:"./img/flat-supermarket-webinar-template_23-2149374571.jpg"
    },
    {
        src:"./img/mother-her-son-leaving-shop-after-shopping_82574-12295.avif"
    },
    {
        src:"./img/sale-background-supermarket-template_23-2149378053.jpg"
    }
]


export default function Carsol() {
    if (show.length == 0 ){

    }
 
    return (
        <div style={{marginBottom:"40px"}}>
            <div className="cont" style={{ width: '98%', objectFit: 'cover', maxHeight: "700px", margin: '10px '   }}>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {show.map((item, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : "false"}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner">
                        {show.map((item, index) => (
                            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                                <img src={item.src} style={{ height: "400px", objectFit:"fill" , width:"800px"  }} className="d-block w-100" alt={`Slide ${index + 1}`} />
                                <div className="carousel-caption d-none d-md-block">
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon  " aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
