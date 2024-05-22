import "./register-style.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useTranslation} from "react-i18next";

const Register = () => {
    const {t} = useTranslation();
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
                {t("reason-register")}
            </div>
            <div className="des">
                {t("register-text")}
            </div>

            <div onClick={() => setDirection("/register-doctor")} className={`items ${direction === "/register-doctor" ? "active" : ""}`}>
                <img src="./images/Icons.png" alt=""/>
                {t("add-doctor")}
            </div>

            <div onClick={() => setDirection("/register-hospital")}
                 className={`items ${direction === "/register-hospital" ? "active" : ""}`}>
                <img src="./images/pin-location.png" alt=""/>
                {t("add-clinic")}
            </div>

            <div onClick={() => setDirection("/register-pharmacies")}
                 className={`items ${direction === "/register-pharmacies" ? "active" : ""}`}>
                <img src="./images/pill.png" alt=""/>
                {t("add-pharmacy")}
            </div>

            <div onClick={() => navigate(direction)} className={`button-next ${!direction ? "button-next-disabled" : ""}`}>
                {t("register-btn")}
            </div>
        </div>
    </div>
};

export default Register