import {useRef, useState, useContext, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import {useSelector, useDispatch} from "react-redux";
import ReactStars from "react-stars";
import {hideModal, showModals} from "../../redux/ModalContent";
import "./style.scss";
import {useFormik} from "formik";
import {addAlert, delAlert} from "../../redux/AlertsBox";
import i18next from "i18next";
import axios from "axios";
import {useTranslation} from "react-i18next";

const Modal = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const nodeRef = useRef(null);
    const modalContent = useSelector((store) => store.ModalContent.data);
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [raidCount, setRaidCount] = useState();


    const validate = (values) => {
        const errors = {};
        if (!values.phone) {
            errors.phone = "Required";
        } else if (isNaN(Number(values.phone))) {
            errors.phone = "Required";
        }
        if (!values.name) {
            errors.name = "Required";
        }
        if (!values.text) {
            errors.text = "Required";
        }
        if (!values.utime) {
            errors.utime = "Required";
        }
        return errors;
    };

    const formReception = useFormik({
        initialValues: {
            name: "",
            phone: "",
            text: "",
            utime:""
        },
        validate,
        onSubmit: (values) => {
            let reception = {
                ...values,
                user: modalContent.item
            };

            let rate = {
                ...values,
                user: modalContent.item,
                mark: raidCount
            };

            if (modalContent.status === "sms") {
                console.log(reception);
                axios.post(`${baseUrl}patient/`, reception).then((response) => {
                    let idAlert = Date.now();
                    let alert = {
                        id: idAlert,
                        text: "Xabar yuborildi!",
                        img: "./images/green.svg",
                        color: "#EDFFFA",
                    };
                    dispatch(addAlert(alert));
                    setTimeout(() => {
                        dispatch(delAlert(idAlert));
                    }, 5000);
                    dispatch(hideModal({show: false}));
                    formReception.resetForm();
                });
            }

            if (modalContent.status === "commit") {
                axios.post(`${baseUrl}comment/`, rate).then((response) => {
                    let idAlert = Date.now();
                    let alert = {
                        id: idAlert,
                        text: "Baxolandi!",
                        img: "./images/green.svg",
                        color: "#EDFFFA",
                    };
                    dispatch(addAlert(alert));
                    setTimeout(() => {
                        dispatch(delAlert(idAlert));
                    }, 5000);
                    dispatch(hideModal({show: false}))
                    formReception.resetForm()
                });
            }
        },
    });

    return (
        <CSSTransition
            in={modalContent.show}
            nodeRef={nodeRef}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <div className="modal-sloy">
                <div ref={nodeRef} className="modal-card">

                    {modalContent.status === "sms" && <form onSubmit={formReception.handleSubmit} className="send-sms">
                        <div className="header">
                            <div className="xbtn">
                                <img onClick={() => dispatch(hideModal({show: false}))} src="./images/cancel.png"
                                     alt=""/>
                            </div>
                        </div>
                        <div className="title">
                            Qabulga yozilish
                        </div>
                        <div className="description">
                            Operatorlar siz bilan aloqaga chiqa olishlari uchun pastdagi maydonlarni to‘g‘ri
                            to‘ldiring!
                        </div>
                        <div className="inputs-box">
                            <input
                                className={formReception.errors.name === "Required" ? "Required" : ""}
                                onChange={formReception.handleChange}
                                value={formReception.values.name}
                                name="name"
                                placeholder="To'liq ismingizni yozing" type="text"/>
                            <input
                                className={formReception.errors.phone === "Required" ? "Required" : ""}
                                onChange={formReception.handleChange}
                                value={formReception.values.phone}
                                name="phone"
                                placeholder="Telefon raqamingizni kiriting" type="text"/>
                            <label htmlFor="utime">Qabulga borish kuni va soatini kiriting:</label>
                            <input
                                className={formReception.errors.utime === "Required" ? "Required" : ""}
                                onChange={formReception.handleChange}
                                value={formReception.values.utime}
                                name="utime"
                                type="datetime-local"
                                id="utime"/>
                            <textarea
                                className={formReception.errors.text === "Required" ? "Required" : ""}
                                onChange={formReception.handleChange}
                                value={formReception.values.text}
                                name="text"
                                placeholder="Siz kuzatilayotgan muammo haqida qisqacha izoh yozing"
                                cols="30" rows="10"></textarea>
                        </div>
                        <div className="buttons-box">
                            <button type="submit" className="send-btn">Yuborish</button>
                        </div>
                    </form>}

                    {modalContent.status === "contact" &&
                    <div className="contact">
                        <div className="header">
                            <div className="title">
                                {modalContent.item.translations[i18next.language].name ?
                                    modalContent.item.translations[i18next.language].name :
                                    <>
                                        {modalContent.item.translations[i18next.language].first_name} &nbsp;
                                        {modalContent.item.translations[i18next.language].last_name} &nbsp;
                                        {modalContent.item.translations[i18next.language].middle_name}
                                    </>
                                }
                            </div>
                            <div className="xbtn">
                                <img onClick={() => dispatch(hideModal({show: false}))} src="./images/cancel.png"
                                     alt=""/>
                            </div>
                        </div>
                        <div className="title-contact">Ish vaqti</div>
                        <div className="content">
                            {modalContent.item.open_24 ? "24 soat ochiq" : <>
                                {modalContent.item.start_time} dan
                                &nbsp;
                                {modalContent.item.end_time} gacha
                            </>}
                        </div>

                        <div className="title-contact">Bog‘lanish uchun telefon raqmalar</div>
                        <div className="content">
                            <div className="phone">
                                {modalContent.item.phone1 ? modalContent.item.phone1 : modalContent.item.phone}
                            </div>
                            <div className="phone">
                                {modalContent.item.phone2}
                            </div>
                        </div>
                    </div>}

                    {modalContent.status === "commit" &&
                    <form onSubmit={formReception.handleSubmit} className="send-commit">
                        <div className="header">
                            <div className="xbtn">
                                <img onClick={() => dispatch(hideModal({show: false}))} src="./images/cancel.png"
                                     alt=""/>
                            </div>
                        </div>
                        <div className="title">
                            Baholang va izoh qoldiring
                        </div>
                        <div className="stars">
                            <ReactStars
                                count={5}
                                onChange={(e) => {
                                    setRaidCount(e);
                                }}
                                size={35}
                                color2={"rgba(255, 194, 50, 1)"}
                                half={false}
                            />
                        </div>
                        <div className="inputs-box">
                            <input
                                className={formReception.errors.name === "Required" ? "Required" : ""}
                                onChange={formReception.handleChange}
                                value={formReception.values.name}
                                name="name"
                                placeholder="To'liq ismingizni yozing" type="text"/>
                            <input
                                className={formReception.errors.phone === "Required" ? "Required" : ""}
                                onChange={formReception.handleChange}
                                value={formReception.values.phone}
                                name="phone"
                                placeholder="Telefon raqamingizni kiriting" type="text"/>
                            <div className="description">
                                Sizning xavfsizligingiz uchun telefon raqami boshqa foydalanuvchilarga ko‘rinmaydi.
                            </div>
                            <textarea
                                className={formReception.errors.text === "Required" ? "Required" : ""}
                                onChange={formReception.handleChange}
                                value={formReception.values.text}
                                name="text"
                                placeholder="Siz kuzatilayotgan muammo haqida qisqacha izoh yozing"
                                cols="30" rows="10"></textarea>
                        </div>
                        <div className="description">
                            Barcha izohlar tekshiruvdan o'tadi
                        </div>
                        <button type="submit" className="send-btn">Saqlash va yuborish</button>
                    </form>}
                </div>
            </div>
        </CSSTransition>
    );
};
export default Modal;
