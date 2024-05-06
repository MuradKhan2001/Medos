import "./login.scss"
import {useOnKeyPress} from "./useOnKeyPress";
import PhoneInput from "react-phone-number-input";
import AuthCode from "react-auth-code-input";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Login = () => {
    const navigate = useNavigate();
    const baseUrl = "https://api.buyukyol.uz/";
    const [phone, setPhone] = useState("");
    const [code, setCode] = useState("");
    const [checkCode, setCheckCode] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(60);

    const resetTimer = () => {
        setMinutes(0);
        setSeconds(59);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(60);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [checkCode ? seconds : null]);

    const getCodeValue = (e) => {
        setCode(e);
    };
    const HandleLogin = () => {
        let user = {
            phone: phone,
            user_type: "Client",
        };
        axios
            .post(`${baseUrl}api/login/`, user)
            .then((response) => {
                localStorage.setItem("userId", response.data.user);
                setCheckCode((prevState) => true);

                if (checkCode) {
                    resetTimer();
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert("Bu raqamga sms yuborib bo'lmaydi")
                }

                if (error.response.status === 406) {
                    alert("Bu raqam ro'yxatdan o'tmagan")
                }
            });
    };

    const CheckCode = () => {
        axios
            .post(`${baseUrl}api/verify/`, {
                user: localStorage.getItem("userId"),
                number: code,
            })
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                navigate("/");
                window.location.reload();
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert("Tasdiqlash kodi xato")
                }
            });
    };

    useOnKeyPress(checkCode ? CheckCode : HandleLogin, "Enter");

    return <div className="login-container">
        <div className="logo">
            <img src="./images/logo.png" alt=""/>
        </div>

        {checkCode ? <div className="check-code">
            <div className="xbtn">
                <img onClick={() => setCheckCode(false)} src="./images/cancel.png" alt=""/>
            </div>

            <div className="title-login">
                Maxsus kodni kiriting
            </div>

            <div className="des-login">
                Telefon raqamingizga maxsus kod SMS tarzda yuborildi
            </div>

            <div className="inputs">
                <AuthCode
                    allowedCharacters="numeric"
                    length="5"
                    onChange={getCodeValue}
                />
            </div>

            {checkCode && <div className="count">
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
            </div>}

            {seconds > 0 ||
            minutes > 0 ||
            phone === "" ||
            phone === undefined ?

                <button
                    disabled={code.trim().length < 5}
                    onClick={CheckCode}
                    className={
                        code.trim().length < 5 ? "login-btn-disablet" : "login-btn"
                    }
                >
                    Profilga kirish
                </button> :
                <button
                    disabled={
                        phone === "" ||
                        phone === undefined ||
                        seconds > 0 ||
                        minutes > 0
                    }
                    onClick={HandleLogin}
                    className={
                        seconds > 0 ||
                        minutes > 0 ||
                        phone === "" ||
                        phone === undefined
                            ? "login-btn-disablet"
                            : "login-btn"
                    }
                >
                    Kodni qayta yuborish
                </button>}


        </div> : <div className="login-card">
            <div className="xbtn">
                <img onClick={()=> navigate("/")} src="./images/cancel.png" alt=""/>
            </div>

            <div className="title-login">
                Profilga kirish
            </div>

            <div className="des-login">
                Maxsus kodni yuborishimiz uchun
                telefon raqamingizni to‘g‘ri kiriting
            </div>

            <div className="inputs">
                <label htmlFor="phone" className="label-form">
                    Telefon raqam
                </label>
                <PhoneInput
                    id="phone"
                    international
                    defaultCountry="UZ"
                    value={phone}
                    onChange={setPhone}
                />
            </div>

            <button
                onClick={HandleLogin}
                disabled={phone === "" || phone === undefined}
                className={phone === "" || phone === undefined
                    ? "login-btn-disablet"
                    : "login-btn"}>
                Dasturga kirish
            </button>
        </div>}


    </div>
};

export default Login