import "./clinic-doctor.scss"
import Navbar from "../navbar/Navbar";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Map from "../map/Map";
import Footer from "../footer/Footer";
import {showModals} from "../../redux/ModalContent";
import {useSelector, useDispatch} from "react-redux";


const AboutDoctor = () => {
    const [like, setLike] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const ShowModal = (status) => {
        dispatch(showModals({show: true, status}))
    };

    return <div className="about-doctor-box">
        <Navbar/>

        <div className="about-hospital">
            <div className="header">
                <div className="photo-doctor">
                    <img src="./images/doctor.png" alt=""/>
                </div>

                <div className="infotmation-doctor">
                    <div className="title">
                        Aktubayeva Anora
                    </div>
                    <div className="info">
                        <div className="items">Stomotolog</div>
                        <div className="items">16 yillik tajriba</div>
                    </div>
                    <div className="section-commit">
                        <div className="raiting">
                            4.9
                        </div>
                        <span></span>
                        <div className="commit-count">
                            324 ta izoh
                        </div>
                    </div>
                    <div className="location">
                        Akademik Y.X.Turakulov nomidagi Respublika ixtisoslashtirilgan endokrinologiya ilmiy-amaliy
                        tibbiyot markazi
                    </div>
                    <div className="skills">
                        <div className="skill">
                            Bolalar stomatolog
                        </div>
                        <div className="skill">
                            Stomatolog-terapevt
                        </div>
                        <div className="skill">
                            Stomatolog jarroh
                        </div>
                    </div>

                    <div className="like">
                        {
                            like ?
                                <img onClick={() => setLike(false)} src="./images/like.png" alt=""/> :
                                <img onClick={() => setLike(true)} src="./images/no-like.png" alt=""/>
                        }

                        <div className="name">Saqlash</div>
                    </div>
                </div>

                <div className="buttons">
                    <div className="title">
                        Ish vaqti
                    </div>
                    
                    <div className="date">
                        <img src="./images/calendar.png" alt=""/>
                        Dushanba, Chorshanba, Payshanba, Juma, Shanba
                    </div>

                    <div className="date">
                        <img src="./images/clock2.png" alt=""/>
                        09:00-15:00
                    </div>
                    
                    <div className="line"></div>

                    <div className="title">
                        Xizmat narxi
                    </div>

                    <div className="prices">
                        <div className="item-price">
                            <div className="title">Birinchi konsultatsiya</div>
                            <div className="number">650 000 so'm</div>
                        </div>

                        <div className="item-price">
                            <div className="title">Takroriy konsultatsiya</div>
                            <div className="number">Narxi so'rov bo'yicha</div>
                        </div>
                    </div>

                    <div onClick={() => ShowModal("sms")} className="button-send">Qabuliga yozish</div>
                    <div onClick={() => ShowModal("contact")}
                         className="button-call">Qo'ng'iroq qilish
                    </div>
                </div>
            </div>

            <div className="body">
                <div className="all-info-hospital">
                    <div className="title">
                        Shifoxona haqida
                    </div>
                    <div className="des">
                        Diagnostika va davolash xizmatlarining to‘liq to‘plamiga ega bo‘lgan Akfa Medline ko‘p
                        tarmoqli tibbiy markazi yordamida siz tez va oson sifatli tibbiy yordam olishingiz mumkin.
                        Yuqori malakali xodimlar va eng sifatli uskunalarga ega klinika sog‘ligingiz uchun zarur
                        bo‘lgan hamma narsani bir joyda taqdim etadi. Unda barcha tor mutaxassisliklar bo‘yicha
                        shifokorlar xizmatidan foydalanish mumkin bo‘lgan poliklinika, operatsion blok, shinam
                        palatalardan iborat 12 qavatli shifoxona, eng yangi ish qurollari bilan jihozlangan
                        laboratoriya, spa va restoran mavjud.
                        Klinikada sizga ko‘p yillik tajribaga ega malakali mutaxassislar xizmat ko‘rsatadi. Bu yerda
                        neyroxirurgiya, angioxirurgiya, kardiojarrohlik va ortopediya yo‘nalishlarida murakkab
                        operatsiyalar amalga oshiriladi. Shifokorlar jamoasi har bir bemorga individual yordam
                        ko‘rsatish va davolashni ta‘minlashga intiladi. Akfa Medline klinikasida keng qamrovli
                        diagnostika va malakali davolashdan tortib jarrohlik operatsiyalarigacha bo‘lgan barcha
                        jarayonlar davomida ishonchli qo‘llarda bo‘lasiz.
                        Klinikada sizga ko‘p yillik tajribaga ega malakali mutaxassislar xizmat ko‘rsatadi. Bu yerda
                        neyroxirurgiya, angioxirurgiya, kardiojarrohlik va ortopediya yo‘nalishlarida murakkab
                        operatsiyalar amalga oshiriladi. Shifokorlar jamoasi har bir bemorga individual yordam
                        ko‘rsatish va davolashni ta‘minlashga intiladi. Akfa Medline klinikasida keng qamrovli
                        diagnostika va malakali davolashdan tortib jarrohlik operatsiyalarigacha bo‘lgan barcha
                        jarayonlar davomida ishonchli qo‘llarda bo‘lasiz.
                    </div>
                </div>

                <div className="images-location">
                    <div className="title">Ishxona manzili</div>
                    <div className="location">
                        <img src="./images/loaction.png" alt=""/>
                        Shayxontohur tumani, Kichik Xalqa yo‘li, 9-uy
                    </div>
                    <div className="location-box">
                        <Map/>
                    </div>
                </div>

                <div className="comments-box">
                    <div className="header-commet">
                        <div className="counts">
                            <div className="commit-count">
                                Mijozlar fikri
                            </div>
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

                <div className="doctors-warapper">
                    <div className="title">
                        O'xshash doctorlar
                    </div>
                    <div className="doctor">
                        <div className="left-side">
                            <img src="./images/doctor.png" alt=""/>
                            <div className="like">
                                {
                                    like ?
                                        <img onClick={() => setLike(false)} src="./images/like.png" alt=""/> :
                                        <img onClick={() => setLike(true)} src="./images/no-like.png" alt=""/>
                                }
                            </div>
                        </div>

                        <div className="right-side">
                            <div className="header-clinic">
                                <div className="name-clinic">
                                    Aktubaev Alisher
                                </div>

                                <div className="section-commit">
                                    <div className="raiting">
                                        4.88
                                    </div>
                                    <span></span>
                                    <div className="commit-count">
                                        324 ta izoh
                                    </div>
                                </div>
                            </div>

                            <div className="section-location">
                                <div className="location">
                                    <img src="./images/job.png" alt=""/>
                                    Stomotolog
                                </div>
                                <span></span>
                                <div className="time-open">
                                    16 yillik tajriba
                                </div>
                            </div>

                            <div className="section-location">
                                <div className="location">
                                    <img src="./images/icon.png" alt=""/>
                                    Olmazor tumani
                                </div>
                                <span></span>
                                <div className="time-open">
                                    Akfa medline
                                </div>
                            </div>

                            <div className="section-location">
                                <div className="location">
                                    <img src="./images/time.png" alt=""/>
                                    Dushanba, Chorshanba, Payshanba, Juma
                                </div>
                                <span></span>
                                <div className="time-open">
                                    9:00 - 15:00
                                </div>
                            </div>

                            <div className="services">
                                <div className="service">
                                    Bolalar stomatolog
                                </div>
                                <div className="service">
                                    Stomatolog-terapevt
                                </div>
                                <div className="service">
                                    Stomatolog jarroh
                                </div>
                            </div>

                            <div className="prices">
                                <div className="item-price">
                                    <div className="title">Birinchi konsultatsiya</div>
                                    <div className="number">650 000 so'm</div>
                                </div>

                                <div className="item-price">
                                    <div className="title">Takroriy konsultatsiya</div>
                                    <div className="number">Narxi so'rov bo'yicha</div>
                                </div>
                            </div>

                            <div className="buttons">
                                <div className="left-btn">
                                    <div onClick={() => ShowModal("sms")} className="button-send">
                                        Qabuliga yozilish
                                    </div>
                                    <div onClick={() => ShowModal("contact")} className="button-call">Qo'ng'iroq
                                        qilish
                                    </div>
                                </div>

                                <div onClick={() => navigate("/about-clinic")} className="more-btn">
                                    Ko'proq ko'rsatish
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
};

export default AboutDoctor