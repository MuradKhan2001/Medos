import {InfoWindow, MarkerF} from "@react-google-maps/api";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import i18next from "i18next";
import {getAboutMarker} from "../../redux/markerAbout";

const PharmaciesMarkers = ()=>{
    const dispatch = useDispatch();
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

    const isPlaceOpen = (startTime, endTime) => {
        const startParts = startTime.split(':');
        const endParts = endTime.split(':');

        const startDate = new Date();
        startDate.setHours(startParts[0], startParts[1], startParts[2]);

        const endDate = new Date();
        endDate.setHours(endParts[0], endParts[1], endParts[2]);

        const now = new Date();

        return now >= startDate && now <= endDate;
    };

    return <>
        {Pharmacies.map((item, index) => {
            return <MarkerF
                key={index}
                position={{lat: Number(item.location.split(",")[0]), lng: Number(item.location.split(",")[1])}}
                icon={clinicActiveId === item.id ? icon2 : icon}
                onClick={() => {
                    onMarkerClick(item);
                    setClinicActiveId(item.id)}}
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
                        <div className="header-clinic">
                            <div className="name-clinic">
                                {selectedLocation.translations[i18next.language].name}
                            </div>

                            <div className="section-commit">
                                <div className="raiting">
                                    <img src="./images/star2.png" alt=""/>
                                    {selectedLocation.avg_rating}
                                </div>
                                <span></span>
                                <div className="commit-count">
                                    ({selectedLocation.comment_count})
                                </div>
                            </div>
                        </div>

                        <div className="section-location">
                            <div className="location">
                                <img src="./images/icon.png" alt=""/>
                                {selectedLocation.translations[i18next.language].address}
                            </div>
                        </div>

                        <div className="section-location">
                            <div className="location">
                                <img src="./images/time.png" alt=""/>
                                {selectedLocation.open_24 ? <div
                                    className="open">Ochiq</div> : isPlaceOpen(selectedLocation.start_time, selectedLocation.end_time) ?
                                    <div className="open">Ochiq</div> :
                                    <div className="close">Yopiq</div>}
                            </div>

                            <span></span>
                            <div className="time-open">
                                {selectedLocation.open_24 ? "24 soat ochiq" : <>
                                    {selectedLocation.start_time} dan
                                    &nbsp;
                                    {selectedLocation.end_time} gacha
                                </>}
                            </div>
                        </div>

                        <div className="buttons">
                            <div onClick={()=> {
                                localStorage.setItem("pharmacyId", selectedLocation.id);
                                dispatch(getAboutMarker(selectedLocation.location));
                                navigate("/about-pharmacies")
                            }} className="more-btn">
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