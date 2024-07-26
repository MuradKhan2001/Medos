import "./style-pharmacies.scss";
import Navbar from "../navbar/Navbar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Footer from "../footer/Footer";
import Map from "../map/Map";
import {useDispatch, useSelector} from "react-redux";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {getLocation} from "../../redux/locationUser";
import {show} from "../../redux/show-map";
import {getPharmacies} from "../../redux/pharmacies";
import MobileNavbar from "../mobile-navbar/MobileNavbar";
import axios from "axios";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import {getAboutMarker} from "../../redux/markerAbout";
import AdvertBox from "../adverts/AdvertBox";


const Pharmacies = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filterService = useSelector((store) => store.Menu.data);
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const Pharmacies = useSelector((store) => store.Pharmacies.data);
    const location = useSelector((store) => store.LocationUser.data);
    const showMap = useSelector((store) => store.ShowMap.data);
    const [regionSelect, setRegionSelect] = useState("");
    const [working24, setWorking24] = useState("");
    const [region, setRegion] = useState("");
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

    useEffect(() => {
        if (location.key + 1 && !filterService) {
            filterHospital(location.key + 1, working24);
            setRegion(location.key + 1);
            setRegionSelect(location.key)
        }
    }, [location]);

    useEffect(() => {
        setSavedPosts(getSavedPosts())
    }, []);

    const filterHospital = (region_key, open_24_key) => {
        let filterBox = {
            region: region_key,
            open_24: open_24_key
        };

        const queryString = Object.entries(filterBox)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        axios.get(`${baseUrl}pharmacy/?${queryString}`).then((response) => {
            dispatch(getPharmacies(response.data));
        })
    };

    const changeRegion = (region, index) => {
        const location = {key: index, "city": region.name, "latitude": region.latitude, "longitude": region.longitude};
        dispatch(getLocation(location));
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

    const NavigateButton = (location) => {
        let latitude = Number(location.split(",")[0]);
        let longitude = Number(location.split(",")[1]);

        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, '_blank');
    };

    return <>
        <div className="pharmacies-wrapper">
            <AdvertBox/>
            <Navbar/>
            <div className="pharmacies-list">
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
                                        filterHospital(region, !working24);
                                        setWorking24(!working24)
                                    }}
                                         className={`button-filter ${working24 ? "active-filter-btn" : ""}`}>
                                        {t("open24")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!showMap && <div className="pharmacies">
                            <div className="pharmacies-box">
                                {
                                    Pharmacies.map((item, index) => {
                                        return <div key={index} className="pharma">
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
                                                        {item.open_24 ? "24 soat ochiq" : <>
                                                            {item.start_time} {t("from")}
                                                            &nbsp;
                                                            {item.end_time} {t("to")}
                                                        </>}
                                                    </div>
                                                </div>
                                                <div className="buttons">
                                                    <div onClick={() => NavigateButton(item.location)}
                                                         className="navigator">
                                                        Navigator
                                                        <img src="./images/compass.png" alt=""/>
                                                    </div>

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
                                }
                            </div>
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

export default Pharmacies