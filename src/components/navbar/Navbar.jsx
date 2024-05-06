import {useNavigate, Route, Routes, NavLink} from "react-router-dom";
import "./style-navbar.scss"
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../../redux/locationUser";
import {changeMenu} from "../../redux/menu";

const Navbar = () => {
    const {t} = useTranslation();
    const nodeRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState(false);
    const [searchList, setSearchList] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useSelector((store) => store.LocationUser.data);


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

    const regions = [
        {name: "Andijon", latitude: 40.813616, longitude: 72.283463},
        {name: "Buxoro", latitude: 39.767070, longitude: 64.455393},
        {name: "Farg‘ona", latitude: 40.372379, longitude: 71.797770},
        {name: "Jizzax", latitude: 40.119300, longitude: 67.880140},
        {name: "Namangan", latitude: 41.004297, longitude: 71.642956},
        {name: "Navoiy", latitude: 40.096634, longitude: 65.352255},
        {name: "Qashqadaryo", latitude: 38.852124, longitude: 65.784203},
        {name: "Samarqand", latitude: 39.649307, longitude: 66.965182},
        {name: "Sirdaryo", latitude:40.376986, longitude: 68.713159},
        {name: "Surxondaryo", latitude: 37.931559, longitude: 67.564765},
        {name: "Toshkent", latitude: 41.295695, longitude: 69.239730},
        {name: "Xorazm", latitude: 41.522326, longitude: 60.623731},
        {name: "Qoraqalpog‘iston", latitude: 43.730521, longitude: 59.064533}
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

    const changeRegion = (region) => {
        const location = {"city": region.name, "latitude": region.latitude, "longitude": region.longitude};
        dispatch(getLocation(location));
        setShowModal(false)
    };

    const ChangeMenu = (url)=>{
        dispatch(changeMenu(url))
    };

    return <>
        <div className="navbar-wrapper">

            <CSSTransition
                in={showModal}
                nodeRef={nodeRef}
                timeout={300}
                classNames="alert"
                unmountOnExit
            >
                <div className="modal-sloy">
                    <div className="modal-card">
                        <div className="locations">
                            <div className="header">
                                <div className="xbtn">
                                    <img onClick={() => setShowModal(false)} src="./images/cancel.png" alt=""/>
                                </div>
                            </div>
                            <div className="title">
                                Viloyatni tanlang
                            </div>
                            <div className="regions">
                                {regions.map((item, index) => {
                                    return <div
                                        onClick={() => changeRegion(item)}
                                        key={index}
                                        className={`region ${location.city === item.name ? "active" : ""}`}>{item.name}</div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>

            {
                searchList && <div onClick={() => setSearchList(false)} className="search-sloy"></div>
            }

            <div className="section-header">
                <div onClick={() => setShowModal(true)} className="location-user">
                    <div><img src="./images/loaction.png" alt=""/></div>
                    <div className="title">{location.city}</div>
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
                                return <NavLink onClick={()=> ChangeMenu(item.url)} to={item.url} key={index}
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
                            <div onClick={()=>navigate("/register")} className="register-btn">Ro'yxatdan o'tish</div>
                            <div onClick={() => navigate("/login")} className="login-btn">Profilga kirish</div>
                            <div className="des">
                                Shifoxaona, Shifokor yoki Dorixona qo'shish uchun ro'yxatdan o'ting!
                            </div>
                            <div onClick={() => navigate("/saved")} className="saved">
                                <img src="./images/likes.png" alt=""/>
                                Saqlanganlar
                            </div>
                            <div className="about-platform">
                                <img src="./images/about.png" alt=""/>
                                Dastur haqida
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </>
};

export default Navbar