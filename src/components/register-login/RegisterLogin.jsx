import "./Style.scss"
import {useOnKeyPress} from "./useOnKeyPress";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAlert, delAlert} from "../../redux/AlertsBox";
import {TextField} from "@mui/material";
import {useFormik} from "formik";

const RegisterLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baseUrl = useSelector((store) => store.baseUrl.data);

    const HandleLogin = (values) => {
        let user= {
            username:values.username,
            password:values.password,
            password2:values.password2,
            user_type:values.user_type
        };
        axios
            .post(`${baseUrl}auth/register/register-user/`, user)
            .then((response) => {
                localStorage.setItem("userType",response.data.user_type);
                localStorage.setItem("profile", response.data.profile);
                localStorage.setItem("token", response.data.token)
                navigate(sessionStorage.getItem("link-register"))
            })
            .catch((error) => {
                if ("password2" in error.response.data){
                    let idAlert = Date.now();
                    let alert = {
                        id: idAlert,
                        text: "Parollar mos kelmadi",
                        img: "./images/red.svg",
                        color: "#ffefe7",
                    };
                    dispatch(addAlert(alert));
                    setTimeout(() => {
                        dispatch(delAlert(idAlert));
                    }, 5000);
                }
                else{
                    let idAlert = Date.now();
                    let alert = {
                        id: idAlert,
                        text: "Bu login ro'yxatdan o'tgan!",
                        img: "./images/red.svg",
                        color: "#ffefe7",
                    };
                    dispatch(addAlert(alert));
                    setTimeout(() => {
                        dispatch(delAlert(idAlert));
                    }, 5000);
                }


            });
    };


    const validate = (values) => {
        const errors = {};

        if (!values.username) {
            errors.username = "Required";
        }

        if (!values.password) {
            errors.password = "Required";
        }

        if (!values.password2 && (values.password !== values.password2)) {
            errors.password2 = "Required";
        }

        return errors;
    };

    const formOne = useFormik({
        initialValues: {
            username: "",
            password: "",
            password2:"",
            user_type: sessionStorage.getItem("link-register")=== "/register-doctor" ? "Doctor" :
                sessionStorage.getItem("link-register")=== "/register-hospital" ? "Hospital" : "Pharmacy"
        },
        validate,
        onSubmit: (values) => {
            HandleLogin(values)
        },
    });

    useOnKeyPress(formOne.handleSubmit, "Enter");

    return <div className="login-container">
        <div className="logo">
            <img src="./images/logo.png" alt=""/>
        </div>

        <div  className="login-card">
            <div className="xbtn">
                <img onClick={() => navigate("/")} src="./images/cancel.png" alt=""/>
            </div>
            <div className="title-login">
                Ro'yxatdan o'tish
            </div>
            <div className="des-login">
                Ro'yxatdan o'tish uchun login va parolni kiriting
            </div>

            <div className="inputs">
                <TextField
                    error={formOne.errors.username === "Required"}
                    value={formOne.username}
                    onChange={formOne.handleChange}
                    name="username"
                    sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                    label="Login" variant="outlined" className="textField"/>

                <TextField
                    error={formOne.errors.password === "Required"}
                    value={formOne.password}
                    onChange={formOne.handleChange}
                    name="password"
                    sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                    label="Parol" variant="outlined" className="textField"/>

                <TextField
                    error={formOne.errors.password2 === "Required"}
                    value={formOne.password2}
                    onChange={formOne.handleChange}
                    name="password2"
                    sx={{m: 1, minWidth: "100%"}} size="small" id="outlined-basic"
                    label="Parolni takrorlang" variant="outlined" className="textField"/>
            </div>

            <div onClick={() => formOne.handleSubmit()} className="login-btn">
                Ro'yxatdan o'tish
            </div>
        </div>

    </div>
};

export default RegisterLogin