import "./style.scss"
import Navbar from "../navbar/Navbar";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import MobileNavbar from "../mobile-navbar/MobileNavbar";


const Messages = () => {
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
                    Kelib tushgan murojaat va xabarlar
                </div>
                <div className="messages">
                    {messages.map((item, index) => {
                        return <div key={index} className="message-box">
                            <div className="icon-message">
                                <img src="./images/mail.png" alt=""/>
                            </div>
                            <div onClick={() => delMessage(item.id)} className="del-icon">
                                <img src="./images/del-icon.png" alt=""/>
                            </div>
                            <div className="name">
                                {item.name}
                            </div>
                            <div className="number">
                                {item.phone}
                            </div>
                            <div className="des">
                                {item.text}
                            </div>
                            <div className="time">
                                <span>Qabul kuni:</span>
                                {item.utime}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
        <div className="mobile-navbar-container">
            <MobileNavbar/>
        </div>
    </div>
};

export default Messages