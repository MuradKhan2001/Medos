import {InfoWindow, MarkerF} from "@react-google-maps/api";
import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import i18next from "i18next";
import {getAboutMarker} from "../../redux/markerAbout";
import {useNavigate} from "react-router-dom";

const ClinicMarkers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clinics = useSelector((store) => store.Clinics.data);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [clinicActiveId, setClinicActiveId] = useState(null);
    const icon = {url: './images/Location-Pin.png', scaledSize: {width: 50, height: 55}};
    const icon2 = {url: './images/Location-active.png', scaledSize: {width: 50, height: 55}};

    const onMarkerClick = (location) => {
        setSelectedLocation(location);
    };

    const onCloseClick = () => {
        setSelectedLocation(null);
        setClinicActiveId(null)
    };

    return <>
        {clinics.map((item, index) => {
            return <MarkerF
                key={index}
                position={{lat: Number(item.location.split(",")[0]), lng: Number(item.location.split(",")[1])}}
                icon={clinicActiveId === item.id ? icon2 : icon}
                onClick={() => {
                    onMarkerClick(item);
                    setClinicActiveId(item.id)
                }}
            />
        })}

        {selectedLocation && (<InfoWindow
            position={{
                lat: Number(selectedLocation.location.split(",")[0]),
                lng: Number(selectedLocation.location.split(",")[1])
            }}
            onCloseClick={onCloseClick}
        >
            <div className="info-box-clinic">
                <div className="info-text">
                    <div className="photo-clinic">
                        <img src={selectedLocation.image} alt=""/>
                    </div>
                    <div className="content">
                        <div className="title">
                            {selectedLocation.translations[i18next.language].name}
                        </div>
                        <div className="section-commit">
                            <div className="raiting">
                                {selectedLocation.avg_rating}
                            </div>
                            <div className="commit-count">
                                {selectedLocation.comment_count} ta izoh
                            </div>
                        </div>
                        <div className="section-location">
                            <div className="time-open">
                                <img src="./images/clock.png" alt=""/>
                                {selectedLocation.open_24 ? "24 soat ochiq" : <>
                                    {selectedLocation.start_time} dan
                                    &nbsp;
                                    {selectedLocation.end_time} gacha
                                </>}
                            </div>
                        </div>
                        <div onClick={() => {
                            navigate("/about-clinic");
                            localStorage.setItem("clinicId", selectedLocation.id);
                            dispatch(getAboutMarker(selectedLocation.location))
                        }} className="more-btn">
                            Ko'proq ko'rsatish
                        </div>
                    </div>
                </div>
            </div>
        </InfoWindow>)}
    </>
};

export default ClinicMarkers