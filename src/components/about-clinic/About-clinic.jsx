import "./clinic-style.scss"
import Navbar from "../navbar/Navbar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Footer from "../footer/Footer";
import {showModals} from "../../redux/ModalContent";
import {useDispatch, useSelector} from "react-redux";
import MobileNavbar from "../mobile-navbar/MobileNavbar";
import axios from "axios";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {getAboutMarker} from "../../redux/markerAbout";
import MapAbout from "../map/MapAbout";


const AboutClinic = () => {
    const {t} = useTranslation();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [tabActive, setTabActive] = useState(1);
    const [clinic, setClinic] = useState("");
    const [comments, setComments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [services, setServices] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tabs = [
        {id: 1, name: "Umumiy"},
        {id: 2, name: "Shifokorlar"},
        {id: 3, name: "Izohlar"},
        {id: 4, name: "Xizmatlar va narxlar"}
    ];
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}hospital/${localStorage.getItem("clinicId")}/`).then((response) => {
            setClinic(response.data);

            dispatch(getAboutMarker(response.data.location));

            axios.get(`${baseUrl}comment/${response.data.user}/`).then((response) => {
                setComments(response.data)
            });

            axios.get(`${baseUrl}hospital/${response.data.id}/doctors/`).then((response) => {
                setDoctors(response.data)
            });

            axios.get(`${baseUrl}hospital/${response.data.id}/services/`).then((response) => {
                setServices(response.data)
            })
        });

        setSavedPosts(getSavedPosts())
    }, []);

    const ShowModal = (status, item) => {
        dispatch(showModals({show: true, status, item}))
    };

    const getSavedPosts = () => {
        const savedPosts = localStorage.getItem('hospital_saved');
        return savedPosts ? JSON.parse(savedPosts) : [];
    };

    const handleSaveClick = (postId) => {
        let updatedSavedPosts = [...savedPosts];

        if (savedPosts.includes(postId)) {
            updatedSavedPosts = updatedSavedPosts.filter(id => id !== postId);
        } else {
            updatedSavedPosts.push(postId);
        }

        localStorage.setItem('hospital_saved', JSON.stringify(updatedSavedPosts));
        setSavedPosts(updatedSavedPosts);
    };

    return <div className="about-clinic-box">
        <Navbar/>

        {clinic &&
        <div className="about-hospital">
            <div className="header">
                <div className="title">
                    {clinic && clinic.translations[i18next.language].name}
                </div>

                <div className="buttons">
                    <div className="like">
                        <img onClick={() => handleSaveClick(clinic.id)}
                             src={savedPosts.includes(clinic.id) ? "./images/like.png" : "./images/no-like.png"}
                             alt=""/>
                    </div>

                    <div onClick={() => ShowModal("contact", clinic)}
                         className="button-call">Qo'ng'iroq qilish
                    </div>
                    <div onClick={() => ShowModal("sms", clinic.user)}
                         className="button-send">Yozish
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="section-commit">
                    <div className="raiting">
                        {clinic.avg_rating}
                    </div>
                    <div className="commit-count">
                        {clinic.comment_count} ta izoh
                    </div>
                </div>
                <div className="section-location">
                    <div className="location">
                        <img src="./images/icon.png" alt=""/>
                        {clinic && clinic.translations[i18next.language].address}
                    </div>
                    <span></span>
                    <div className="time-open">
                        <img src="./images/clock.png" alt=""/>
                        {clinic.open_24 ? "24 soat ochiq" : <>
                            {clinic.start_time} dan
                            &nbsp;
                            {clinic.end_time} gacha
                        </>}
                    </div>
                </div>
                <div className="images-location">
                    <div className="images-box">
                        <div className="image-hospital">
                            <img src={clinic.image} alt=""/>
                        </div>
                    </div>
                    <div className="location-box">
                        <MapAbout/>
                    </div>
                </div>
                <div className="tab-hospital">
                    {tabs.map((item, index) => {
                        return <div key={index} onClick={() => setTabActive(item.id)}
                                    className={tabActive === item.id ? "tab-active" : "tab"}>
                            {item.name}
                        </div>
                    })}
                </div>

                {tabActive === 1 && <div className="all-info">
                    <div className="service-hospital">
                        <div className="title">
                            Shifokorlarning ixtisoslashuvi
                        </div>
                        <div className="contents">
                            {clinic && clinic.hospital_services.map((item, index) => {
                                return <div key={index} className="service">
                                    {item.service.translations[i18next.language].name}
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="comments-box">
                        <div className="header-commet">
                            <div className="counts">
                                <div className="raiting">
                                    {clinic.avg_rating}
                                </div>
                                <div className="commit-count">
                                    {clinic.comment_count} ta izoh
                                </div>
                            </div>

                            <div onClick={() => ShowModal("commit", clinic.user)} className="btn-commit">
                                <img src="./images/comit.png" alt=""/>
                                Izoh yozib qoldirish
                            </div>
                        </div>
                        {comments.map((item, index) => {
                            if (index < 6) {
                                return <div key={index} className="commits">
                                    <div className="header-commit">
                                        <div className="left-circle">
                                            {item.name.slice(0, 1)}
                                        </div>
                                        <div className="right-names">
                                            <div className="name">
                                                {item.name}
                                                <span>{item.time}</span>
                                            </div>
                                            <div className="stars">
                                                {Array.from({length: item.mark}).map((_, index) => (
                                                    <img key={index} src="./images/raiting1.png" alt="Rating 1"/>
                                                ))}

                                                {Array.from({length: 5 - item.mark}).map((_, index) => (
                                                    <img key={index} src="./images/raiting2.png" alt="Rating 2"/>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-commit">
                                        {item.text}
                                    </div>
                                </div>
                            }
                        })}
                        <div onClick={() => setTabActive(3)} className="more-btn">
                            Ko'proq ko'rsatish
                        </div>
                    </div>
                </div>}

                {tabActive === 2 && <div className="doctors">
                    <div className="category-wrapper">
                        {
                            doctors.services.map((item, index) => {
                                return <div key={index}>
                                    <div
                                        className="category-name active">
                                        {item.translations[i18next.language].name} <span></span> {item.doctor_count}
                                    </div>
                                </div>
                            })
                        }
                    </div>

                    <div className="doctors-warapper">
                        {
                            doctors.doctors.map((item, index) => {
                                return <div key={index} className="doctor">
                                    <div className="left-side">
                                        <img src={"http://138.197.97.98" + item.image} alt=""/>
                                    </div>

                                    <div className="right-side">
                                        <div className="header-clinic">
                                            <div className="name-clinic">
                                                {item.translations[i18next.language].first_name} &nbsp;
                                                {item.translations[i18next.language].last_name} &nbsp;
                                                {item.translations[i18next.language].middle_name}
                                            </div>

                                            <div className="section-commit">
                                                <div className="raiting">
                                                    {item.avg_rating}
                                                </div>
                                                <span></span>
                                                <div className="commit-count">
                                                    {item.comment_count} ta izoh
                                                </div>
                                            </div>
                                        </div>

                                        <div className="section-location">
                                            <div className="location">
                                                <img src="./images/job.png" alt=""/>
                                                {item.specialty.translations[i18next.language].name}
                                            </div>
                                            <span></span>
                                            <div className="time-open">
                                                {item.experience} yillik tajriba
                                            </div>
                                        </div>

                                        <div className="section-location">
                                            <div className="location">
                                                <img src="./images/icon.png" alt=""/>
                                                {item.hospital ? clinic.translations[i18next.language].address :
                                                    item.translations[i18next.language].address}
                                            </div>
                                            {item.hospital ?
                                                <>
                                                    <span></span>
                                                    <div className="time-open">
                                                        {clinic.translations[i18next.language].name}
                                                    </div>
                                                </> : ""}
                                        </div>

                                        <div className="section-location">
                                            <div className="location">
                                                <img src="./images/time.png" alt=""/>
                                                {item.working_days.map((item, index) => {
                                                    return <p key={index}>
                                                        {item.translations[i18next.language].day}
                                                    </p>
                                                })}
                                            </div>
                                            <span></span>
                                            <div className="time-open">
                                                {item.start_time} dan
                                                &nbsp;
                                                {item.end_time} gacha
                                            </div>
                                        </div>

                                        <div className="services">
                                            {item.sub_speciality.map((item, index) => {
                                                return <div key={index} className="service">
                                                    {item.translations[i18next.language].name}
                                                </div>
                                            })}
                                        </div>

                                        <div className="prices">
                                            <div className="item-price">
                                                <div className="title">Birinchi konsultatsiya</div>
                                                <div className="number">
                                                    {item.consultation_fee ? <>{item.consultation_fee} so'm </> : "Kelishuv asosida"}
                                                </div>
                                            </div>

                                            <div className="item-price">
                                                <div className="title">Takroriy konsultatsiya</div>
                                                <div className="number">
                                                    {item.second_consultation_fee ?
                                                        <>{item.second_consultation_fee} so'm </> :
                                                        "Kelishuv asosida"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="buttons">
                                            <div className="left-btn">
                                                <div onClick={() => ShowModal("sms", item.user)}
                                                     className="button-send">
                                                    Qabuliga yozilish
                                                </div>
                                                <div onClick={() => ShowModal("contact", item)}
                                                     className="button-call">Qo'ng'iroq
                                                    qilish
                                                </div>
                                            </div>
                                            <div onClick={() => navigate("/about-clinic")} className="more-btn">
                                                Ko'proq ko'rsatish
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>}

                {tabActive === 3 && <div className="all-commits">
                    <div className="header-commet">
                        <div className="counts">
                            <div className="raiting">
                                {clinic.avg_rating}
                            </div>
                            <div className="commit-count">
                                {clinic.comment_count} ta izoh
                            </div>
                        </div>

                        <div onClick={() => ShowModal("commit", clinic.user)} className="btn-commit">
                            <img src="./images/comit.png" alt=""/>
                            Izoh yozib qoldirish
                        </div>
                    </div>

                    {comments.map((item, index) => {
                        return <div key={index} className="commits">
                            <div className="header-commit">
                                <div className="left-circle">
                                    {item.name.slice(0, 1)}
                                </div>
                                <div className="right-names">
                                    <div className="name">
                                        {item.name}
                                        <span>{item.time}</span>
                                    </div>
                                    <div className="stars">
                                        {Array.from({length: item.mark}).map((_, index) => (
                                            <img key={index} src="./images/raiting1.png" alt="Rating 1"/>
                                        ))}

                                        {Array.from({length: 5 - item.mark}).map((_, index) => (
                                            <img key={index} src="./images/raiting2.png" alt="Rating 2"/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="text-commit">
                                {item.text}
                            </div>
                        </div>
                    })}

                </div>}

                {tabActive === 4 && <div className="service-box">
                    <div className="category-wrapper">
                        {
                            services.services_count.map((item, index) => {
                                return <div key={index}>
                                    <div
                                        className="category-name active">
                                        {item.translations[i18next.language].name} <span></span> {item.service_count}
                                    </div>
                                </div>
                            })
                        }
                    </div>

                    {services.services.map((item, index) => {
                        return <div key={index} className="one-service">
                            <div className="title">
                                {item.service.translations[i18next.language].name}
                            </div>
                            {item.sub_services_list.map((item, index) => {
                                return <div key={index} className="service">
                                    <div className="name">{item.sub_service.translations[i18next.language].name}</div>
                                    <div className="value">{item.price} so‘m</div>
                                </div>
                            })}
                        </div>
                    })}

                </div>}
            </div>
        </div>}

        <div className="mobile-navbar-container">
            <MobileNavbar/>
        </div>
        <Footer/>
    </div>
};

export default AboutClinic