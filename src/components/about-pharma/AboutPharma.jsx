import "./style-pharma.scss"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {showModals} from "../../redux/ModalContent";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {getAboutMarker} from "../../redux/markerAbout";
import i18next from "i18next";
import MapAbout from "../map/MapAbout";
import MobileNavbar from "../mobile-navbar/MobileNavbar";

const AboutPharma = () => {
    const {t} = useTranslation();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [pharmacy, setPharmacy] = useState("");
    const [comments, setComments] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${baseUrl}pharmacy/${localStorage.getItem("pharmacyId")}/`).then((response) => {
            setPharmacy(response.data);
            axios.get(`${baseUrl}comment/${response.data.user}/`).then((response) => {
                setComments(response.data)
            });
            dispatch(getAboutMarker(response.data.location));
        });
        setSavedPosts(getSavedPosts())
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

    const getSavedPosts = () => {
        const savedPosts = localStorage.getItem('pharmacy_saved');
        return savedPosts ? JSON.parse(savedPosts) : [];
    };

    const handleSaveClick = (postId) => {
        let updatedSavedPosts = [...savedPosts];

        if (savedPosts.includes(postId)) {
            updatedSavedPosts = updatedSavedPosts.filter(id => id !== postId);
        } else {
            updatedSavedPosts.push(postId);
        }

        localStorage.setItem('pharmacy_saved', JSON.stringify(updatedSavedPosts));
        setSavedPosts(updatedSavedPosts);
    };

    return <div className="about-pharmacies">
        <Navbar/>
        {pharmacy && <div className="pharmaci-box">
            <div className="header">
                <img src={pharmacy.image} alt=""/>
            </div>
            <div className="title-pahrma">
                {pharmacy.translations[i18next.language].name}
            </div>

            <div onClick={() => handleSaveClick(pharmacy.id)} className="like">
                <img
                    src={savedPosts.includes(pharmacy.id) ? "./images/like.png" : "./images/no-like.png"}
                    alt=""/>

                <div className="name">{t("save")}</div>
            </div>
            <div className="section-commit">
                <div className="raiting">
                    {pharmacy.avg_rating}
                </div>
                <div className="commit-count">
                    {pharmacy.comment_count} {t("comment")}
                </div>
                <span></span>
                <div className="name">
                    {t("pharmacy")}
                </div>
            </div>
            <div className="section-commit">
                {pharmacy.open_24 ? <div
                    className="open">{t("open")}</div> : isPlaceOpen(pharmacy.start_time, pharmacy.end_time) ?
                    <div className="open">{t("open")}</div> :
                    <div className="close">{t("close")}</div>}
                <span></span>
                <div className="name">
                    {pharmacy.open_24 ? "24 soat ochiq" : <>
                        {pharmacy.start_time} {t("from")}
                        &nbsp;
                        {pharmacy.end_time} {t("to")}
                    </>}
                </div>
            </div>
            <div className="map-locations">
                <div className="map-side">
                    <MapAbout/>
                </div>
                <div className="information-location">
                    <div className="title">
                        <img src="./images/loaction-pharma.png" alt=""/>
                        {t("address-pharmacy")}
                    </div>
                    <div className="info">
                        {pharmacy.translations[i18next.language].address}
                    </div>
                    <div className="title">
                        <img src="./images/time-pharma.png" alt=""/>
                        {t("working-time")}
                    </div>
                    <div className="section-commit">
                        <div className="name">
                            {pharmacy.open_24 ? t("open24") : <>
                                {pharmacy.start_time} {t("from")}
                                &nbsp;
                                {pharmacy.end_time} {t("to")}
                            </>}
                        </div>
                    </div>
                    <div className="title">
                        <img src="./images/phone-pharma.png" alt=""/>
                        {t("contact")}
                    </div>
                    <div className="contact">
                        {pharmacy.phone1} <br/>
                        {pharmacy.phone2}
                    </div>
                </div>
            </div>
            <div className="comments-box">
                <div className="header-commet">
                    <div className="counts">
                        <div className="raiting">
                            {pharmacy.avg_rating}
                        </div>
                        <div className="commit-count">
                            {pharmacy.comment_count}{t("comment")}
                        </div>
                    </div>
                    <div onClick={() => ShowModal("commit", pharmacy.user)} className="btn-commit">
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
        </div>}
        <div className="mobile-navbar-container">
            <MobileNavbar/>
        </div>
        <Footer/>
    </div>
};

export default AboutPharma