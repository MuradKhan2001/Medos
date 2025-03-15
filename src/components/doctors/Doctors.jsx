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
import doctors, {getDoctor} from "../../redux/doctors";
import axios from "axios";
import MobileNavbar from "../mobile-navbar/MobileNavbar";
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import {getAboutMarker} from "../../redux/markerAbout";
import AdvertBox from "../adverts/AdvertBox";
import Loader from "../loader/Loader";
import ReactPaginate from "react-paginate";


const Doctors = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const filterService = useSelector((store) => store.Menu.data);
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const Doctors = useSelector((store) => store.Doctors.data);
    const showMap = useSelector((store) => store.ShowMap.data);
    const [serviceList, setServiceList] = useState([]);
    const [regionSelect, setRegionSelect] = useState("");
    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");
    const [cost, setCost] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [savedPosts, setSavedPosts] = useState([]);
    const location = useSelector((store) => store.LocationUser.data);
    const [loader, setLoader] = useState(false);
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

    const worksPage = 10;
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * worksPage;
    const pageCount = Math.ceil(Doctors.length / worksPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
    };

    useEffect(() => {
        axios.get(`${baseUrl}speciality/`, {
            headers:{
                "Accept-Language": i18next.language
            },
        }).then((response) => {
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
        setLoader(true)
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
        }).finally(() => {
            setLoader(false);
        });
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

    const NavigateButton = (location) => {
        let latitude = Number(location.split(",")[0]);
        let longitude = Number(location.split(",")[1]);

        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, '_blank');
    };

    const productList = Doctors.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <div key={index} className="doctor">
            <div className="left-side">
                <img src={item.image} alt=""/>
                <div className="like">
                    <img onClick={() => handleSaveClick(item.id)}
                         src={savedPosts.includes(item.id) ? "./images/like.png" : "./images/no-like.png"}
                         alt=""/>
                </div>
                <div onClick={() => NavigateButton(item.location)}
                     className="navigator">
                    {t("navigator")}
                    <img src="./images/compass.png" alt=""/>
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
                            <img src="./images/star.png" alt=""/>
                            {item.avg_rating}
                        </div>
                        <span></span>
                        <div className="commit-count">
                            {item.comment_count} {t("comment")}
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
                        {item.experience} {t("experience")}
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
                                <b>
                                    {item.hospital.translations[i18next.language].name}
                                </b>
                            </div>
                        </> : ""}
                </div>

                <div className="section-location-working-days">
                    <div className="location">
                        <img src="./images/time.png" alt=""/>
                        {item.working_days.map((itemWorkingdays, index) => {
                            return <p key={index}>
                                &nbsp;
                                {itemWorkingdays.translations[i18next.language].day}
                                {index !== item.working_days.length - 1 && ","}
                            </p>
                        })}
                    </div>
                    <br/>
                    <div className="time-open">
                        <img src="./images/clock.png" alt=""/>
                        {item.start_time} {t("from")}
                        &nbsp;
                        {item.end_time} {t("to")}
                    </div>
                </div>

                <div className="services">
                    {item.sub_speciality.map((item, index) => {
                        return <div key={index} className="service">
                            {item.translations[i18next.language].name}
                        </div>
                    })}
                </div>

                <div onClick={() => NavigateButton(item.location)}
                     className="navigator">
                    {t("navigator")}
                    <img src="./images/compass.png" alt=""/>
                </div>

                <div className="prices">
                    <div className="item-price">
                        <div className="title">{t("first-consultation")}</div>
                        <div className="number">
                            {item.consultation_fee ? <>{item.consultation_fee} {t("sum")} </> : t("agreement")}
                        </div>
                    </div>
                    <div className="item-price">
                        <div className="title">{t("second-consultation")}</div>
                        <div className="number">
                            {item.second_consultation_fee ?
                                <>{item.second_consultation_fee} {t("sum")} </> :
                                t("agreement")}
                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <div className="left-btn">
                        <div onClick={() => ShowModal("sms", item.user)}
                             className="button-send">
                            {t("acceptance")}
                        </div>
                        <div onClick={() => ShowModal("contact", item)}
                             className="button-call">
                            {t("call")}
                        </div>
                    </div>

                    <div onClick={() => {
                        localStorage.setItem("doctorId", item.id)
                        navigate("/about-doctor")
                        dispatch(getAboutMarker(item.location ? item.location : item.hospital.location))
                    }} className="more-btn">
                        {t("more")}
                    </div>
                </div>
            </div>
        </div>
    });

    return <>
        <div className="doctors-wrapper">
            <AdvertBox/>
            <Navbar/>
            <div className="doctors-list">
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
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                                 className="selectHospitalType">
                                        <InputLabel id="demo-select-large-label">{t("gender")}</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={gender}
                                            label={t("gender")}
                                            onChange={(e) => {
                                                filterHospital(region, e.target.value, cost, speciality);
                                                setGender(e.target.value)
                                            }}
                                        >
                                            <MenuItem value={true}>{t("men")}</MenuItem>
                                            <MenuItem value={false}>{t("women")}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                                 className="price">
                                        <InputLabel id="demo-select-large-label">{t("price")}</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={cost}
                                            label={"price"}
                                            onChange={(e) => {
                                                filterHospital(region, gender, e.target.value, speciality);
                                                setCost(e.target.value)
                                            }}
                                        >
                                            <MenuItem value={true}>{t("cheap")}</MenuItem>
                                            <MenuItem value={false}>{t("expensive")}</MenuItem>
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

                            {loader || !location ? <Loader/> : <>
                                {productList}
                            </>}

                            <div className="pagination">
                                {Doctors.length > 10 ? <ReactPaginate
                                    breakLabel="..."
                                    previousLabel={<img src="./images/prev.png" alt=""/>}
                                    nextLabel={<img src="./images/next.png" alt=""/>}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"paginationBttns"}
                                    previousLinkClassName={"previousBttn"}
                                    nextLinkClassName={"nextBttn"}
                                    disabledCalassName={"paginationDisabled"}
                                    activeClassName={"paginationActive"}
                                /> : ""}
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

export default Doctors