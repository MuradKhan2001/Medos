import "./login.scss"
import {useOnKeyPress} from "./useOnKeyPress";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addAlert, delAlert} from "../../redux/AlertsBox";
import {TextField} from "@mui/material";
import {useFormik} from "formik";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const baseUrl = useSelector((store) => store.baseUrl.data);

    const HandleLogin = (values) => {
        let user = {
            username: values.username,
            password: values.password
        };
        axios
            .post(`${baseUrl}auth/register/login/`, user)
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userType",response.data.user_type);
                localStorage.setItem("profile", response.data.profile);
                if (response.data.profile) {

                    if (response.data.user_type === "Doctor") {
                        window.location.pathname = "/profile-doctor"

                    } else if (response.data.user_type === "Hospital") {
                        window.location.pathname = "/profile-hospital"

                    } else if (response.data.user_type === "Pharmacy") {
                        window.location.pathname = "/profile-pharmacy"
                    }

                } else {

                    if (response.data.user_type === "Doctor") {
                        window.location.pathname = "/register-doctor"

                    } else if (response.data.user_type === "Hospital") {
                        window.location.pathname = "/register-hospital"

                    } else if (response.data.user_type === "Pharmacy") {
                        window.location.pathname = "/register-pharmacies"

                    }
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    let idAlert = Date.now();
                    let alert = {
                        id: idAlert,
                        text: "Login yoki parol xato!",
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
            errors.login = "Required";
        }

        if (!values.password) {
            errors.password = "Required";
        }

        return errors;
    };

    const formOne = useFormik({
        initialValues: {
            username: "",
            password: ""
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

        <div className="login-card">
            <div className="xbtn">
                <img onClick={() => navigate("/")} src="./images/cancel.png" alt=""/>
            </div>

            <div className="title-login">
                Profilga kirish
            </div>

            <div className="des-login">
                Dasturga kirish uchun login va parolni kiriting
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
            </div>

            <div onClick={() => formOne.handleSubmit()}
                 className="login-btn">
                Kirish
            </div>
        </div>

    </div>
};

export default Login