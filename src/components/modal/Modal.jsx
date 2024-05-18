import {useRef, useState, useContext, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import {useSelector, useDispatch} from "react-redux";
import ReactStars from "react-stars";
import {hideModal, showModals} from "../../redux/ModalContent";
import "./style.scss";
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {addAlert, delAlert} from "../../redux/AlertsBox";

const Modal = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
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
        return errors;
    };
    const formReception = useFormik({
        initialValues: {
            name: "",
            phone: "",
            text: ""
        },
        validate,
        onSubmit: (values) => {
            let reception = {
                ...values,
                user: modalContent.id
            };

            let rate = {
                ...values,
                user: modalContent.id,
                mark: raidCount
            };

            if (modalContent.status === "sms") {
                console.log(reception)

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
                dispatch(hideModal({show: false}))
                formReception.resetForm()

                // axios.post(`${baseUrl}patient/`, reception).then((response) => {
                //     setSuccess(true)
                //     setTimeout(() => {
                //         setSuccess(false)
                //     }, 4000)
                //     formik.resetForm()
                // });
            }

            if (modalContent.status === "commit") {
                console.log(rate)

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
                // axios.post(`${baseUrl}comment/`, rate).then((response) => {
                //     setSuccess(true)
                //     setTimeout(() => {
                //         setSuccess(false)
                //     }, 4000)
                //     formik.resetForm()
                // });
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
                            <textarea
                                className={formReception.errors.text === "Required" ? "Required" : ""}
                                onChange={formReception.handleChange}
                                value={formReception.values.text}
                                name="text"
                                placeholder="Siz kuzatilayotgan muammo haqida qisqacha izoh yozing"
                                cols="30" rows="10"></textarea>
                        </div>
                        <div className="buttons-box">
                            <div onClick={() => dispatch(hideModal({show: false}))} className="cancel-btn">Bekor
                                qilish
                            </div>
                            <button type="submit" className="send-btn">Yuborish</button>
                        </div>
                    </form>}

                    {modalContent.status === "contact" &&
                    <div className="contact">
                        <div className="header">
                            <div className="title">
                                Akfa medline
                            </div>
                            <div className="xbtn">
                                <img onClick={() => dispatch(hideModal({show: false}))} src="./images/cancel.png"
                                     alt=""/>
                            </div>
                        </div>
                        <div className="title-contact">Ish vaqti</div>
                        <div className="content">
                            Har kuni: 08:00 dan 18:00 gacha
                        </div>

                        <div className="title-contact">Bog‘lanish uchun telefon raqmalar</div>
                        <div className="content">
                            <div className="phone">
                                +998 90 000 00 00
                            </div>
                            <div className="phone">
                                +998 90 000 00 00
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
