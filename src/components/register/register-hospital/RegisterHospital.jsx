import "../register-style.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const RegisterDoctor = () => {
    const navigate = useNavigate();

    return <div className="register-doctor-container">
        <div className="logo">
            <img src="./images/logo.png" alt=""/>
        </div>

        <div className="register-page">
            <div className="xbtn">
                <img onClick={() => navigate("/")} src="./images/cancel.png" alt=""/>
            </div>

        </div>
    </div>
};

export default RegisterDoctor