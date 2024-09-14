import {InfoWindow, MarkerF, MarkerClustererF} from "@react-google-maps/api";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import i18next from "i18next";
import {getAboutMarker} from "../../redux/markerAbout";
import {useTranslation} from "react-i18next";

const DoctorMarkers = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Doctors = useSelector((store) => store.Doctors.data);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [clinicActiveId, setClinicActiveId] = useState(null);
    const icon = {url: './images/pin-Doctor.png', scaledSize: {width: 50, height: 55}};
    const icon2 = {url: './images/doctor-pin-active.png', scaledSize: {width: 40, height: 55}};

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
            {(clusterer) => Doctors.map((item, index) => {
                return <MarkerF
                    key={index}
                    position={
                        item.location ?
                            {lat: Number(item.location.split(",")[0]), lng: Number(item.location.split(",")[1])} :
                            {
                                lat: Number(item.hospital.location.split(",")[0]),
                                lng: Number(item.hospital.location.split(",")[1])
                            }}
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
            position={
                selectedLocation.location ?
                    {
                        lat: Number(selectedLocation.location.split(",")[0]),
                        lng: Number(selectedLocation.location.split(",")[1])
                    } :
                    {
                        lat: Number(selectedLocation.hospital.location.split(",")[0]),
                        lng: Number(selectedLocation.hospital.location.split(",")[1])
                    }
            }
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
                                {selectedLocation.translations[i18next.language].first_name} &nbsp;
                                {selectedLocation.translations[i18next.language].last_name} &nbsp;
                                {selectedLocation.translations[i18next.language].middle_name}
                            </div>

                            <div className="section-commit">
                                <div className="raiting">
                                    <img src="./images/star.png" alt=""/>
                                    {selectedLocation.avg_rating}
                                </div>
                                <span></span>
                                <div className="commit-count">
                                    {selectedLocation.comment_count} {t("comment")}
                                </div>
                            </div>
                        </div>

                        <div className="section-location">
                            <div className="location">
                                <img src="./images/job.png" alt=""/>
                                {selectedLocation.specialty.translations[i18next.language].name}
                            </div>
                            <span></span>
                            <div className="time-open">
                                {selectedLocation.experience} {t("experience")}
                            </div>
                        </div>

                        <div className="section-location">
                            <div className="location">
                                <img src="./images/icon.png" alt=""/>
                                {selectedLocation.hospital ? selectedLocation.hospital.translations[i18next.language].address :
                                    selectedLocation.translations[i18next.language].address}
                            </div>

                            {selectedLocation.hospital ?
                                <>
                                    <span></span>
                                    <div className="time-open">
                                        {selectedLocation.hospital.translations[i18next.language].name}
                                    </div>
                                </> : ""}
                        </div>

                        <div className="section-location">
                            <div className="location">
                                <img src="./images/time.png" alt=""/>
                                {selectedLocation.working_days.map((item, index) => {
                                    return <p key={index}>
                                        {item.translations[i18next.language].day}
                                    </p>
                                })}
                            </div>
                            <span></span>
                            <div className="time-open">
                                {selectedLocation.start_time} {t("from")}
                                &nbsp;
                                {selectedLocation.end_time} {t("to")}
                            </div>
                        </div>

                        <div className="buttons">
                            <div onClick={() => {
                                localStorage.setItem("doctorId", selectedLocation.id)
                                navigate("/about-doctor")
                                dispatch(getAboutMarker(selectedLocation.location ? selectedLocation.location : selectedLocation.hospital.location))
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

export default DoctorMarkers