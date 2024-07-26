import "./style-clinics.scss";
import Navbar from "../navbar/Navbar";
import {useEffect, useState} from "react";
import {MenuItem, InputLabel, FormControl, Select} from "@mui/material";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {useNavigate} from "react-router-dom";
import Footer from "../footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import Map from "../map/Map";
import {showModals} from "../../redux/ModalContent";
import axios from "axios";
import {getLocation} from "../../redux/locationUser";
import {getClinics} from "../../redux/clinics";
import {getAboutMarker} from "../../redux/markerAbout";
import MobileNavbar from "../mobile-navbar/MobileNavbar";
import {show} from "../../redux/show-map";
import AdvertBox from "../adverts/AdvertBox";


const Clinics = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const clinics = useSelector((store) => store.Clinics.data);
    const filterService = useSelector((store) => store.Menu.data);
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const showMap = useSelector((store) => store.ShowMap.data);
    const location = useSelector((store) => store.LocationUser.data);
    const [serviceList, setServiceList] = useState([]);
    const [regionSelect, setRegionSelect] = useState("");
    const [hospitalList, setHospitalList] = useState([]);
    const [hospitalType, setHospitalType] = useState("");
    const [region, setRegion] = useState("");
    const [type, setType] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [working24, setWorking24] = useState("");
    const [disable, setDisable] = useState("");
    const [emergency_number, setEmergency_number] = useState("");
    const [savedPosts, setSavedPosts] = useState([]);

    const regions = [
        {name: t("Andijan"), latitude: 40.813616, longitude: 72.283463},
        {name: t("Bukhara"), latitude: 39.767070, longitude: 64.455393},
        {name: t("Ferghana"), latitude: 40.372379, longitude: 71.797770},
        {name: t("Jizzakh"), latitude: 40.119300, longitude: 67.880140},
        {name: t("Namangan"), latitude: 41.004297, longitude: 71.642956},
        {name: t("Navoi"), latitude: 40.096634, longitude: 65.352255},
        {name: t("Kashkadarya"), latitude: 38.852124, longitude: 65.784203},
        {name: t("Samarkand"), latitude: 39.649307, longitude: 66.965182},
        {name: t("SyrDarya"), latitude: 40.376986, longitude: 68.713159},
        {name: t("Surkhandarya"), latitude: 37.931559, longitude: 67.564765},
        {name: t("Tashkent"), latitude: 41.295695, longitude: 69.239730},
        {name: t("Khorezm"), latitude: 41.522326, longitude: 60.623731},
        {name: t("Karakalpakstan"), latitude: 43.730521, longitude: 59.064533}
    ];

    useEffect(() => {
        axios.get(`${baseUrl}hospital-type/`).then((response) => {
            setHospitalList(response.data)
        }).catch((error) => {
        });

        axios.get(`${baseUrl}speciality/`).then((response) => {
            setServiceList(response.data)
        }).catch((error) => {
        });

        setSavedPosts(getSavedPosts())
    }, []);

    useEffect(() => {
        if (location.key + 1 && !filterService) {
            filterHospital(hospitalType, location.key + 1, type, speciality, working24, disable, emergency_number);
            setRegion(location.key + 1);
            setRegionSelect(location.key)
        }
    }, [location]);

    const ShowModal = (status, item) => {
        dispatch(showModals({show: true, status, item}))
    };

    const filterHospital = (hospital_type_key, region_key, type_key, speciality_key, open_24_key, disabled_key, emergency_number_key) => {
        let filterBox = {
            hospital_type: hospital_type_key,
            region: region_key,
            type: type_key,
            speciality: speciality_key,
            open_24: open_24_key,
            disabled: disabled_key,
            emergency_number: emergency_number_key
        };

        const queryString = Object.entries(filterBox)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        axios.get(`${baseUrl}hospital/?${queryString}`).then((response) => {
            dispatch(getClinics(response.data));
        })
    };

    const changeRegion = (region, index) => {
        const location = {key: index, "city": region.name, "latitude": region.latitude, "longitude": region.longitude};
        dispatch(getLocation(location));
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

    const NavigateButton = (location) => {
        let latitude = Number(location.split(",")[0]);
        let longitude = Number(location.split(",")[1]);

        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, '_blank');
    };

    return <>
        <div className="clinics-wrapper">
           <AdvertBox/>
            <Navbar/>
            <div className="clinics-list">
                <div className="category-wrapper">
                    {
                        hospitalList.map((item, index) => {
                            return <div key={index}>
                                <div onClick={() => {
                                    setHospitalType(item.id)
                                    filterHospital(item.id, region, type, speciality, working24, disable);
                                }}
                                     className={`category-name ${hospitalType === item.id ? "active" : ""}`}>
                                    {item.translations[i18next.language].name}
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="bottom-content">
                    <div className={showMap ? "left-side-hide" : "left-side"}>
                        <div className="category-wrapper">
                            <div>
                                <div className="dropdown-filter">
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                                 className="selectProfessional">
                                        <InputLabel id="demo-select-large-label">{t("region")}</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={regionSelect}
                                            label={t("region")}
                                            onChange={(e) => {
                                                setRegion(e.target.value)
                                                setRegionSelect(e.target.value)
                                            }}
                                        >
                                            {regions.map((item, index) => {
                                                return <MenuItem onClick={() => changeRegion(item, index)}
                                                                 key={index + 1}
                                                                 value={index}>
                                                    {item.name}
                                                </MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <div onClick={() => {
                                        filterHospital(hospitalType, region, type, speciality, working24, disable, !emergency_number);
                                        setEmergency_number(!emergency_number)
                                    }}
                                         className={`button-filter ${emergency_number ? "active-filter-btn" : ""}`}>
                                        {t("emergency")}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                                 className="selectHospitalType">
                                        <InputLabel id="demo-select-large-label">{t("hospital_type")}</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={type}
                                            label={t("hospital_type")}
                                            onChange={(e) => {
                                                filterHospital(hospitalType, region, e.target.value, speciality, working24, disable, emergency_number);
                                                setType(e.target.value)
                                            }}
                                        >
                                            <MenuItem value={1}>{t("hospital_type1")}</MenuItem>
                                            <MenuItem value={2}>{t("hospital_type2")}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                                 className="selectProfessional">
                                        <InputLabel id="demo-select-large-label">{t("expertise")}</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={speciality}
                                            label={t("expertise")}
                                            onChange={(e) => {
                                                filterHospital(hospitalType, region, type, e.target.value, working24, disable, emergency_number);
                                                setSpeciality(e.target.value)
                                            }}
                                        >
                                            {serviceList.map((item, index) => {
                                                return <MenuItem key={index} value={item.id}>
                                                    {item.translations[i18next.language].name}
                                                </MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <div onClick={() => {
                                        filterHospital(hospitalType, region, type, speciality, !working24, disable, emergency_number);
                                        setWorking24(!working24)
                                    }}
                                         className={`button-filter ${working24 ? "active-filter-btn" : ""}`}>
                                        {t("open24")}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <div onClick={() => {
                                        filterHospital(hospitalType, region, type, speciality, working24, !disable, emergency_number);
                                        setDisable(!disable)
                                    }}
                                         className={`button-filter ${disable ? "active-filter-btn" : ""}`}>
                                        {t("disable")}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!showMap && <div className="clinics">
                            {clinics.length > 0 && clinics.map((item, index) => {
                                return <div key={index} className="clinic">
                                    <div className="left-side">
                                        <img src={item.image} alt=""/>
                                        <div className="like">
                                            <img onClick={() => handleSaveClick(item.id)}
                                                 src={savedPosts.includes(item.id) ? "./images/like.png" : "./images/no-like.png"}
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
                                                     className="button-call">{t("call")}
                                                </div>
                                                <div onClick={() => ShowModal("sms", item.user)}
                                                     className="button-send">{t("acceptance2")}
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
                                                {/*{item.translations[i18next.language].address}*/}
                                            </div>
                                            <div className="time-open">
                                                <img src="./images/clock.png" alt=""/>

                                                {item.open_24 ? "24 soat ochiq" : <>
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

                                        <div className="btns">
                                            <div onClick={() => {
                                                navigate("/about-clinic");
                                                localStorage.setItem("clinicId", item.id);
                                                dispatch(getAboutMarker(item.location))
                                            }} className="more-btn">
                                                {t("more")}
                                            </div>
                                            <div className="left-btn">
                                                {item.emergency_number &&
                                                <a href={`tel:${item.emergency_number}`} className="emergency">
                                                    <img src="./images/phone-call.png" alt=""/>
                                                    {item.emergency_number}
                                                </a>}

                                                <div onClick={() => NavigateButton(item.location)}
                                                     className="navigator">
                                                    Navigator
                                                    <img src="./images/compass.png" alt=""/>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            })}
                            <Footer/>
                        </div>}
                    </div>
                    <div className={`right-side ${showMap ? "show-map" : ""}`}>
                        <Map/>
                    </div>
                </div>
            </div>
            <div onClick={() => dispatch(show(!showMap))} className="map-mobile">
                {showMap ? <img className="prev-to" src="./images/next-btn.png" alt=""/> :
                    <img src="./images/map-mobile.png" alt=""/>}
                {showMap ? t("prev") : t("map")}
            </div>
            <div className="mobile-navbar-container">
                <MobileNavbar/>
            </div>
        </div>
    </>
};

export default Clinics