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
import MobileNavbar from "../mobile-navbar/MobileNavbar";


const Pharmacies = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const location = useSelector((store) => store.LocationUser.data);
    const [like, setLike] = useState(false);
    const showMap = useSelector((store) => store.ShowMap.data);
    const [regionSelect, setRegionSelect] = useState("");
    const [working24, setWorking24] = useState("");
    const [region, setRegion] = useState("");

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
        // axios.get(`${baseUrl}hospital-type/`).then((response) => {
        //     setHospitalList(response.data)
        // }).catch((error) => {
        // });
        //
        // axios.get(`${baseUrl}speciality/`).then((response) => {
        //     setServiceList(response.data)
        // }).catch((error) => {});
    }, []);

    useEffect(() => {
        if (location.key) {
            filterHospital(location.key + 1, working24);
            setRegion(location.key + 1)
            setRegionSelect(location.key)
        }
    }, [location]);

    const filterHospital = (region_key, open_24_key) => {
        let filterBox = {
            region: region_key,
            open_24: open_24_key
        };

        const queryString = Object.entries(filterBox)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        console.log(filterBox)
        // axios.get(`${baseUrl}hospital/?${queryString}`).then((response) => {
        //     dispatch(getClinics(response.data));
        // })
    };

    const changeRegion = (region, index) => {
        const location = {key: index, "city": region.name, "latitude": region.latitude, "longitude": region.longitude};
        dispatch(getLocation(location));
    };

    return <>
        <div className="pharmacies-wrapper">
            <Navbar/>
            <div className="pharmacies-list">
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
                                    <div onClick={() => {
                                        filterHospital(region, !working24);
                                        setWorking24(!working24)
                                    }}
                                         className={`button-filter ${working24 ? "active-filter-btn" : ""}`}>
                                        24 soat ochiq
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!showMap && <div className="pharmacies">
                            <div className="pharmacies-box">
                                <div className="pharma">
                                    <div className="left-side">
                                        <img src="./images/pharma.jpeg" alt=""/>
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
                                                <div className="open">Ochiq</div>
                                                {/*<div className="close">Yopiq</div>*/}
                                            </div>
                                            <span></span>
                                            <div className="time-open">
                                                9:00 - 15:00
                                            </div>
                                        </div>

                                        <div className="buttons">
                                            <div onClick={() => navigate("/about-clinic")} className="more-btn">
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
                                            <div onClick={() => navigate("/about-clinic")} className="more-btn">
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
                                            <div onClick={() => navigate("/about-clinic")} className="more-btn">
                                                Ko'proq ko'rsatish
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                {showMap ?  <img className="prev-to" src="./images/next-btn.png" alt=""/> :
                    <img src="./images/map-mobile.png" alt=""/>}
                {showMap ? "Orqaga" : "Xaritadan"}
            </div>

            <div className="mobile-navbar-container">
                <MobileNavbar/>
            </div>
        </div>
    </>
};

export default Pharmacies