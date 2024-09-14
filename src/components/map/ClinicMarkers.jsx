import {InfoWindow, MarkerF, MarkerClustererF} from "@react-google-maps/api";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import i18next from "i18next";
import {getAboutMarker} from "../../redux/markerAbout";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const ClinicMarkers = () => {
    const {t} = useTranslation();
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

    const NavigateButton = (location) => {
        let latitude = Number(location.split(",")[0]);
        let longitude = Number(location.split(",")[1]);

        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, '_blank');
    };

    return <>

        <MarkerClustererF gridSize={60}>
            {(clusterer) => clinics.map((item, index) => {
                return <MarkerF
                    key={index}
                    position={{lat: Number(item.location.split(",")[0]), lng: Number(item.location.split(",")[1])}}
                    icon={clinicActiveId === item.id ? icon2 : icon}
                    onClick={() => {
                        onMarkerClick(item);
                        setClinicActiveId(item.id)
                    }}
                    clusterer={clusterer}
                />
            })

            }
        </MarkerClustererF>

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
                    <div onClick={()=> NavigateButton(selectedLocation.location)} className="navigator">
                        {t("navigator")}
                        <img src="./images/compass.png" alt=""/>
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
                                {selectedLocation.comment_count} {t("comment")}
                            </div>
                        </div>
                        <div className="section-location">
                            <div className="time-open">
                                <img src="./images/clock.png" alt=""/>
                                {selectedLocation.open_24 ? t("open24") : <>
                                    {selectedLocation.start_time} {t("from")}
                                    &nbsp;
                                    {selectedLocation.end_time} {t("to")}
                                </>}
                            </div>
                        </div>
                        <div onClick={() => {
                            navigate("/about-clinic");
                            localStorage.setItem("clinicId", selectedLocation.id);
                            dispatch(getAboutMarker(selectedLocation.location))
                        }} className="more-btn">
                            {t("more")}
                        </div>
                    </div>
                </div>

            </div>
        </InfoWindow>)}

    </>
};

export default ClinicMarkers