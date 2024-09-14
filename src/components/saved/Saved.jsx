import "./style-saved.scss"
import Navbar from "../navbar/Navbar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Footer from "../footer/Footer";
import {showModals} from "../../redux/ModalContent";
import {useDispatch, useSelector} from "react-redux";
import MobileNavbar from "../mobile-navbar/MobileNavbar";
import axios from "axios";
import {getAboutMarker} from "../../redux/markerAbout";
import i18next from "i18next";
import Doctors from "../doctors/Doctors";
import Pharmacies from "../Pharmacies/Pharmacies";
import {useTranslation} from "react-i18next";


const Saved = () => {
    const {t} = useTranslation();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [tabActive, setTabActive] = useState(1);
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const [clinics, setClinics] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);

    const [savedPostsClinic, setSavedPostsClinic] = useState([]);
    const getSavedPostsClinic = () => {
        const savedPosts = localStorage.getItem('hospital_saved');
        return savedPosts ? JSON.parse(savedPosts) : [];
    };
    const handleSaveClickClinic = (postId) => {
        let updatedSavedPosts = [...savedPostsClinic];

        if (savedPostsClinic.includes(postId)) {
            updatedSavedPosts = updatedSavedPosts.filter(id => id !== postId);
        } else {
            updatedSavedPosts.push(postId);
        }

        localStorage.setItem('hospital_saved', JSON.stringify(updatedSavedPosts));
        setSavedPostsClinic(updatedSavedPosts);
        axios.post(`${baseUrl}saved/hospital/`, {hospitals: getSavedPostsClinic()}).then((response) => {
            setClinics(response.data);
        });
    };

    const [savedPostsDoctor, setSavedPostsDoctor] = useState([]);
    const getSavedPostsDoctor = () => {
        const savedPosts = localStorage.getItem('doctor_saved');
        return savedPosts ? JSON.parse(savedPosts) : [];
    };
    const handleSaveClickDoctor = (postId) => {
        let updatedSavedPosts = [...savedPostsDoctor];

        if (savedPostsDoctor.includes(postId)) {
            updatedSavedPosts = updatedSavedPosts.filter(id => id !== postId);
        } else {
            updatedSavedPosts.push(postId);
        }

        localStorage.setItem('doctor_saved', JSON.stringify(updatedSavedPosts));
        setSavedPostsDoctor(updatedSavedPosts);
        axios.post(`${baseUrl}saved/doctor/`, {doctors: getSavedPostsDoctor()}).then((response) => {
            setDoctors(response.data);
        });
    };

    const [savedPostsPharmacy, setSavedPostsPharmacy] = useState([]);
    const getSavedPostsPharmacy = () => {
        const savedPosts = localStorage.getItem('pharmacy_saved');
        return savedPosts ? JSON.parse(savedPosts) : [];
    };
    const handleSaveClickPharmacy = (postId) => {
        let updatedSavedPosts = [...savedPostsDoctor];

        if (savedPostsPharmacy.includes(postId)) {
            updatedSavedPosts = updatedSavedPosts.filter(id => id !== postId);
        } else {
            updatedSavedPosts.push(postId);
        }

        localStorage.setItem('pharmacy_saved', JSON.stringify(updatedSavedPosts));
        setSavedPostsPharmacy(updatedSavedPosts);
        axios.post(`${baseUrl}saved/pharmacy/`, {pharmacy: getSavedPostsPharmacy()}).then((response) => {
            setPharmacies(response.data);
        });
    };

    const dispatch = useDispatch();
    const Tabs = [
        {id: 1, name: t("nav1")},
        {id: 2, name: t("nav2")},
        {id: 3, name: t("nav3")}
    ];

    useEffect(() => {
        axios.post(`${baseUrl}saved/hospital/`, {hospitals: getSavedPostsClinic()}).then((response) => {
            setClinics(response.data);
        });

        axios.post(`${baseUrl}saved/doctor/`, {doctors: getSavedPostsDoctor()}).then((response) => {
            setDoctors(response.data);
        });

        axios.post(`${baseUrl}saved/pharmacy/`, {pharmacy: getSavedPostsPharmacy()}).then((response) => {
            setPharmacies(response.data);
        });

        setSavedPostsDoctor(getSavedPostsDoctor());
        setSavedPostsClinic(getSavedPostsClinic());
        setSavedPostsPharmacy(getSavedPostsPharmacy());
    }, []);

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
    const ShowModal = (status, item) => {
        dispatch(showModals({show: true, status, item}))
    };

    return <>
        <div className="saved-container">
            <Navbar/>
            <div className="content-box">
                <div className="title-saved">
                    {t("saved")}
                </div>
                <div className="tab-box">
                    {
                        Tabs.map((item, index) => {
                            return <div key={index} onClick={() => setTabActive(item.id)}
                                        className={`tab ${tabActive === item.id ? "tab-active" : ""}`}>{item.name}</div>
                        })
                    }
                </div>

                {tabActive === 1 && <div className="clinics">
                    {clinics.length > 0 ? clinics.map((item, index) => {
                        return <div key={index} className="clinic">
                            <div className="left-side">
                                <img src={item.image} alt=""/>
                                <div className="like">
                                    <img onClick={() => handleSaveClickClinic(item.id)}
                                         src={savedPostsClinic.includes(item.id) ? "./images/like.png" : "./images/no-like.png"}
                                         alt=""/>
                                </div>
                            </div>
                            <div className="right-side">
                                <div className="header-clinic">
                                    <div className="name-clinic">
                                        {item.translations[i18next.language].name}
                                    </div>
                                    <div className="buttons">
                                        <div onClick={() => ShowModal("contact", item)}
                                             className="button-call">
                                            {t("call")}
                                        </div>
                                        <div onClick={() => ShowModal("sms", item.user)}
                                             className="button-send">
                                            {t("acceptance2")}
                                        </div>
                                    </div>
                                </div>

                                <div className="section-commit">
                                    <div className="raiting">
                                        {item.avg_rating}
                                    </div>
                                    <div className="commit-count">
                                        {item.comment_count} {t("comment")}
                                    </div>
                                </div>

                                <div className="section-location">
                                    <div className="location">
                                        <img src="./images/icon.png" alt=""/>
                                        {item.translations[i18next.language].address}  &nbsp;
                                    </div>
                                    <div className="time-open">
                                        <img src="./images/clock.png" alt=""/>

                                        {item.open_24 ? t("open24") : <>
                                            {item.start_time} {t("from")}
                                            &nbsp;
                                            {item.end_time} {t("to")}
                                        </>}
                                    </div>
                                </div>

                                <div className="services">
                                    {item.hospital_services.map((item, index) => {
                                        return <div key={index} className="service">
                                            {item.service.translations[i18next.language].name}
                                        </div>
                                    })}
                                </div>

                                <div onClick={() => {
                                    navigate("/about-clinic");
                                    localStorage.setItem("clinicId", item.id);
                                    dispatch(getAboutMarker(item.location))
                                }} className="more-btn">
                                    {t("more")}
                                </div>
                            </div>
                        </div>
                    }) : <div className="text-box">
                        <div className="text-no-info">
                            {t("saved_text1")}
                        </div>
                    </div>}
                </div>}

                {tabActive === 2 && <div className="doctors">
                    {doctors.length > 0 ? doctors.map((item, index) => {
                        return <div key={index} className="doctor">
                            <div className="left-side">
                                <img src={item.image} alt=""/>
                                <div className="like">
                                    <img onClick={() => handleSaveClickDoctor(item.id)}
                                         src={savedPostsDoctor.includes(item.id) ? "./images/like.png" : "./images/no-like.png"}
                                         alt=""/>
                                </div>
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
                                            {item.comment_count} {t("comment")}
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
                                        {item.experience} {t("experience")}
                                    </div>
                                </div>

                                <div className="section-location">
                                    <div className="location">
                                        <img src="./images/icon.png" alt=""/>
                                        {item.hospital ? item.hospital.translations[i18next.language].address :
                                            item.translations[i18next.language].address}
                                    </div>

                                    {item.hospital ?
                                        <>
                                            <span></span>
                                            <div className="time-open">
                                                {item.hospital.translations[i18next.language].name}
                                            </div>
                                        </> : ""}
                                </div>

                                <div className="section-location">
                                    <div className="location">
                                        <img src="./images/time.png" alt=""/>
                                        {item.working_days.map((item, index) => {
                                            return <p key={index}>
                                                &nbsp;
                                                {item.translations[i18next.language].day}
                                            </p>
                                        })}
                                    </div>
                                    <span></span>
                                    <div className="time-open">
                                        {item.start_time} {t("from")}
                                        &nbsp;
                                        {item.end_time} {t("to")}
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
                                        <div className="title">{t("first-consultation")}</div>
                                        <div className="number">
                                            {item.consultation_fee ? <>{item.consultation_fee} {t("sum")} </> : t("agreement")}
                                        </div>
                                    </div>

                                    <div className="item-price">
                                        <div className="title">{t("second-consultation")}</div>
                                        <div className="number">
                                            {item.second_consultation_fee ?
                                                <>{item.second_consultation_fee} {t("sum")} </> :
                                                t("agreement")}
                                        </div>
                                    </div>
                                </div>

                                <div className="buttons">
                                    <div className="left-btn">
                                        <div onClick={() => ShowModal("sms", item.user)}
                                             className="button-send">
                                            {t("acceptance")}
                                        </div>
                                        <div onClick={() => ShowModal("contact", item)}
                                             className="button-call">
                                            {t("call")}
                                        </div>
                                    </div>
                                    <div onClick={() => {
                                        localStorage.setItem("doctorId", item.id)
                                        navigate("/about-doctor")
                                        dispatch(getAboutMarker(item.location ? item.location : item.hospital.location))
                                    }} className="more-btn">
                                        {t("more")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }) : <div className="text-box">
                        <div className="text-no-info">
                            {t("saved_text2")}
                        </div>
                    </div>}
                </div>}

                {tabActive === 3 && <div className="pharmacies-box">
                    {pharmacies.length > 0 ?
                        pharmacies.map((item, index) => {
                            return <div key={index} className="pharma">
                                <div className="left-side">
                                    <img src={item.image} alt=""/>
                                    <div className="like">
                                        <img onClick={() => handleSaveClickPharmacy(item.id)}
                                             src={savedPostsPharmacy.includes(item.id) ? "./images/like.png" : "./images/no-like.png"}
                                             alt=""/>
                                    </div>
                                </div>
                                <div className="right-side">
                                    <div className="header-clinic">
                                        <div className="name-clinic">
                                            {item.translations[i18next.language].name}
                                        </div>

                                        <div className="section-commit">
                                            <div className="raiting">
                                                <img src="./images/star2.png" alt=""/>
                                                {item.avg_rating}
                                            </div>
                                            <span></span>
                                            <div className="commit-count">
                                                ({item.comment_count})
                                            </div>
                                        </div>
                                    </div>
                                    <div className="section-location">
                                        <div className="location">
                                            <img src="./images/icon.png" alt=""/>
                                            {item.translations[i18next.language].address}
                                        </div>
                                    </div>

                                    <div className="section-location">
                                        <div className="location">
                                            <img src="./images/time.png" alt=""/>
                                            {item.open_24 ? <div
                                                className="open">{t("open")}</div> : isPlaceOpen(item.start_time, item.end_time) ?
                                                <div className="open">{t("open")}</div> :
                                                <div className="close">{t("close")}</div>}
                                        </div>

                                        <span></span>
                                        <div className="time-open">
                                            {item.open_24 ? t("open24") : <>
                                                {item.start_time} {t("from")}
                                                &nbsp;
                                                {item.end_time} {t("to")}
                                            </>}
                                        </div>
                                    </div>

                                    <div className="buttons">
                                        <div onClick={() => {
                                            localStorage.setItem("pharmacyId", item.id);
                                            dispatch(getAboutMarker(item.location));
                                            navigate("/about-pharmacies")
                                        }}
                                             className="more-btn">
                                            {t("more")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                        : <div className="text-box">
                            <div className="text-no-info">
                                {t("saved_text3")}
                            </div>
                        </div>
                    }
                </div>}
            </div>

            <div className="mobile-navbar-container">
                <MobileNavbar/>
            </div>
            <Footer/>
        </div>

    </>
};

export default Saved