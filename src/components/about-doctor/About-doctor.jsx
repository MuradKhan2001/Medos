import "./clinic-doctor.scss"
import Navbar from "../navbar/Navbar";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Map from "../map/Map";
import Footer from "../footer/Footer";
import {showModals} from "../../redux/ModalContent";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {getAboutMarker} from "../../redux/markerAbout";
import MapAbout from "../map/MapAbout";


const AboutDoctor = () => {
    const {t} = useTranslation();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [like, setLike] = useState(false);
    const [doctor, setDoctor] = useState("");
    const [similarDoctors, setSimilarDoctors] = useState()
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    }, []);

    const ShowModal = (status, item) => {
        dispatch(showModals({show: true, status, item}))
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

                    <div className="info">
                        <div className="items">
                            {doctor.specialty.translations[i18next.language].name}
                        </div>
                        <div className="items">
                            {doctor.experience} yillik tajriba
                        </div>
                    </div>

                    <div className="section-commit">
                        <div className="raiting">
                            {doctor.avg_rating}
                        </div>
                        <span></span>
                        <div className="commit-count">
                            {doctor.comment_count} ta izoh
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

                    <div className="like">
                        {
                            like ?
                                <img onClick={() => setLike(false)} src="./images/like.png" alt=""/> :
                                <img onClick={() => setLike(true)} src="./images/no-like.png" alt=""/>
                        }

                        <div className="name">Saqlash</div>
                    </div>
                </div>

                <div className="buttons">
                    <div className="title">
                        Ish vaqti
                    </div>

                    <div className="date">
                        <img src="./images/calendar.png" alt=""/>
                        {doctor.working_days.map((item, index) => {
                            return <p key={index}>
                                {item.translations[i18next.language].day}
                            </p>
                        })}
                    </div>

                    <div className="date">
                        <img src="./images/clock2.png" alt=""/>
                        {doctor.start_time} dan
                        &nbsp;
                        {doctor.end_time} gacha
                    </div>

                    <div className="line"></div>

                    <div className="title">
                        Xizmat narxi
                    </div>

                    <div className="prices">
                        <div className="item-price">
                            <div className="title">Birinchi konsultatsiya</div>
                            <div className="number">
                                {doctor.consultation_fee ? <>{doctor.consultation_fee} so'm </> : "Kelishuv asosida"}
                            </div>
                        </div>

                        <div className="item-price">
                            <div className="title">Takroriy konsultatsiya</div>
                            <div className="number">
                                {doctor.second_consultation_fee ?
                                    <>{doctor.second_consultation_fee} so'm </> :
                                    "Kelishuv asosida"}
                            </div>
                        </div>
                    </div>

                    <div onClick={() => ShowModal("sms", doctor.user)}
                         className="button-send">
                        Qabuliga yozilish
                    </div>
                    <div onClick={() => ShowModal("contact", doctor)}
                         className="button-call">
                        Qo'ng'iroq qilish
                    </div>
                </div>
            </div>

            <div className="body">
                <div className="all-info-hospital">
                    <div className="title">
                        Doctor haqida
                    </div>
                    <div className="des">
                        {doctor.translations[i18next.language].bio}
                    </div>
                </div>

                <div className="images-location">
                    <div className="title">Ishxona manzili</div>
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
                                {doctor.comment_count} ta izoh
                            </div>
                        </div>

                        <div onClick={() => ShowModal("commit", doctor.user)} className="btn-commit">
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
                </div>

                <div className="doctors-warapper">
                    <div className="title">
                        O'xshash doctorlar
                    </div>

                    {
                        similarDoctors && similarDoctors.map((item, index) => {
                            return <div key={index} className="doctor">
                                <div className="left-side">
                                    <img src={"http://138.197.97.98" + item.image} alt=""/>
                                    <div className="like">
                                        {
                                            like ?
                                                <img onClick={() => setLike(false)} src="./images/like.png"
                                                     alt=""/> :
                                                <img onClick={() => setLike(true)} src="./images/no-like.png"
                                                     alt=""/>
                                        }
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
                                        <div onClick={() => {
                                            localStorage.setItem("doctorId", item.id)
                                            window.location.reload()
                                        }} className="more-btn">
                                            Ko'proq ko'rsatish
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        </div>}

        <Footer/>
    </div>
};

export default AboutDoctor