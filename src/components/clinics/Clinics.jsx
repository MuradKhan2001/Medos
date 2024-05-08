import "./style-clinics.scss";
import Navbar from "../navbar/Navbar";
import {useEffect, useState, useMemo, useRef} from "react";
import {
    TextField, MenuItem, InputLabel, FormControl, Select, Checkbox, OutlinedInput,
    ListItemText
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Footer from "../footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import Map from "../map/Map";
import {showModals} from "../../redux/ModalContent";


const Clinics = () => {
    const [category, setCategory] = useState(1);
    const [region, setRegions] = useState("");
    const [typeHospital, setTypeHospital] = useState("");
    const [professional, setProfessional] = useState("");
    const [working24, setWorking24] = useState(false);
    const [disable, setDisable] = useState(false);
    const [like, setLike] = useState(false);
    const navigate = useNavigate();
    const showMap = useSelector((store) => store.ShowMap.data);
    const dispatch = useDispatch();
    const [price, setPrice] = useState("");

    const Category = [
        {id: 1, name: "Barchasi"},
        {id: 2, name: "Ayollar maslahatlari"},
        {id: 3, name: "Bolalar shifoxonalari"},
        {id: 4, name: "Dispanserlar"},
        {id: 5, name: "Tug‘ruqxonalar"},
        {id: 6, name: "Laboratoriyalar"},
        {id: 7, name: "Narkologik klinikalar"},
        {id: 8, name: "Narkologik klinikalar"},
        {id: 9, name: "Narkologik klinikalar"},
        {id: 10, name: "Narkologik klinikalar"},
    ];

    const ShowModal = (status) => {
        dispatch(showModals({show: true, status}))
    };

    return <>
        <div className="clinics-wrapper">
            <Navbar/>

            <div className="clinics-list">
                <div className="category-wrapper">
                    {
                        Category.map((item, index) => {
                            return <div key={index}>
                                <div onClick={() => setCategory(item.id)}
                                     className={`category-name ${category === item.id ? "active" : ""}`}>{item.name}</div>
                            </div>
                        })
                    }
                </div>
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
                                    <FormControl sx={{m: 1, minWidth: "100%"}} size="small"
                                                 className="price">
                                        <InputLabel id="demo-select-large-label">Narx</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={price}
                                            label="Jinsi"
                                            onChange={(e) => setPrice(e.target.value)}
                                        >
                                            <MenuItem value={"axpensive"}>Arzondan- qimmatgacha</MenuItem>
                                            <MenuItem value={"chip"}>Qimmatdan-  arzongacha</MenuItem>
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

                        {!showMap && <div className="clinics">
                            <div className="clinic">
                                <div className="left-side">
                                    <img src="./images/clinic.png" alt=""/>
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
                                        <div className="name-clinic">Akfa medline</div>
                                        <div className="buttons">
                                            <div onClick={() => ShowModal("contact")}
                                                 className="button-call">Qo'ng'iroq qilish
                                            </div>
                                            <div onClick={() => ShowModal("sms")} className="button-send">Yozish</div>
                                        </div>
                                    </div>

                                    <div className="section-commit">
                                        <div className="raiting">
                                            4.9
                                        </div>
                                        <div className="commit-count">
                                            324 ta izoh
                                        </div>
                                        <span></span>
                                        <div className="name">
                                            Kasalxona
                                        </div>
                                    </div>
                                    <div className="section-location">
                                        <div className="location">
                                            <img src="./images/icon.png" alt=""/>
                                            Olmazor tumani
                                        </div>
                                        <span></span>
                                        <div className="time-open">
                                            <img src="./images/clock.png" alt=""/>
                                            08:00 dan 18:00 gacha
                                        </div>
                                    </div>

                                    <div className="services">
                                        <div className="service">
                                            Stress testlari
                                        </div>
                                        <div className="service">
                                            EKG
                                        </div>
                                        <div className="service">
                                            Reografiya
                                        </div>
                                        <div className="service">
                                            Exo KG
                                        </div>
                                        <div className="service">
                                            Stress testlari
                                        </div>
                                        <div className="service">
                                            Stress testlari
                                        </div>
                                        <div className="service">
                                            Stress testlari
                                        </div>
                                    </div>
                                    <div onClick={() => navigate("/about-clinic")} className="more-btn">
                                        Ko'proq ko'rsatish
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
        </div>
    </>
};

export default Clinics