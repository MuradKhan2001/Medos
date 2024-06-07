import "./clinic-doctor.scss"
import Navbar from "../navbar/Navbar";
import {useEffect, useState} from "react";
import Footer from "../footer/Footer";
import {showModals} from "../../redux/ModalContent";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {getAboutMarker} from "../../redux/markerAbout";
import MapAbout from "../map/MapAbout";
import MobileNavbar from "../mobile-navbar/MobileNavbar";


const AboutDoctor = () => {
    const {t} = useTranslation();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [like, setLike] = useState(false);
    const [doctor, setDoctor] = useState("");
    const [similarDoctors, setSimilarDoctors] = useState();
    const [comments, setComments] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${baseUrl}doctor/${localStorage.getItem("doctorId")}/`).then((response) => {
            setDoctor(response.data);
            axios.get(`${baseUrl}comment/${response.data.user}/`).then((response) => {
                setComments(response.data)
            });
            dispatch(getAboutMarker(response.data.location ? response.data.location : response.data.hospital.location));
        });

        axios.get(`${baseUrl}doctor/${localStorage.getItem("doctorId")}/similar/`).then((response) => {
            setSimilarDoctors(response.data)
        });
        setSavedPosts(getSavedPosts())
    }, []);

    const ShowModal = (status, item) => {
        dispatch(showModals({show: true, status, item}))
    };

    const getSavedPosts = () => {
        const savedPosts = localStorage.getItem('doctor_saved');
        return savedPosts ? JSON.parse(savedPosts) : [];
    };

    const handleSaveClick = (postId) => {
        let updatedSavedPosts = [...savedPosts];

        if (savedPosts.includes(postId)) {
            updatedSavedPosts = updatedSavedPosts.filter(id => id !== postId);
        } else {
            updatedSavedPosts.push(postId);
        }

        localStorage.setItem('doctor_saved', JSON.stringify(updatedSavedPosts));
        setSavedPosts(updatedSavedPosts);
    };

    const NavigateButton = (location) => {
        let latitude = Number(location.split(",")[0]);
        let longitude = Number(location.split(",")[1]);

        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, '_blank');
    };

    return <div className="about-doctor-box">
        <Navbar/>

        {doctor &&
        <div className="about-hospital">
            <div className="header">
                <div className="photo-doctor">
                    <img src={doctor.image} alt=""/>
                </div>

                <div className="infotmation-doctor">
                    <div className="title">
                        {doctor.translations[i18next.language].first_name} &nbsp;
                        {doctor.translations[i18next.language].last_name} &nbsp;
                        {doctor.translations[i18next.language].middle_name}
                    </div>

                    <div className="social-medias-icons">
                        {doctor.doctor_socials.map((item, index) => {
                            return <a key={index} href={item.url} target="_blank">
                                <img src={`./images/social-media/${item.key}.png`} alt=""/>
                            </a>
                        })}
                    </div>

                    <div className="info">
                        <div className="items">
                            {doctor.specialty.translations[i18next.language].name}
                        </div>
                        <div className="items">
                            {doctor.experience} {t("experience")}
                        </div>
                    </div>

                    <div className="section-commit">
                        <div className="raiting">
                            {doctor.avg_rating}
                        </div>
                        <span></span>
                        <div className="commit-count">
                            {doctor.comment_count} {t("comment")}
                        </div>
                    </div>

                    <div className="location">
                        {doctor.hospital ? doctor.hospital.translations[i18next.language].address :
                            doctor.translations[i18next.language].address}
                    </div>

                    <div className="skills">
                        {doctor.sub_speciality.map((item, index) => {
                            return <div key={index} className="skill">
                                {item.translations[i18next.language].name}
                            </div>
                        })}
                    </div>

                    <div onClick={() => handleSaveClick(doctor.id)} className="like">
                        <img src={savedPosts.includes(doctor.id) ? "./images/like.png" : "./images/no-like.png"}
                             alt=""/>
                        <div className="name">{t("save")}</div>
                    </div>

                    <div onClick={() => NavigateButton(doctor.location)}
                         className="navigator">
                        Navigator
                        <img src="./images/compass.png" alt=""/>
                    </div>
                </div>

                <div className="buttons">
                    <div className="title">
                        {t("working-time")}
                    </div>

                    <div className="date">
                        <img src="./images/calendar.png" alt=""/>
                        {doctor.working_days.map((item, index) => {
                            return <p key={index}>
                                &nbsp;
                                {item.translations[i18next.language].day}
                            </p>
                        })}
                    </div>

                    <div className="date">
                        <img src="./images/clock2.png" alt=""/>
                        {doctor.start_time} {t("from")}
                        &nbsp;
                        {doctor.end_time} {t("to")}
                    </div>

                    <div className="line"></div>

                    <div className="title">
                        {t("price-service")}
                    </div>

                    <div className="prices">
                        <div className="item-price">
                            <div className="title">{t("first-consultation")}</div>
                            <div className="number">
                                {doctor.consultation_fee ? <>{doctor.consultation_fee} {t("sum")} </> : t("agreement")}
                            </div>
                        </div>

                        <div className="item-price">
                            <div className="title">{t("second-consultation")}</div>
                            <div className="number">
                                {doctor.second_consultation_fee ?
                                    <>{doctor.second_consultation_fee} {t("sum")} </> :
                                    t("agreement")}
                            </div>
                        </div>
                    </div>

                    <div onClick={() => ShowModal("sms", doctor.user)}
                         className="button-send">
                        {t("acceptance")}
                    </div>
                    <div onClick={() => ShowModal("contact", doctor)}
                         className="button-call">
                        {t("call")}
                    </div>
                </div>
            </div>

            <div className="body">
                <div className="all-info-hospital">
                    <div className="title">
                        {t("doctor")}
                    </div>
                    <div className="des">
                        {doctor.translations[i18next.language].bio}
                    </div>
                </div>

                <div className="images-location">
                    <div className="title">{t("")}</div>
                    <div className="location">
                        <img src="./images/loaction.png" alt=""/>
                        {doctor.hospital ? doctor.hospital.translations[i18next.language].address :
                            doctor.translations[i18next.language].address}
                    </div>
                    <div className="location-box">
                        <MapAbout/>
                    </div>
                </div>

                <div className="comments-box">
                    <div className="header-commet">
                        <div className="counts">
                            <div className="raiting">
                                {doctor.avg_rating}
                            </div>
                            <div className="commit-count">
                                {doctor.comment_count} {t("comment")}
                            </div>
                        </div>

                        <div onClick={() => ShowModal("commit", doctor.user)} className="btn-commit">
                            <img src="./images/comit.png" alt=""/>
                            {t("comment-btn")}
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
                </div>

                <div className="doctors-warapper">
                    <div className="title">
                        {t("more-doctors")}
                    </div>
                    {
                        similarDoctors && similarDoctors.map((item, index) => {
                            return <div key={index} className="doctor">
                                <div className="left-side">
                                    <img src={"https://api.medos.uz/" + item.image} alt=""/>
                                    <div className="like">
                                        <img onClick={() => handleSaveClick(item.id)}
                                             src={savedPosts.includes(item.id) ? "./images/like.png" : "./images/no-like.png"}
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
                                                    {item.translations[i18next.language].day},
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
                                            window.location.reload()
                                        }} className="more-btn">
                                            {t("more")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>}

        <div className="mobile-navbar-container">
            <MobileNavbar/>
        </div>
        <Footer/>
    </div>
};

export default AboutDoctor