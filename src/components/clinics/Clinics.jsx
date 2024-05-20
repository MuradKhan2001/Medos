import "./style-clinics.scss";
import Navbar from "../navbar/Navbar";
import {useEffect, useState, useMemo, useRef} from "react";
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


const Clinics = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const clinics = useSelector((store) => store.Clinics.data);
    const filterService = useSelector((store) => store.Menu.data);
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const showMap = useSelector((store) => store.ShowMap.data);
    const location = useSelector((store) => store.LocationUser.data);
    const [like, setLike] = useState(false);
    const [serviceList, setServiceList] = useState([]);
    const [regionSelect, setRegionSelect] = useState("");
    const [hospitalList, setHospitalList] = useState([]);
    const [hospitalType, setHospitalType] = useState("");
    const [region, setRegion] = useState("");
    const [type, setType] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [working24, setWorking24] = useState("");
    const [disable, setDisable] = useState("");
    const [savedPosts, setSavedPosts] = useState([]);

    const regions = [
        {name: "Andijon", latitude: 40.813616, longitude: 72.283463},
        {name: "Buxoro", latitude: 39.767070, longitude: 64.455393},
        {name: "Farg‘ona", latitude: 40.372379, longitude: 71.797770},
        {name: "Jizzax", latitude: 40.119300, longitude: 67.880140},
        {name: "Namangan", latitude: 41.004297, longitude: 71.642956},
        {name: "Navoiy", latitude: 40.096634, longitude: 65.352255},
        {name: "Qashqadaryo", latitude: 38.852124, longitude: 65.784203},
        {name: "Samarqand", latitude: 39.649307, longitude: 66.965182},
        {name: "Sirdaryo", latitude: 40.376986, longitude: 68.713159},
        {name: "Surxondaryo", latitude: 37.931559, longitude: 67.564765},
        {name: "Toshkent", latitude: 41.295695, longitude: 69.239730},
        {name: "Xorazm", latitude: 41.522326, longitude: 60.623731},
        {name: "Qoraqalpog‘iston", latitude: 43.730521, longitude: 59.064533}
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
            filterHospital(hospitalType, location.key + 1, type, speciality, working24, disable);
            setRegion(location.key + 1);
            setRegionSelect(location.key)
        }
    }, [location]);

    const ShowModal = (status, item) => {
        dispatch(showModals({show: true, status, item}))
    };

    const filterHospital = (hospital_type_key, region_key, type_key, speciality_key, open_24_key, disabled_key) => {
        let filterBox = {
            hospital_type: hospital_type_key,
            region: region_key,
            type: type_key,
            speciality: speciality_key,
            open_24: open_24_key,
            disabled: disabled_key
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

    return <>
        <div className="clinics-wrapper">
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
                                        <InputLabel id="demo-select-large-label">Viloyat</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={regionSelect}
                                            label="Viloyat"
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
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                                 className="selectHospitalType">
                                        <InputLabel id="demo-select-large-label">Shifoxona turi</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={type}
                                            label="Shifoxona turi"
                                            onChange={(e) => {
                                                filterHospital(hospitalType, region, e.target.value, speciality, working24, disable);
                                                setType(e.target.value)
                                            }}
                                        >
                                            <MenuItem value={1}>Xususiy</MenuItem>
                                            <MenuItem value={2}>Davlat</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                                 className="selectProfessional">
                                        <InputLabel id="demo-select-large-label">Mutaxasislik</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={speciality}
                                            label="Mutaxasislik"
                                            onChange={(e) => {
                                                filterHospital(hospitalType, region, type, e.target.value, working24, disable);
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
                                        filterHospital(hospitalType, region, type, speciality, !working24, disable);
                                        setWorking24(!working24)
                                    }}
                                         className={`button-filter ${working24 ? "active-filter-btn" : ""}`}>
                                        24 soat ochiq
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <div onClick={() => {
                                        filterHospital(hospitalType, region, type, speciality, working24, !disable);
                                        setDisable(!disable)
                                    }}
                                         className={`button-filter ${disable ? "active-filter-btn" : ""}`}>
                                        Nogironlar uchun imkoniyatlar
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!showMap && <div className="clinics">
                            {clinics.map((item, index) => {
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
                                                     className="button-call">Qo'ng'iroq qilish
                                                </div>
                                                <div onClick={() => ShowModal("sms", item.user)}
                                                     className="button-send">Yozish
                                                </div>
                                            </div>
                                        </div>

                                        <div className="section-commit">
                                            <div className="raiting">
                                                {item.avg_rating}
                                            </div>
                                            <div className="commit-count">
                                                {item.comment_count} ta izoh
                                            </div>
                                        </div>

                                        <div className="section-location">
                                            <div className="location">
                                                <img src="./images/icon.png" alt=""/>
                                                {item.translations[i18next.language].address}
                                            </div>
                                            <div className="time-open">
                                                <img src="./images/clock.png" alt=""/>

                                                {item.open_24 ? "24 soat ochiq" : <>
                                                    {item.start_time} dan
                                                    &nbsp;
                                                    {item.end_time} gacha
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
                                            Ko'proq ko'rsatish
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
                {showMap ? "Orqaga" : "Xaritadan"}
            </div>

            <div className="mobile-navbar-container">
                <MobileNavbar/>
            </div>
        </div>
    </>
};

export default Clinics