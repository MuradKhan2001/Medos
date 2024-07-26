import React, {useContext, useEffect, useState} from 'react';
import Slider from "react-slick";
import axios from "axios";
import {useSelector} from "react-redux";
import "./advetStyle.scss"

function AdvertBox(props) {
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [adverts, setAdverts] = useState([]);

    // useEffect(() => {
    //     axios.get(`${baseUrl}/api/advertisement/`).then((response) => {
    //         setAdverts(response.data);
    //     }).catch(() => {
    //     });
    //
    // }, []);

    const settingsAdvertSlider = {
        lazyLoad: false,
        slidesToShow: 1,
        dots: false,
        infinite: true,
        fade: true,
        speed: 3000,
        autoplay: true,
        navs: false,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [{
            breakpoint: 1024, settings: {
                slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: false
            }
        }, {
            breakpoint: 600, settings: {
                slidesToShow: 1, slidesToScroll: 1, initialSlide: 1
            }
        }, {
            breakpoint: 480, settings: {
                slidesToShow: 1, slidesToScroll: 1
            }
        }]
    };

    return (
        adverts.length > 0 ? <div className="advert-box">
            <Slider {...settingsAdvertSlider}>
                {adverts ? adverts.map((item, index) => {
                    return <div key={index}>
                        <img src={item.image} alt=""/>
                    </div>
                }) : ""}
            </Slider>
        </div> : <></>
    );
}

export default AdvertBox;