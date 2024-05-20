import "./style-doctors.scss";
import Navbar from "../navbar/Navbar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Footer from "../footer/Footer";
import Map from "../map/Map";
import {useDispatch, useSelector} from "react-redux";
import {showModals} from "../../redux/ModalContent";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {getLocation} from "../../redux/locationUser";
import {show} from "../../redux/show-map";
import {getDoctor} from "../../redux/doctors";
import axios from "axios";
import MobileNavbar from "../mobile-navbar/MobileNavbar";
import i18next from "i18next";
import {getAboutMarker} from "../../redux/markerAbout";

const Doctors = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filterService = useSelector((store) => store.Menu.data);
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const Doctors = useSelector((store) => store.Doctors.data);
    const [like, setLike] = useState(false);
    const showMap = useSelector((store) => store.ShowMap.data);
    const [serviceList, setServiceList] = useState([]);
    const [regionSelect, setRegionSelect] = useState("");
    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");
    const [cost, setCost] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [savedPosts, setSavedPosts] = useState([]);

    const location = useSelector((store) => store.LocationUser.data);

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
        axios.get(`${baseUrl}speciality/`).then((response) => {
            setServiceList(response.data)
        }).catch((error) => {
        });

        setSavedPosts(getSavedPosts())
    }, []);

    useEffect(() => {
        if (location.key + 1 && !filterService) {
            filterHospital(location.key + 1, gender, cost, speciality);
            setRegion(location.key + 1);
            setRegionSelect(location.key)
        }
    }, [location]);

    const filterHospital = (region_key, gender_key, cost_key, speciality_key) => {
        let filterBox = {
            region: region_key,
            gender: gender_key,
            cost: cost_key,
            specialty: speciality_key,
        };

        const queryString = Object.entries(filterBox)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        axios.get(`${baseUrl}doctor/?${queryString}`).then((response) => {
            dispatch(getDoctor(response.data));
        })
    };

    const changeRegion = (region, index) => {
        const location = {key: index, "city": region.name, "latitude": region.latitude, "longitude": region.longitude};
        dispatch(getLocation(location));
    };

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

    return <>
        <div className="doctors-wrapper">
            <Navbar/>
            <div className="doctors-list">
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
                                        <InputLabel id="demo-select-large-label">Jinsi</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={gender}
                                            label="Jinsi"
                                            onChange={(e) => {
                                                filterHospital(region, e.target.value, cost, speciality);
                                                setGender(e.target.value)
                                            }}
                                        >
                                            <MenuItem value={true}>Erkak</MenuItem>
                                            <MenuItem value={false}>Ayol</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                                 className="price">
                                        <InputLabel id="demo-select-large-label">Narx</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={cost}
                                            label="Narx"
                                            onChange={(e) => {
                                                filterHospital(region, gender, e.target.value, speciality);
                                                setCost(e.target.value)
                                            }}
                                        >
                                            <MenuItem value={true}>Arzondan- qimmatgacha</MenuItem>
                                            <MenuItem value={false}>Qimmatdan- arzongacha</MenuItem>
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
                                                filterHospital(region, gender, cost, e.target.value);
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
                        </div>

                        {!showMap && <div className="doctors">

                            {Doctors.map((item, index) => {
                                return <div key={index} className="doctor">
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
                                                navigate("/about-doctor")
                                                dispatch(getAboutMarker(item.location ? item.location : item.hospital.location))
                                            }} className="more-btn">
                                                Ko'proq ko'rsatish
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}


                            {/*<div className="pagination-box">*/}
                            {/*    <div className="prev-btn">*/}
                            {/*        <img src="./images/arrow.png" alt=""/>*/}
                            {/*    </div>*/}

                            {/*    <div className="pagination-items">*/}
                            {/*        1*/}
                            {/*    </div>*/}
                            {/*    <div className="pagination-items">*/}
                            {/*        2*/}
                            {/*    </div>*/}
                            {/*    <div className="pagination-items">*/}
                            {/*        3*/}
                            {/*    </div>*/}
                            {/*    <div className="pagination-items">*/}
                            {/*        4*/}
                            {/*    </div>*/}

                            {/*    <div className="next-btn">*/}
                            {/*        <img src="./images/arrow.png" alt=""/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
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

export default Doctors