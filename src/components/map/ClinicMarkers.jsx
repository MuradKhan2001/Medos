import {InfoWindow, MarkerF} from "@react-google-maps/api";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

const ClinicMarkers = () => {
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
                position={{lat: Number(item.latitude), lng: Number(item.longitude)}}
                icon={clinicActiveId === item.id ? icon2 : icon}
                onClick={() => {
                    onMarkerClick(item);
                    setClinicActiveId(item.id)
                }}
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
                        <img src="./images/clinic.png" alt=""/>
                    </div>
                    <div className="content">
                        <div className="title">Respublika ixtisoslashtirilgan
                            kardiologiya markazi
                        </div>


                        <div className="section-commit">
                            <div className="raiting">
                                4.9
                            </div>
                            <div className="commit-count">
                                324 ta izoh
                            </div>
                            <span></span>
                            <div className="name">
                                Kasalxona
                            </div>
                        </div>

                        <div className="section-location">
                            <div className="time-open">
                                <img src="./images/clock.png" alt=""/>
                                08:00 dan 18:00 gacha
                            </div>
                        </div>

                        <div className="more-btn">
                            Ko'proq ko'rsatish
                        </div>

                    </div>

                </div>
            </div>
        </InfoWindow>)}
    </>
};

export default ClinicMarkers