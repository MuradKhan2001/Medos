import "./style-saved.scss"
import Navbar from "../navbar/Navbar";
import {CSSTransition} from "react-transition-group";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Footer from "../footer/Footer";
import {showModals} from "../../redux/ModalContent";
import {useDispatch} from "react-redux";


const Saved = () => {
    const [tabActive, setTabActive] = useState(1);
    const nodeRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [like, setLike] = useState(false);
    const dispatch = useDispatch();

    const Tabs = [
        {id: 1, name: "Shifoxonalar"},
        {id: 2, name: "Doktorlar"},
        {id: 3, name: "Dorixonalar"}
    ];

    const ShowModal = (status) => {
        dispatch(showModals({show: true, status}))
    };

    return <>
        <div className="saved-container">
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

            <div className="content-box">
                <div className="title-saved">
                    Saqlanganlar
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
                    <div className="clinic">
                        <div className="left-side">
                            <img src="./images/clinic.png" alt=""/>
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
                                <div className="name-clinic">Akfa medline</div>
                                <div className="buttons">
                                    <div onClick={()=> ShowModal("contact")} className="button-call">Qo'ng'iroq qilish</div>
                                    <div onClick={() => ShowModal("sms")} className="button-send">Yozish</div>
                                </div>
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
                                <div className="location">
                                    <img src="./images/icon.png" alt=""/>
                                    Olmazor tumani
                                </div>
                                <span></span>
                                <div className="time-open">
                                    <img src="./images/clock.png" alt=""/>
                                    08:00 dan 18:00 gacha
                                </div>
                            </div>
                            <div className="services">
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    EKG
                                </div>
                                <div className="service">
                                    Reografiya
                                </div>
                                <div className="service">
                                    Exo KG
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                            </div>
                            <div onClick={() => navigate("/about-clinic")} className="more-btn">
                                Ko'proq ko'rsatish
                            </div>
                        </div>
                    </div>

                    <div className="clinic">
                        <div className="left-side">
                            <img src="./images/clinic.png" alt=""/>
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
                                <div className="name-clinic">Akfa medline</div>
                                <div className="buttons">
                                    <div onClick={()=> ShowModal("contact")} className="button-call">Qo'ng'iroq qilish</div>
                                    <div onClick={() => ShowModal("sms")} className="button-send">Yozish</div>
                                </div>
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
                                <div className="location">
                                    <img src="./images/icon.png" alt=""/>
                                    Olmazor tumani
                                </div>
                                <span></span>
                                <div className="time-open">
                                    <img src="./images/clock.png" alt=""/>
                                    08:00 dan 18:00 gacha
                                </div>
                            </div>
                            <div className="services">
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    EKG
                                </div>
                                <div className="service">
                                    Reografiya
                                </div>
                                <div className="service">
                                    Exo KG
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                            </div>
                            <div onClick={() => navigate("/about-clinic")} className="more-btn">
                                Ko'proq ko'rsatish
                            </div>
                        </div>
                    </div>

                    <div className="clinic">
                        <div className="left-side">
                            <img src="./images/clinic.png" alt=""/>
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
                                <div className="name-clinic">Akfa medline</div>
                                <div className="buttons">
                                    <div onClick={()=> ShowModal("contact")} className="button-call">Qo'ng'iroq qilish</div>
                                    <div onClick={() => ShowModal("sms")} className="button-send">Yozish</div>
                                </div>
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
                                <div className="location">
                                    <img src="./images/icon.png" alt=""/>
                                    Olmazor tumani
                                </div>
                                <span></span>
                                <div className="time-open">
                                    <img src="./images/clock.png" alt=""/>
                                    08:00 dan 18:00 gacha
                                </div>
                            </div>
                            <div className="services">
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    EKG
                                </div>
                                <div className="service">
                                    Reografiya
                                </div>
                                <div className="service">
                                    Exo KG
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                            </div>
                            <div onClick={() => navigate("/about-clinic")} className="more-btn">
                                Ko'proq ko'rsatish
                            </div>
                        </div>
                    </div>

                    <div className="clinic">
                        <div className="left-side">
                            <img src="./images/clinic.png" alt=""/>
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
                                <div className="name-clinic">Akfa medline</div>
                                <div className="buttons">
                                    <div onClick={()=> ShowModal("contact")} className="button-call">Qo'ng'iroq qilish</div>
                                    <div onClick={() => ShowModal("sms")} className="button-send">Yozish</div>
                                </div>
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
                                <div className="location">
                                    <img src="./images/icon.png" alt=""/>
                                    Olmazor tumani
                                </div>
                                <span></span>
                                <div className="time-open">
                                    <img src="./images/clock.png" alt=""/>
                                    08:00 dan 18:00 gacha
                                </div>
                            </div>
                            <div className="services">
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    EKG
                                </div>
                                <div className="service">
                                    Reografiya
                                </div>
                                <div className="service">
                                    Exo KG
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                                <div className="service">
                                    Stress testlari
                                </div>
                            </div>
                            <div onClick={() => navigate("/about-clinic")} className="more-btn">
                                Ko'proq ko'rsatish
                            </div>
                        </div>
                    </div>

                </div>}

                {tabActive === 2 && <div className="doctors">
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
                                    <div onClick={() => ShowModal("sms")} className="button-send">
                                        Qabuliga yozilish
                                    </div>
                                    <div onClick={()=> ShowModal("contact")} className="button-call">Qo'ng'iroq qilish</div>
                                </div>

                                <div onClick={() => navigate("/about-doctor")} className="more-btn">
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
                                    <div onClick={() => ShowModal("sms")} className="button-send">
                                        Qabuliga yozilish
                                    </div>
                                    <div onClick={()=> ShowModal("contact")} className="button-call">Qo'ng'iroq qilish</div>
                                </div>

                                <div onClick={() => navigate("/about-doctor")} className="more-btn">
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
                                    <div onClick={() => ShowModal("sms")} className="button-send">
                                        Qabuliga yozilish
                                    </div>
                                    <div onClick={()=> ShowModal("contact")} className="button-call">Qo'ng'iroq qilish</div>
                                </div>

                                <div onClick={() => navigate("/about-doctor")} className="more-btn">
                                    Ko'proq ko'rsatish
                                </div>
                            </div>
                        </div>
                    </div>

                </div>}

                {tabActive === 3 && <div className="pharmacies-box">
                    <div className="pharma">
                        <div className="left-side">
                            <img src="./images/pharma.jpeg" alt=""/>
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
                                    Oxymed
                                </div>

                                <div className="section-commit">
                                    <div className="raiting">
                                        <img src="./images/star2.png" alt=""/>
                                        4.88
                                    </div>
                                    <span></span>
                                    <div className="commit-count">
                                        (324)
                                    </div>
                                </div>
                            </div>

                            <div className="section-location">
                                <div className="location">
                                    <img src="./images/icon.png" alt=""/>
                                    Chilonzor tumani
                                </div>
                                <span></span>
                                <div className="time-open">
                                    800m
                                </div>
                            </div>

                            <div className="section-location">
                                <div className="location">
                                    <img src="./images/time.png" alt=""/>
                                    {/*<div className="open">Ochiq</div>*/}
                                    <div className="close">Yopiq</div>
                                </div>
                                <span></span>
                                <div className="time-open">
                                    9:00 - 15:00
                                </div>
                            </div>

                            <div className="buttons">
                                <div onClick={() => navigate("/about-pharmacies")} className="more-btn">
                                    Ko'proq ko'rsatish
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pharma">
                        <div className="left-side">
                            <img src="./images/pharma.jpeg" alt=""/>
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
                                    Oxymed
                                </div>

                                <div className="section-commit">
                                    <div className="raiting">
                                        <img src="./images/star2.png" alt=""/>
                                        4.88
                                    </div>
                                    <span></span>
                                    <div className="commit-count">
                                        (324)
                                    </div>
                                </div>
                            </div>

                            <div className="section-location">
                                <div className="location">
                                    <img src="./images/icon.png" alt=""/>
                                    Chilonzor tumani
                                </div>
                                <span></span>
                                <div className="time-open">
                                    800m
                                </div>
                            </div>

                            <div className="section-location">
                                <div className="location">
                                    <img src="./images/time.png" alt=""/>
                                    {/*<div className="open">Ochiq</div>*/}
                                    <div className="close">Yopiq</div>
                                </div>
                                <span></span>
                                <div className="time-open">
                                    9:00 - 15:00
                                </div>
                            </div>

                            <div className="buttons">
                                <div onClick={() => navigate("/about-pharmacies")} className="more-btn">
                                    Ko'proq ko'rsatish
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pharma">
                        <div className="left-side">
                            <img src="./images/pharma.jpeg" alt=""/>
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
                                    Oxymed
                                </div>

                                <div className="section-commit">
                                    <div className="raiting">
                                        <img src="./images/star2.png" alt=""/>
                                        4.88
                                    </div>
                                    <span></span>
                                    <div className="commit-count">
                                        (324)
                                    </div>
                                </div>
                            </div>

                            <div className="section-location">
                                <div className="location">
                                    <img src="./images/icon.png" alt=""/>
                                    Chilonzor tumani
                                </div>
                                <span></span>
                                <div className="time-open">
                                    800m
                                </div>
                            </div>

                            <div className="section-location">
                                <div className="location">
                                    <img src="./images/time.png" alt=""/>
                                    {/*<div className="open">Ochiq</div>*/}
                                    <div className="close">Yopiq</div>
                                </div>
                                <span></span>
                                <div className="time-open">
                                    9:00 - 15:00
                                </div>
                            </div>

                            <div className="buttons">
                                <div onClick={() => navigate("/about-pharmacies")} className="more-btn">
                                    Ko'proq ko'rsatish
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>

            <Footer/>
        </div>

    </>
};

export default Saved