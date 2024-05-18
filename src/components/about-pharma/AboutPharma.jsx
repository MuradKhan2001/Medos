import "./style-pharma.scss"
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Map from "../map/Map";
import {showModals} from "../../redux/ModalContent";

const AboutPharma = () => {
    const [like, setLike] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const ShowModal = (status) => {
        dispatch(showModals({show: true, status}))
    };

    return <div className="about-pharmacies">
        <Navbar/>
        <div className="pharmaci-box">
            <div className="header">
                <img src="./images/pharma.png" alt=""/>
            </div>
            <div className="title-pahrma">
                Oxymed
            </div>
            <div className="section-commit">
                <div className="raiting">
                    4.9
                </div>
                <div className="commit-count">
                    324 ta izoh
                </div>
                <span></span>
                <div className="name">
                    Dorixona
                </div>
            </div>
            <div className="section-commit">
                <div className="commit-open">
                    Ochiq
                </div>
                <span></span>
                <div className="name">
                    22:00 da yopiladi
                </div>
            </div>
            <div className="map-locations">
                <div className="map-side">
                    <Map/>
                </div>
                <div className="information-location">
                    <div className="title">
                        <img src="./images/loaction-pharma.png" alt=""/>
                        Manzil
                    </div>
                    <div className="info">
                        Shayxontohur tumani, Kichik Xalqa yo‘li,
                    </div>

                    <div className="title">
                        <img src="./images/time-pharma.png" alt=""/>
                        Ish vaqti
                    </div>
                    <div className="section-commit">
                        <div className="name">
                            8:00 - 22:00
                        </div>
                    </div>

                    <div className="title">
                        <img src="./images/phone-pharma.png" alt=""/>
                        Bog'lanish
                    </div>

                    <div className="contact">
                        +998 94 100 2002
                    </div>

                    <div className="social-medias">
                        <div className="items">
                            <img src="./images/globe-pahrma.png" alt=""/>
                        </div>

                        <div className="items">
                            <img src="./images/instagram-pahrma.png" alt=""/>
                        </div>

                        <div className="items">
                            <img src="./images/telegram-pahrma.png" alt=""/>
                        </div>
                    </div>
                </div>

            </div>
            <div className="comments-box">
                <div className="header-commet">
                    <div className="counts">
                        <div className="raiting">
                            4.9
                        </div>
                        <div className="commit-count">
                            324 ta izoh
                        </div>
                    </div>

                    <div onClick={() => ShowModal("commit")} className="btn-commit">
                        <img src="./images/comit.png" alt=""/>
                        Izoh yozib qoldirish
                    </div>
                </div>

                <div className="commits">
                    <div className="header-commit">
                        <div className="left-circle">
                            D
                        </div>
                        <div className="right-names">
                            <div className="name">Durdona Valiyeva <span>24-fevral, 2023</span></div>
                            <div className="stars">
                                <img src="./images/raiting1.png" alt=""/>
                                <img src="./images/raiting1.png" alt=""/>
                                <img src="./images/raiting1.png" alt=""/>
                                <img src="./images/raiting1.png" alt=""/>
                                <img src="./images/raiting2.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="text-commit">
                        Chiroyli zamonaviy klinika. Men operatsiyani o‘tkazdim va keyin bir necha kun o‘sha erda
                        qoldim. Yoqimli va sezgir tibbiyot xodimlari, sabrlari uchun ularga alohida rahmat! Va,
                        albatta, davolovchi shifokor Rustam Ashurmatovga RAHMAT! Diqqatli va yoqimli
                        shifokorlar, o‘z sohasining professionallari. Sizga katta rahmat!!!!
                    </div>
                </div>

                <div className="commits">
                    <div className="header-commit">
                        <div className="left-circle">
                            D
                        </div>
                        <div className="right-names">
                            <div className="name">Durdona Valiyeva <span>24-fevral, 2023</span></div>
                            <div className="stars">
                                <img src="./images/raiting1.png" alt=""/>
                                <img src="./images/raiting1.png" alt=""/>
                                <img src="./images/raiting1.png" alt=""/>
                                <img src="./images/raiting1.png" alt=""/>
                                <img src="./images/raiting2.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="text-commit">
                        Chiroyli zamonaviy klinika. Men operatsiyani o‘tkazdim va keyin bir necha kun o‘sha erda
                        qoldim. Yoqimli va sezgir tibbiyot xodimlari, sabrlari uchun ularga alohida rahmat! Va,
                        albatta, davolovchi shifokor Rustam Ashurmatovga RAHMAT! Diqqatli va yoqimli
                        shifokorlar, o‘z sohasining professionallari. Sizga katta rahmat!!!!
                    </div>
                </div>

                <div onClick={() => navigate("/about-clinic")} className="more-btn">
                    Ko'proq ko'rsatish
                </div>
            </div>
        </div>

        <Footer/>
    </div>
};

export default AboutPharma