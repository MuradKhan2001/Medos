import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./style-services.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {useTranslation} from "react-i18next";
import i18next from "i18next"
import {getAboutMarker} from "../../redux/markerAbout";
import {useSelector} from "react-redux";

const Service = () => {
    const {t} = useTranslation();
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [services, setServices] = useState([])
    const Category = [
        {id: 1, name: "Barchasi", count: 14},
        {id: 2, name: "Narkologlar", count: 4},
        {id: 3, name: "Dermatolog", count: 8},
        {id: 4, name: "Embriolog", count: 1},
        {id: 4, name: "Travmatolog", count: 6},
        {id: 4, name: "Pediatr", count: 5},
        {id: 4, name: "Terapevt", count: 7},
        {id: 4, name: "Urolog", count: 9},
        {id: 4, name: "Mammolog", count: 2},
    ];


    useEffect(() => {

        axios.get(`${baseUrl}services/`).then((response) => {
            setServices(response.data);
        });

    }, []);

    return <div className="service-container">
        <Navbar/>

        <div className="service-box">
            <div className="title">
                Xizmatlar
            </div>

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
                            {item.hospital_count}
                        </div>
                    </div>

                    <div className="services">
                        {item.sub_service_list.map((item, index) => {
                            return <div className="service">
                                {item.translations[i18next.language].name}
                            </div>
                        })}

                    </div>
                </div>
            })}


        </div>
        <Footer/>
    </div>
};

export default Service