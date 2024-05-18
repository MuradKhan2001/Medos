import {InfoWindow, MarkerF} from "@react-google-maps/api";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const DoctorMarkers = ()=>{
    const Doctors = useSelector((store) => store.Doctors.data);
    const navigate = useNavigate();
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

    return <>

        {Doctors.map((item, index) => {
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
                        <img src="./images/doctor.png" alt=""/>
                    </div>
                    <div className="content">
                        <div className="header-clinic">
                            <div className="name-clinic">
                                Aktubaev Alisher
                            </div>

                            <div className="section-commit">
                                <div className="raiting">
                                    <img src="./images/star.png" alt=""/>
                                    4.88
                                </div>
                                <span></span>
                                <div className="commit-count">
                                    324 ta izoh
                                </div>
                            </div>
                        </div>

                        <div className="section-location">
                            <div className="location">
                                <img src="./images/job.png" alt=""/>
                                Stomotolog
                            </div>
                            <span></span>
                            <div className="time-open">
                                16 yillik tajriba
                            </div>
                        </div>

                        <div className="section-location">
                            <div className="location">
                                <img src="./images/icon.png" alt=""/>
                                Olmazor tumani
                            </div>
                            <span></span>
                            <div className="time-open">
                                Akfa medline
                            </div>
                        </div>

                        <div className="section-location">
                            <div className="location">
                                <img src="./images/time.png" alt=""/>
                                Dushanba, Chorshanba, Payshanba, Juma
                            </div>
                            <span></span>
                            <div className="time-open">
                                9:00 - 15:00
                            </div>
                        </div>

                        <div className="services">
                            <div className="service">
                                Bolalar stomatolog
                            </div>
                            <div className="service">
                                Stomatolog-terapevt
                            </div>
                            <div className="service">
                                Stomatolog jarroh
                            </div>
                        </div>

                        <div className="prices">
                            <div className="item-price">
                                <div className="title">Birinchi konsultatsiya</div>
                                <div className="number">650 000 so'm</div>
                            </div>

                            <div className="item-price">
                                <div className="title">Takroriy konsultatsiya</div>
                                <div className="number">Narxi so'rov bo'yicha</div>
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

export default DoctorMarkers