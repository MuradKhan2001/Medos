import {InfoWindow, MarkerClustererF, MarkerF} from "@react-google-maps/api";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import i18next from "i18next";
import {getAboutMarker} from "../../redux/markerAbout";
import {useTranslation} from "react-i18next";

const PharmaciesMarkers = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Pharmacies = useSelector((store) => store.Pharmacies.data);
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

    const NavigateButton = (location) => {
        let latitude = Number(location.split(",")[0]);
        let longitude = Number(location.split(",")[1]);

        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, '_blank');
    };

    return <>
        <MarkerClustererF gridSize={60}>
            {(clusterer) => Pharmacies.map((item, index) => {
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
            })}
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
                    <div onClick={() => NavigateButton(selectedLocation.location)}
                         className="navigator">
                        {t("navigator")}
                        <img src="./images/compass.png" alt=""/>
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
                                    className="open">{t("open")}</div> : isPlaceOpen(selectedLocation.start_time, selectedLocation.end_time) ?
                                    <div className="open">{t("open")}</div> :
                                    <div className="close">{t("close")}</div>}
                            </div>

                            <span></span>
                            <div className="time-open">
                                {selectedLocation.open_24 ? t("open24") : <>
                                    {selectedLocation.start_time} {t("from")}
                                    &nbsp;
                                    {selectedLocation.end_time} {t("to")}
                                </>}
                            </div>
                        </div>

                        <div className="buttons">
                            <div onClick={() => {
                                localStorage.setItem("pharmacyId", selectedLocation.id);
                                dispatch(getAboutMarker(selectedLocation.location));
                                navigate("/about-pharmacies")
                            }} className="more-btn">
                                {t("more")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </InfoWindow>)}
    </>
};

export default PharmaciesMarkers