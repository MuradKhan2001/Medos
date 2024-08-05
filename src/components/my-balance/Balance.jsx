import "./style.scss"
import Navbar from "../navbar/Navbar";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import MobileNavbar from "../mobile-navbar/MobileNavbar";
import Footer from "../footer/Footer";


const Balance = () => {
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}patient/${localStorage.getItem("userId")}/`).then((response) => {
            setMessages(response.data);
        });
    }, []);
    const delMessage = (id) => {
        axios.delete(`${baseUrl}patient/${id}/`).then((response) => {
            axios.get(`${baseUrl}patient/${localStorage.getItem("userId")}/`).then((response) => {
                setMessages(response.data);
            });
        });
    };
    return <div className="messages-wrapper">
        <Navbar/>
        <div className="bottom-contents">
            <div className="left-side">
                <div className="title">
                   Mening hisobim
                </div>
                <div className="my-info">
                    <div className="left-side">
                        <div className="info">
                            <div className="text">FISH:</div>
                            <div className="value">Malikov Murodxon</div>
                        </div>

                        <div className="info">
                            <div className="text">Telefon raqam:</div>
                            <div className="value">+998 99 999 99 99</div>
                            <div className="value">+998 90 888 88 88</div>
                        </div>
                    </div>

                    <div className="right-side">
                        <div className="type">
                            Faol
                        </div>

                        <div className="time">
                            <div className="info">Tarif tugashi uchun qolgan vaqt:</div>
                            <div className="text">12 kun 6 soat</div>
                        </div>
                    </div>
                </div>
                <div className="tarifs">
                    <div className="tarif">
                        <div className="price">
                            100 000 so'm
                        </div>

                        <div className="des">
                            1 oylik tarif
                        </div>

                        <div className="button-buy">
                            <img src="./images/shopping-cart.png" alt=""/>
                            Tarifni olish
                        </div>
                    </div>

                    <div className="tarif">
                        <div className="price">
                            240 000 so'm
                        </div>

                        <div className="des">
                            3 oylik tarif
                        </div>

                        <div className="button-buy">
                            <img src="./images/shopping-cart.png" alt=""/>
                            Tarifni olish
                        </div>
                    </div>

                    <div className="tarif">
                        <div className="price">
                            480 000 so'm
                        </div>

                        <div className="des">
                            6 oylik tarif
                        </div>

                        <div className="button-buy">
                            <img src="./images/shopping-cart.png" alt=""/>
                            Tarifni olish
                        </div>
                    </div>

                    <div className="tarif">
                        <div className="price">
                            840 000 so'm
                        </div>

                        <div className="des">
                            1 yillik tarif
                        </div>

                        <div className="button-buy">
                            <img src="./images/shopping-cart.png" alt=""/>
                            Tarifni olish
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div className="mobile-navbar-container">
            <MobileNavbar/>
        </div>
        <Footer/>
    </div>
};

export default Balance