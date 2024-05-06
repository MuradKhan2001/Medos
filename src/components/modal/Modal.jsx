import {useRef, useState, useContext, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import {useSelector, useDispatch} from "react-redux";
import ReactStars from "react-stars";
import {hideModal, showModals} from "../../redux/ModalContent";
import "./style.scss";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Modal = () => {
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const modalContent = useSelector((store) => store.ModalContent.data);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const nodeRef = useRef(null);
    const dispatch = useDispatch();
    const [raidCount, setRaidCount] = useState();

    return (
        <CSSTransition
            in={modalContent.show}
            nodeRef={nodeRef}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <div
                className="modal-sloy"
            >
                <div ref={nodeRef} className="modal-card">
                    {modalContent.status === "sms" && <div className="send-sms">
                        <div className="header">
                            <div className="xbtn">
                                <img   onClick={() => dispatch(hideModal({ show: false }))} src="./images/cancel.png" alt=""/>
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
                            <input placeholder="To'liq ismingizni yozing" type="text"/>
                            <input placeholder="Telefon raqamingizni kiriting" type="text"/>
                            <textarea placeholder="Siz kuzatilayotgan muammo haqida qisqacha izoh yozing" name=""
                                      id=""
                                      cols="30" rows="10"></textarea>
                        </div>
                        <div className="buttons-box">
                            <div  onClick={() => dispatch(hideModal({ show: false }))} className="cancel-btn">Bekor qilish</div>
                            <div className="send-btn">Yuborish</div>
                        </div>
                    </div>}

                    {modalContent.status === "contact" &&
                    <div className="contact">
                        <div className="header">
                            <div className="title">
                                Akfa medline
                            </div>
                            <div className="xbtn">
                                <img  onClick={() => dispatch(hideModal({ show: false }))} src="./images/cancel.png" alt=""/>
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

                    {modalContent.status === "commit" && <div className="send-commit">
                        <div className="header">
                            <div className="xbtn">
                                <img  onClick={() => dispatch(hideModal({ show: false }))} src="./images/cancel.png" alt=""/>
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
                            <input placeholder="Ism familiyangiz" type="text"/>

                            <input placeholder="Telefon raqamingiz" type="text"/>
                            <div className="description">
                                Sizning xavfsizligingiz uchun telefon raqami boshqa foydalanuvchilarga ko‘rinmaydi.
                            </div>

                            <textarea placeholder="Ijobiy va salbiy jihatlarni yozing" name=""
                                      id=""
                                      cols="30" rows="10"></textarea>
                        </div>

                        <div className="description">
                            Barcha izohlar tekshiruvdan o'tadi
                        </div>

                        <div className="send-btn">Saqlash va yuborish</div>
                    </div>}
                </div>
            </div>
        </CSSTransition>
    );
};
export default Modal;
