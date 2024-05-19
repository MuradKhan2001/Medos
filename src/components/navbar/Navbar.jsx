import {useNavigate, Route, Routes, NavLink} from "react-router-dom";
import "./style-navbar.scss"
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {useDispatch, useSelector} from "react-redux";
import {changeMenu} from "../../redux/menu";
import axios from "axios";

const Navbar = () => {
    const {t} = useTranslation();
    const nodeRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState(false);
    const [searchList, setSearchList] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [location, setLocation] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&lan=en`;
            axios.get(`${url}`, {headers: {"Accept-Language": i18next.language}}).then((res) => {
                setLocation(res.data.address.city)
            });
        });
    }, []);

    const Menus = [
        {
            name: t('nav1'),
            url: "/",
        },
        {
            name: t('nav2'),
            url: "/doctors",
        },
        {
            name: t('nav3'),
            url: "/pharmacies",
        }, {
            name: t('nav4'),
            url: "/services",
        }
    ];

    const language = [
        {
            code: "uz",
            name: "UZ",
            country_code: "uz",
        },
        // {
        //     code: "en",
        //     name: "EN",
        //     country_code: "en",
        // },
        {
            code: "ru",
            name: "RU",
            country_code: "ru",
        },
    ];

    const changeLanguage = (code) => {
        localStorage.setItem("lng", code);
        i18next.changeLanguage(code);
    };

    window.onclick = function (event) {
        if (!event.target.matches('.click-profile')) {
            setProfile(false)
        }
    };

    const ChangeMenu = (url) => {
        dispatch(changeMenu(url))
    };

    return <>
        <div className="navbar-wrapper">

            {/*<CSSTransition*/}
            {/*    in={showModal}*/}
            {/*    nodeRef={nodeRef}*/}
            {/*    timeout={300}*/}
            {/*    classNames="alert"*/}
            {/*    unmountOnExit*/}
            {/*>*/}
            {/*    <div className="modal-sloy">*/}
            {/*        <div className="modal-card">*/}
            {/*            <div className="locations">*/}
            {/*                <div className="header">*/}
            {/*                    <div className="xbtn">*/}
            {/*                        <img onClick={() => setShowModal(false)} src="./images/cancel.png" alt=""/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="title">*/}
            {/*                    Viloyatni tanlang*/}
            {/*                </div>*/}
            {/*                <div className="regions">*/}
            {/*                    {regions.map((item, index) => {*/}
            {/*                        return <div*/}
            {/*                            onClick={() => changeRegion(item, index)}*/}
            {/*                            key={index}*/}
            {/*                            className={`region ${location.city === item.name ? "active" : ""}`}>{item.name}</div>*/}
            {/*                    })}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</CSSTransition>*/}

            {
                searchList && <div onClick={() => setSearchList(false)} className="search-sloy"></div>
            }

            <div className="section-header">
                <div className="location-user">
                    <div><img src="./images/loaction.png" alt=""/></div>
                    <div className="title">{location}</div>
                </div>

                <div className="languages-wrapper">
                    <div className="items mr">
                        <div><img src="./images/globe.png" alt=""/></div>
                        {language.map(({code, name, country_code}) => (
                            <div
                                key={country_code}
                                onClick={() => changeLanguage(code)}
                                className={`title ${i18next.language === code ? "title-active" : ""}`}
                            >
                                {name}
                            </div>
                        ))}
                    </div>

                    <div className="items">
                        <div><img src="./images/hear.png" alt=""/></div>
                        <div onClick={() => navigate("/saved")} className="title">Saqlanganlar</div>
                    </div>
                </div>
            </div>

            <div className="section-menu">
                <div className="left-side">
                    <div className="logo">
                        <img src="./images/logo.png" alt=""/>
                    </div>

                    <div className="menu-wrapper">
                        {
                            Menus.map((item, index) => {
                                return <NavLink onClick={() => ChangeMenu(item.url)} to={item.url} key={index}
                                                className={`menu-item ${({isActive}) => isActive ? "active" : ""}`}>
                                    <img src={item.img} alt=""/>
                                    <span> {item.name}</span>
                                </NavLink>
                            })
                        }
                    </div>

                    <div className={`search-box ${searchList ? "active-search" : ""}`}>
                        <div className="icon-search">
                            <img src="./images/search.png" alt="search"/>
                        </div>

                        <input onClick={() => setSearchList(true)} placeholder="Kerakli shifoxonani toping"
                               type="text"/>

                        {searchList && <div className="search-list">

                            <div className="search-none">
                                <div className="title">Ma'lumot topilmadi</div>
                                <div className="des">Qaytadan boshqa so‘z orqali qidirib ko‘ring!</div>
                            </div>
                        </div>}

                        {searchList && <div onClick={() => setSearchList(false)} className="xbtn">
                            <img src="./images/cancel.png" alt=""/>
                        </div>}
                    </div>

                </div>

                <div className={`profile ${profile ? "active-profile" : ""}`}>
                    <div onClick={() => setProfile(!profile)} className="click-profile"></div>
                    <div className="user">
                        <img src="./images/user.png" alt=""/>
                    </div>
                    <div className="menu-icon">
                        <img src="./images/menu.png" alt=""/>
                    </div>

                    {
                        profile && <div className="profile-card">

                            {localStorage.getItem("token") ? <div className="user-profile">
                                    <div className="header-side">
                                        <div className="name">
                                            {i18next.language === "uz" && localStorage.getItem("nameUz")}
                                            {i18next.language === "ru" && localStorage.getItem("nameRu")}
                                        </div>
                                    </div>
                                    <div onClick={() => {
                                        localStorage.getItem("userType") === "Doctor" && navigate("/profile-doctor");
                                        localStorage.getItem("userType") === "Hospital" && navigate("/profile-hospital");
                                        localStorage.getItem("userType") === "Pharmacy" && navigate("/profile-pharmacy");
                                    }} className="btns">
                                        <img src="./images/settings.png" alt=""/>
                                        Sozlamalar
                                    </div>
                                    <div onClick={() => {
                                        localStorage.removeItem("token")
                                        localStorage.removeItem("userId")
                                        localStorage.removeItem("nameUz")
                                        localStorage.removeItem("nameRu")
                                        window.location.reload()
                                    }} className="btns">
                                        <img src="./images/log-out.png" alt=""/>
                                        Profildan chiqish
                                    </div>
                                </div> :
                                <div className="register-card">
                                    <div onClick={() => navigate("/register")} className="register-btn">Ro'yxatdan
                                        o'tish
                                    </div>
                                    <div onClick={() => navigate("/login")} className="login-btn">Profilga kirish</div>
                                    <div className="des">
                                        Shifoxaona, Shifokor yoki Dorixona qo'shish uchun ro'yxatdan o'ting!
                                    </div>
                                    {/*<div onClick={() => navigate("/saved")} className="saved">*/}
                                    {/*    <img src="./images/likes.png" alt=""/>*/}
                                    {/*    Saqlanganlar*/}
                                    {/*</div>*/}
                                    {/*<div className="about-platform">*/}
                                    {/*    <img src="./images/about.png" alt=""/>*/}
                                    {/*    Dastur haqida*/}
                                    {/*</div>*/}
                                </div>}
                        </div>
                    }
                </div>
            </div>
        </div>
    </>
};

export default Navbar