import "./style-doctors.scss";
import Navbar from "../navbar/Navbar";
import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import Footer from "../footer/Footer";
import Map from "../map/Map";
import {useDispatch, useSelector} from "react-redux";
import {showModals} from "../../redux/ModalContent";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Doctors = () => {
    const [region, setRegions] = useState("");
    const [typeHospital, setTypeHospital] = useState("");
    const [professional, setProfessional] = useState("");
    const [working24, setWorking24] = useState(false);
    const [disable, setDisable] = useState(false);

    const showMap = useSelector((store) => store.ShowMap.data);
    const dispatch = useDispatch();

    const [like, setLike] = useState(false);
    const navigate = useNavigate();

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
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small" className="selectRegion">
                                        <InputLabel id="demo-select-large-label">Tuman</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={region}
                                            label="Tuman"
                                            onChange={(e) => setRegions(e.target.value)}
                                        >
                                            <MenuItem value={"Yunusobot"}>Yunusobot</MenuItem>
                                            <MenuItem value={"Sergili"}>Sergili</MenuItem>
                                            <MenuItem value={"Chilonzor"}>Chilonzor</MenuItem>
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
                                            value={typeHospital}
                                            label="Shifoxona turi"
                                            onChange={(e) => setTypeHospital(e.target.value)}
                                        >
                                            <MenuItem value={"Xususiy"}>Xususiy</MenuItem>
                                            <MenuItem value={"Davlat"}>Davlat</MenuItem>
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
                                            value={professional}
                                            label="Mutaxasislik"
                                            onChange={(e) => setProfessional(e.target.value)}
                                        >
                                            <MenuItem value={"Stamatolog"}>Stamatolog</MenuItem>
                                            <MenuItem value={"Terapvt"}>Terapvt</MenuItem>
                                            <MenuItem value={"Lor"}>Lor</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <div onClick={() => setWorking24(!working24)}
                                         className={`button-filter ${working24 ? "active-filter-btn" : ""}`}>
                                        24 soat ochiq
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="dropdown-filter">
                                    <div onClick={() => setDisable(!disable)}
                                         className={`button-filter ${disable ? "active-filter-btn" : ""}`}>
                                        Nogironlar uchun imkoniyatlar
                                    </div>
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