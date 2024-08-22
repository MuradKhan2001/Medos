import {useNavigate, NavLink} from "react-router-dom";
import "./style-navbar.scss"
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeMenu} from "../../redux/menu";
import axios from "axios";
import {getClinics} from "../../redux/clinics";
import {getDoctor} from "../../redux/doctors";
import {getPharmacies} from "../../redux/pharmacies";

const Navbar = () => {
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(false);
    const [searchList, setSearchList] = useState(false);
    const navigate = useNavigate();
    const [location, setLocation] = useState();
    const [locationRu, setLocationRu] = useState();
    const [searchBox, setSearchBox] = useState([]);
    const [inputVal, setInputVal] = useState("");
    const [filterResult, setFilterResult] = useState([]);

    useEffect(() => {
        axios.get(`${baseUrl}search-options/`).then((response) => {
            setSearchBox(response.data);
        });
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&lan=en`;
            axios.get(`${url}`, {headers: {"Accept-Language": "uz"}}).then((res) => {
                setLocation(res.data.address.city)
            });
            axios.get(`${url}`, {headers: {"Accept-Language": "ru"}}).then((res) => {
                setLocationRu(res.data.address.city)
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
        window.location.reload()
    };

    window.onclick = function (event) {
        if (!event.target.matches('.click-profile')) {
            setProfile(false)
        }
    };

    const filterData = (searchBox, searchValue) => {
        const lowerCaseSearchValue = searchValue.toLowerCase();

        const filterHospitals = (hospitals) => {
            return hospitals && hospitals.filter(hospital =>
                Object.values(hospital.translations).some(translation =>
                    translation.name.toLowerCase().includes(lowerCaseSearchValue)
                )
            );
        };

        const filterDoctors = (doctors) => {
            return doctors && doctors.filter(doctor =>
                Object.values(doctor.translations).some(translation => {
                    const fullName = `${translation.first_name} ${translation.middle_name} ${translation.last_name}`.toLowerCase();
                    return fullName.includes(lowerCaseSearchValue);
                })
            );
        };

        const filterPharmacies = (pharmacies) => {
            return pharmacies && pharmacies.filter(pharmacy =>
                Object.values(pharmacy.translations).some(translation =>
                    translation.name.toLowerCase().includes(lowerCaseSearchValue)
                )
            );
        };

        const filterServices = (services) => {
            return services && services.filter(service =>
                Object.values(service.translations).some(translation =>
                    translation.name.toLowerCase().includes(lowerCaseSearchValue)
                )
            );
        };

        let find1 = filterHospitals(searchBox.hospitals);
        let find2 = filterDoctors(searchBox.doctors);
        let find3 = filterPharmacies(searchBox.pharmacy);
        let find4 = filterServices(searchBox.services);

        return {
            hospitals: find1,
            doctors: find2,
            pharmacy: find3,
            services: find4,
            found: (find1 && find1.length > 0 || find2 && find2.length > 0 || find3 && find3.length > 0 || find4 && find4.length > 0)
        };
    };

    const handleSearch = (e) => {

        setInputVal(e.target.value);
        const filteredResults = filterData(searchBox, e.target.value);
        setFilterResult(filteredResults);
    };

    const getInformation = (status, item) => {

        if (status === "hospital") {
            axios.get(`${baseUrl}hospital/?name=${item.translations["uz"].name}`).then((response) => {
                dispatch(getClinics(response.data));
                dispatch(changeMenu(true));
                navigate("/")
                setSearchList(false)
            })
        }

        if (status === "doctor") {
            axios.get(`${baseUrl}doctor/?first_name=${item.translations["uz"].first_name}&last_name=${item.translations["uz"].last_name}`).then((response) => {
                dispatch(getDoctor(response.data));
                dispatch(changeMenu(true));
                navigate("/doctors");
                setSearchList(false)
            })
        }

        if (status === "pharmacy") {
            axios.get(`${baseUrl}pharmacy/?name=${item.translations["uz"].name}`).then((response) => {
                dispatch(getPharmacies(response.data));
                dispatch(changeMenu(true));
                navigate("/pharmacies");
                setSearchList(false)
            })
        }

        if (status === "service") {
            axios.post(`${baseUrl}filter-hospital/`, {sub_service: item.id}).then((response) => {
                dispatch(getClinics(response.data));
                dispatch(changeMenu(true));
                navigate("/")
                setSearchList(false)
            });
        }
    };

    return <>
        <div className="navbar-wrapper">
            {
                searchList && <div onClick={() => setSearchList(false)} className="search-sloy"></div>
            }
            <div className="section-header">
                <div className="location-user">
                    <div><img src="./images/address.png" alt=""/></div>
                    <div className="title">
                        {i18next.language === "uz" && location}
                        {i18next.language === "ru" && locationRu}
                    </div>
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
                        <div onClick={() => navigate("/saved")} className="title">
                            {t("saved")}
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-menu">
                <div className="left-side">
                    <div className="logo">
                        <img onClick={() => navigate("/")} src="./images/logo2.png" alt=""/>
                    </div>
                    <div className="menu-wrapper">
                        {
                            Menus.map((item, index) => {
                                return <NavLink to={item.url} key={index}
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

                        <input onChange={handleSearch} onClick={() => setSearchList(true)}
                               placeholder={t("search-placeholder")}
                               type="text"/>

                        {searchList && <div
                            className={`search-list`}>

                            {inputVal && <div>
                                {filterResult.services && filterResult.services.length > 0 &&
                                <div className="search-title">{t("nav4")}</div>}
                                {filterResult.services && filterResult.services.map((item, index) => {
                                    return <div onClick={() => getInformation("service", item)} key={index}
                                                className="search-result">
                                        <div className="icon">
                                            <img src="./images/searchicon2.png" alt=""/>
                                        </div>
                                        {item.translations[i18next.language].name}
                                    </div>
                                })}

                                {filterResult.hospitals && filterResult.hospitals.length > 0 &&
                                <div className="search-title">{t("nav1")}</div>}
                                {filterResult.hospitals && filterResult.hospitals.map((item, index) => {
                                    return <div onClick={() => getInformation("hospital", item)} key={index}
                                                className="search-result">
                                        <div className="icon">
                                            <img src="./images/searchicon3.png" alt=""/>
                                        </div>
                                        {item.translations[i18next.language].name}
                                    </div>
                                })}

                                {filterResult.doctors && filterResult.doctors.length > 0 &&
                                <div className="search-title">{t("nav2")}</div>}
                                {filterResult.doctors && filterResult.doctors.map((item, index) => {
                                    return <div onClick={() => getInformation("doctor", item)} key={index}
                                                className="search-result">
                                        <div className="icon">
                                            <img src="./images/searchicon1.png" alt=""/>
                                        </div>
                                        {item.translations[i18next.language].first_name} &nbsp;
                                        {item.translations[i18next.language].last_name}
                                    </div>
                                })}

                                {filterResult.pharmacy && filterResult.pharmacy.length > 0 &&
                                <div className="search-title">{t("nav3")}</div>}
                                {filterResult.pharmacy && filterResult.pharmacy.map((item, index) => {
                                    return <div onClick={() => getInformation("pharmacy", item)} key={index}
                                                className="search-result">
                                        <div className="icon">
                                            <img src="./images/pill.png" alt=""/>
                                        </div>
                                        {item.translations[i18next.language].name}
                                    </div>
                                })}

                                {!filterResult.found && <div className="search-none">
                                    <div className="title">{t("norFoundText1")}</div>
                                    <div className="des">{t("norFoundText2")}</div>
                                </div>}
                            </div>}
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
                            <div className="content">
                                {localStorage.getItem("token") ? <div className="user-profile">
                                        <div className="header-side">
                                            <div className="name">
                                                {i18next.language === "uz" && localStorage.getItem("nameUz")}
                                                {i18next.language === "ru" && localStorage.getItem("nameRu")}
                                            </div>
                                        </div>

                                        {/*<div onClick={() => navigate("/balance")} className="btns">*/}
                                        {/*    <img src="./images/cash.png" alt=""/>*/}
                                        {/*    {t("Mening hisobim")}*/}
                                        {/*</div>*/}

                                        <div onClick={() => {
                                            if (localStorage.getItem("profile") !== "false") {
                                                localStorage.getItem("userType") === "Doctor" && navigate("/profile-doctor");
                                                localStorage.getItem("userType") === "Hospital" && navigate("/profile-hospital");
                                                localStorage.getItem("userType") === "Pharmacy" && navigate("/profile-pharmacy");
                                            } else {
                                                if (localStorage.getItem("userType") === "Doctor") {
                                                    window.location.pathname = "/register-doctor"

                                                } else if (localStorage.getItem("userType") === "Hospital") {
                                                    window.location.pathname = "/register-hospital"

                                                } else if (localStorage.getItem("userType") === "Pharmacy") {
                                                    window.location.pathname = "/register-pharmacies"

                                                }
                                            }
                                        }} className="btns">
                                            <img src="./images/settings.png" alt=""/>
                                            {t("settings")}
                                        </div>

                                        {(localStorage.getItem("userType") === "Doctor" ||
                                            localStorage.getItem("userType") === "Hospital") &&
                                        <div onClick={() => {
                                            navigate("/messages");
                                        }} className="btns">
                                            <img src="./images/email.png" alt=""/>
                                            {t("messages")}
                                        </div>}

                                        <div onClick={() => {
                                            localStorage.removeItem("token")
                                            localStorage.removeItem("userId")
                                            localStorage.removeItem("nameUz")
                                            localStorage.removeItem("nameRu")
                                            window.location.reload()
                                        }} className="btns">
                                            <img src="./images/log-out.png" alt=""/>
                                            {t("log-out")}
                                        </div>

                                    </div> :
                                    <div className="register-card">
                                        <div onClick={() => navigate("/register")} className="register-btn">
                                            {t("register")}
                                        </div>
                                        <div onClick={() => navigate("/login")} className="login-btn">
                                            {t("login")}
                                        </div>
                                        <div className="des">
                                            {t("login-des")}
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </>
};

export default Navbar