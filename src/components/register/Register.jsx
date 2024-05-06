import "./register-style.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const Register = () => {
    const [direction, setDirection] = useState("");
    const navigate = useNavigate();

    return <div className="register-container">
        <div className="logo">
            <img src="./images/logo.png" alt=""/>
        </div>

        <div className="register-page-zero">
            <div className="xbtn">
                <img onClick={() => navigate("/")} src="./images/cancel.png" alt=""/>
            </div>

            <div className="title">
                Siz ro‘yxatdan qanday maqsad o‘tmoqchisiz?
            </div>

            <div className="des">
                Ro‘yxatdan o‘tishni boshlashdan oldin pastdagi maqsadlardan birin tanlang
            </div>

            <div onClick={() => setDirection("/register-doctor")} className={`items ${direction === "/register-doctor" ? "active" : ""}`}>
                <img src="./images/Icons.png" alt=""/>
                Shifokor akkountini ochish
            </div>

            <div onClick={() => setDirection("/register-hospital")}
                 className={`items ${direction === "/register-hospital" ? "active" : ""}`}>
                <img src="./images/pin-location.png" alt=""/>
                Shifoxona akkountini ochish
            </div>

            <div onClick={() => setDirection("/register-pharmacies")}
                 className={`items ${direction === "/register-pharmacies" ? "active" : ""}`}>
                <img src="./images/pill.png" alt=""/>
                Dorixona akkountini ochish
            </div>

            <div onClick={() => navigate(direction)} className={`button-next ${!direction ? "button-next-disabled" : ""}`}>
                Tasdiqlash va davom etish
            </div>
        </div>
    </div>
};

export default Register