import {InfoWindow, MarkerF} from "@react-google-maps/api";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const PharmaciesMarkers = ()=>{
    const Pharmacies = useSelector((store) => store.Pharmacies.data);
    const navigate = useNavigate();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [clinicActiveId, setClinicActiveId] = useState(null);
    const icon = {url: './images/pharma-pin.png', scaledSize: {width: 50, height: 55}};
    const icon2 = {url: './images/pharma-pin-active.png', scaledSize: {width: 50, height: 55}};

    const onMarkerClick = (location) => {
        setSelectedLocation(location);
    };

    const onCloseClick = () => {
        setSelectedLocation(null);
        setClinicActiveId(null)
    };

    return <>
        {Pharmacies.map((item, index) => {
            return <MarkerF
                key={index}
                position={{lat: Number(item.latitude), lng: Number(item.longitude)}}
                icon={clinicActiveId === item.id ? icon2 : icon}
                onClick={() => {
                    onMarkerClick(item);
                    setClinicActiveId(item.id)
                }
                }
            />
        })}

        {selectedLocation && (<InfoWindow
            position={{
                lat: Number(selectedLocation.latitude),
                lng: Number(selectedLocation.longitude)
            }}
            onCloseClick={onCloseClick}
        >
            <div className="info-box-clinic">
                <div className="info-text">
                    <div className="photo-clinic">
                        <img src="./images/pharma.jpeg" alt=""/>
                    </div>
                    <div className="content">
                        <div className="header-clinic">
                            <div className="name-clinic">
                                Oxymed
                            </div>

                            <div className="section-commit">
                                <div className="raiting">
                                    <img src="./images/star2.png" alt=""/>
                                    4.88
                                </div>
                                <span></span>
                                <div className="commit-count">
                                    (324)
                                </div>
                            </div>
                        </div>

                        <div className="section-location">
                            <div className="location">
                                <img src="./images/icon.png" alt=""/>
                                Chilonzor tumani
                            </div>
                            <span></span>
                            <div className="time-open">
                                800m
                            </div>
                        </div>

                        <div className="section-location">
                            <div className="location">
                                <img src="./images/time.png" alt=""/>
                                {/*<div className="open">Ochiq</div>*/}
                                <div className="close">Yopiq</div>
                            </div>
                            <span></span>
                            <div className="time-open">
                                9:00 - 15:00
                            </div>
                        </div>

                        <div className="buttons">
                            <div onClick={()=> navigate("/about-clinic")} className="more-btn">
                                Ko'proq ko'rsatish
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </InfoWindow>)}
    </>
};

export default PharmaciesMarkers