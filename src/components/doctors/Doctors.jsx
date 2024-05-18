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

const Doctors = () => {
    const navigate = useNavigate();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const dispatch = useDispatch();
    const [like, setLike] = useState(false);
    const showMap = useSelector((store) => store.ShowMap.data);
    const [serviceList, setServiceList] = useState([]);
    const [regionSelect, setRegionSelect] = useState("");

    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");
    const [cost, setCost] = useState("");
    const [speciality, setSpeciality] = useState("");

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
        // axios.get(`${baseUrl}speciality/`).then((response) => {
        //     setServiceList(response.data)
        // }).catch((error) => {});
    }, []);

    useEffect(() => {
        if (location.key) {
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
            speciality: speciality_key,
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

    const ShowModal = (status) => {
        dispatch(showModals({show: true, status}))
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
                                            <MenuItem value={1}>Erkak</MenuItem>
                                            <MenuItem value={2}>Ayol</MenuItem>
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
                                                setCost(e.target.value)}}
                                        >
                                            <MenuItem value={1}>Arzondan- qimmatgacha</MenuItem>
                                            <MenuItem value={2}>Qimmatdan- arzongacha</MenuItem>
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
                                                setSpeciality(e.target.value)}}
                                        >
                                            <MenuItem value={1}>Stamatolog</MenuItem>
                                            <MenuItem value={2}>Terapvt</MenuItem>
                                            <MenuItem value={3}>Lor</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>

                        {!showMap && <div className="doctors">
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
                                            <div onClick={() => ShowModal("contact")} className="button-call">Qo'ng'iroq
                                                qilish
                                            </div>
                                        </div>

                                        <div onClick={() => navigate("/about-doctor")} className="more-btn">
                                            Ko'proq ko'rsatish
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="pagination-box">
                                <div className="prev-btn">
                                    <img src="./images/arrow.png" alt=""/>
                                </div>

                                <div className="pagination-items">
                                    1
                                </div>
                                <div className="pagination-items">
                                    2
                                </div>
                                <div className="pagination-items">
                                    3
                                </div>
                                <div className="pagination-items">
                                    4
                                </div>

                                <div className="next-btn">
                                    <img src="./images/arrow.png" alt=""/>
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
        </div>
    </>
};

export default Doctors