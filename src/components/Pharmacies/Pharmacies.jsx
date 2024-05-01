import "./style-doctors.scss";
import Navbar from "../navbar/Navbar";
import {useEffect, useState, useMemo, useRef} from "react";
import {
    GoogleMap,
    Marker,
    useLoadScript,
    MarkerClusterer,
    InfoWindow
} from "@react-google-maps/api";
import i18next from "i18next";
import {GOOGLE_MAPS_API_KEY} from "./googleMapsApi";
import Loader from "../loader/Loader";
import {CSSTransition} from "react-transition-group";
import {useNavigate} from "react-router-dom";
import Footer from "../footer/Footer";

const libraries = ["places"];

const Doctors = () => {
    const [category, setCategory] = useState(1);

    const [dropdown, setDropdown] = useState(false);
    const [dropdownName, setDropdownName] = useState("Tuman");

    const [dropdown2, setDropdown2] = useState(false);
    const [dropdown2Name, setDropdown2Name] = useState("Mutaxasislik");

    const nodeRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [center, setCenter] = useState();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [clinicActiveId, setClinicActiveId] = useState(null);
    const [like, setLike] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            let locMy = {lat: latitude, lng: longitude};
            setCenter(locMy);
        });
    }, []);

    const Category = [
        {id: 1, name: "Barchasi"},
        {id: 2, name: "Ayollar maslahatlari"},
        {id: 3, name: "Bolalar shifoxonalari"},
        {id: 4, name: "Dispanserlar"},
        {id: 5, name: "Tug‘ruqxonalar"},
        {id: 6, name: "Laboratoriyalar"},
        {id: 7, name: "Narkologik klinikalar"},
        {id: 8, name: "Narkologik klinikalar"},
        {id: 9, name: "Narkologik klinikalar"},
        {id: 10, name: "Narkologik klinikalar"},
    ];

    window.onclick = function (event) {
        if (!event.target.matches('.show-dropdown')) {
            setDropdown(false);
            setDropdown2(false)
        }

    };

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: libraries,
        language: i18next.language,
    });

    const options = useMemo(
        () => ({
            disableDefaultUI: false,
            clickableIcons: false,
        }),
        []
    );

    const icon = {url: './images/pin-Doctor.png', scaledSize: {width: 50, height: 55}};
    const icon2 = {url: './images/doctor-pin-active.png', scaledSize: {width: 40, height: 55}};

    const ClinicsLocation = [
        {
            id: 1, latitude: "41.311153", longitude: "69.279729"
        },
        {
            id: 2, latitude: "41.611153", longitude: "69.279729"
        },
        {
            id: 3, latitude: "41.511153", longitude: "69.279729"
        }
    ];

    const onMarkerClick = (location) => {
        setSelectedLocation(location);
    };

    const onCloseClick = () => {
        setSelectedLocation(null);
        setClinicActiveId(null)
    };

    if (!isLoaded) return <Loader/>;

    return <>
        <div className="doctors-wrapper">
            <Navbar/>

            <CSSTransition
                in={showModal}
                nodeRef={nodeRef}
                timeout={300}
                classNames="alert"
                unmountOnExit
            >
                <div className="modal-sloy">
                    <div className="modal-card">
                        <div className="send-sms">
                            <div className="header">
                                <div className="xbtn">
                                    <img onClick={() => setShowModal(false)} src="./images/cancel.png" alt=""/>
                                </div>
                            </div>
                            <div className="title">
                                Qabulga yozilish
                            </div>
                            <div className="description">
                                Operatorlar siz bilan aloqaga chiqa olishlari uchun pastdagi maydonlarni to‘g‘ri
                                to‘ldiring!
                            </div>
                            <div className="inputs-box">
                                <input placeholder="To'liq ismingizni yozing" type="text"/>
                                <input placeholder="Telefon raqamingizni kiriting" type="text"/>
                                <textarea placeholder="Siz kuzatilayotgan muammo haqida qisqacha izoh yozing" name=""
                                          id=""
                                          cols="30" rows="10"></textarea>
                            </div>
                            <div className="buttons-box">
                                <div onClick={() => setShowModal(false)} className="cancel-btn">Bekor qilish</div>
                                <div className="send-btn">Yuborish</div>
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>

            <div className="doctors-list">
                <div className="bottom-content">
                    <div className="left-side">
                        <div className="category-wrapper">
                            <div>
                                <div className="dropdown-filter">
                                    <div className="dropdown">
                                        <div className="dropdown-btn">
                                            <div onClick={() => {
                                                setDropdown(!dropdown);
                                                setDropdown2(false)
                                            }} className="show-dropdown"></div>
                                            {dropdownName}
                                            <img className={`${dropdown ? "icon-rotate" : ""}`}
                                                 src="./images/Vector.png" alt=""/>
                                        </div>

                                        {
                                            dropdown && <div className="dropdown-menu">
                                                <div onClick={() => {
                                                    setDropdown(false);
                                                    setDropdownName("Jomboy")
                                                }} className="dropdown-item">Jomboy
                                                </div>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="dropdown-filter">
                                    <div className="dropdown">

                                        <div onClick={() => {
                                            setDropdown2(!dropdown2);
                                            setDropdown(false)
                                        }} className="dropdown-btn">
                                            <div onClick={() => {
                                                setDropdown2(!dropdown2);
                                                setDropdown(false)
                                            }} className="show-dropdown"></div>
                                            {dropdown2Name}
                                            <img className={`${dropdown2 ? "icon-rotate" : ""}`}
                                                 src="./images/Vector.png" alt=""/>
                                        </div>

                                        {
                                            dropdown2 && <div className="dropdown-menu">
                                                <div onClick={() => {
                                                    setDropdown2(false);
                                                    setDropdown2Name("AAAAAAA")
                                                }} className="dropdown-item">AAAAAAA
                                                </div>

                                                <div onClick={() => {
                                                    setDropdown2(false);
                                                    setDropdown2Name("bbbbbbbbbbbbb")
                                                }} className="dropdown-item">bbbbbbbbbbbbb
                                                </div>

                                                <div onClick={() => {
                                                    setDropdown2(false);
                                                    setDropdown2Name("CCCCCCCCC")
                                                }} className="dropdown-item">CCCCCCCCC
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="dropdown-filter">
                                    <div className="dropdown">
                                        <div className="dropdown-btn">
                                            24 soat ochiq
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="doctors">
                            <div className="doctor">
                                <div className="left-side">
                                    <img src="./images/doctor.png" alt=""/>
                                    <div className="like">
                                        {
                                            like ?
                                                <img onClick={() => setLike(false)} src="./images/like.png" alt=""/> :
                                                <img onClick={() => setLike(true)} src="./images/no-like.png" alt=""/>
                                        }
                                    </div>
                                </div>

                                <div className="right-side">
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
                                        <div className="left-btn">
                                            <div onClick={() => setShowModal(true)} className="button-send">
                                               Qabuliga yozilish
                                            </div>
                                            <div className="button-call">+998 94 188 2001</div>
                                        </div>

                                        <div onClick={()=> navigate("/about-clinic")} className="more-btn">
                                            Ko'proq ko'rsatish
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="doctor">
                                <div className="left-side">
                                    <img src="./images/doctor.png" alt=""/>
                                    <div className="like">
                                        {
                                            like ?
                                                <img onClick={() => setLike(false)} src="./images/like.png" alt=""/> :
                                                <img onClick={() => setLike(true)} src="./images/no-like.png" alt=""/>
                                        }
                                    </div>
                                </div>

                                <div className="right-side">

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
                                        <div className="left-btn">
                                            <div onClick={() => setShowModal(true)} className="button-send">
                                                Qabuliga yozilish
                                            </div>
                                            <div className="button-call">+998 94 188 2001</div>
                                        </div>

                                        <div onClick={()=> navigate("/about-clinic")} className="more-btn">
                                            Ko'proq ko'rsatish
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="doctor">
                                <div className="left-side">
                                    <img src="./images/doctor.png" alt=""/>
                                    <div className="like">
                                        {
                                            like ?
                                                <img onClick={() => setLike(false)} src="./images/like.png" alt=""/> :
                                                <img onClick={() => setLike(true)} src="./images/no-like.png" alt=""/>
                                        }
                                    </div>
                                </div>

                                <div className="right-side">

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
                                        <div className="left-btn">
                                            <div onClick={() => setShowModal(true)} className="button-send">
                                                Qabuliga yozilish
                                            </div>
                                            <div className="button-call">+998 94 188 2001</div>
                                        </div>

                                        <div onClick={()=> navigate("/about-clinic")} className="more-btn">
                                            Ko'proq ko'rsatish
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="doctor">
                                <div className="left-side">
                                    <img src="./images/doctor.png" alt=""/>
                                    <div className="like">
                                        {
                                            like ?
                                                <img onClick={() => setLike(false)} src="./images/like.png" alt=""/> :
                                                <img onClick={() => setLike(true)} src="./images/no-like.png" alt=""/>
                                        }
                                    </div>
                                </div>

                                <div className="right-side">

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
                                        <div className="left-btn">
                                            <div onClick={() => setShowModal(true)} className="button-send">
                                                Qabuliga yozilish
                                            </div>
                                            <div className="button-call">+998 94 188 2001</div>
                                        </div>

                                        <div onClick={()=> navigate("/about-clinic")} className="more-btn">
                                            Ko'proq ko'rsatish
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pagination-box">
                                <div className="prev-btn">
                                    <img src="./images/arrow.png" alt=""/>
                                </div>

                                <div className="pagination-items">
                                    1
                                </div>
                                <div className="pagination-items">
                                    2
                                </div>
                                <div className="pagination-items">
                                    3
                                </div>
                                <div className="pagination-items">
                                    4
                                </div>

                                <div className="next-btn">
                                    <img src="./images/arrow.png" alt=""/>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                    <div className="right-side">
                        <GoogleMap
                            zoom={10}
                            center={center}
                            options={options}
                            mapContainerClassName="map"
                        >

                            {ClinicsLocation.map((item, index) => {
                                return <Marker
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

                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default Doctors