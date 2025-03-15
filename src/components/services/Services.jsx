import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./style-services.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import i18next from "i18next"
import {useDispatch, useSelector} from "react-redux";
import MobileNavbar from "../mobile-navbar/MobileNavbar";
import {getClinics} from "../../redux/clinics";
import {changeMenu} from "../../redux/menu";
import {useNavigate} from "react-router-dom";
import AdvertBox from "../adverts/AdvertBox";
import Loader from "../loader/Loader";

const Service = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [services, setServices] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true)
        axios.get(`${baseUrl}services/`).then((response) => {
            setServices(response.data);
        }).finally(() => {
            setLoader(false);
        });
        ;
    }, []);

    const filterHospital = (id) => {
        axios.post(`${baseUrl}filter-hospital/`, {sub_service: id}).then((response) => {
            dispatch(getClinics(response.data));
            dispatch(changeMenu(true));
            navigate("/")
        });
    };

    return <div className="service-container">
        <AdvertBox/>
        <Navbar/>
        <div className="service-box">
            <div className="title">
                {t("nav4")}
            </div>
            {loader ? <Loader/> : <>
                <div className="services-tab">
                    {
                        services.map((item, index) => {
                            return <div key={index}>
                                <div className="category-name">
                                    {item.translations[i18next.language].name} <span></span> {item.hospital_count}
                                </div>
                            </div>
                        })
                    }
                </div>
                {services.map((item, index) => {
                    return <div key={index} className="service-content">
                        <div className="title-service">
                            {item.translations[i18next.language].name} <span></span>
                            <div className="num">
                                {console.log(item)}
                                {item.hospital_count}
                            </div>
                        </div>

                        <div className="services">
                            {item.sub_service_list.map((item, index) => {
                                return <div onClick={() => filterHospital(item.id)} key={index} className="service">
                                    {item.translations[i18next.language].name}
                                </div>
                            })}
                        </div>
                    </div>
                })}
            </>}
        </div>
        <div className="mobile-navbar-container">
            <MobileNavbar/>
        </div>
        <Footer/>
    </div>
};

export default Service