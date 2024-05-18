import "./clinic-style.scss"
import Navbar from "../navbar/Navbar";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Map from "../map/Map";
import Footer from "../footer/Footer";
import {showModals} from "../../redux/ModalContent";
import {useSelector, useDispatch} from "react-redux";


const AboutClinic = () => {
    const [like, setLike] = useState(false);
    const [tabActive, setTabActive] = useState(1);
    const [category, setCategory] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tabs = [
        {id: 1, name: "Umumiy"},
        {id: 2, name: "Shifokorlar"},
        {id: 3, name: "Izohlar"},
        {id: 4, name: "Xizmatlar va narxlar"}
    ];

    const ShowModal = (status, id) => {
        dispatch(showModals({show: true, status, id: id}))
    };

    const Category = [
        {id: 1, name: "Barchasi", count: 14},
        {id: 2, name: "Narkologlar", count: 4},
        {id: 3, name: "Dermatolog", count: 8},
        {id: 4, name: "Embriolog", count: 1},
        {id: 4, name: "Travmatolog", count: 6},
        {id: 4, name: "Pediatr", count: 5},
        {id: 4, name: "Terapevt", count: 7},
        {id: 4, name: "Urolog", count: 9},
        {id: 4, name: "Mammolog", count: 2},
    ];

    return <div className="about-clinic-box">
        <Navbar/>
        <div className="about-hospital">
            <div className="header">
                <div className="title">
                    Respublika ixtisoslashtirilgan kardiologiya markazi
                </div>

                <div className="buttons">
                    <div className="like">
                        {
                            like ?
                                <img onClick={() => setLike(false)} src="./images/like.png" alt=""/> :
                                <img onClick={() => setLike(true)} src="./images/no-like.png" alt=""/>
                        }

                    </div>

                    <div onClick={() => ShowModal("contact")}
                         className="button-call">Qo'ng'iroq qilish
                    </div>

                    <div onClick={() => ShowModal("sms", 1)} className="button-send">Yozish</div>
                </div>
            </div>
            <div className="body">
                <div className="section-commit">
                    <div className="raiting">
                        4.9
                    </div>
                    <div className="commit-count">
                        324 ta izoh
                    </div>
                    <span></span>
                    <div className="name">
                        Kasalxona
                    </div>
                </div>
                <div className="section-location">
                    <div className="location">
                        <img src="./images/icon.png" alt=""/>
                        Olmazor tumani
                    </div>
                    <span></span>
                    <div className="time-open">
                        <img src="./images/clock.png" alt=""/>
                        08:00 dan 18:00 gacha
                    </div>
                </div>

                <div className="images-location">
                    <div className="images-box">
                        <div className="image-hospital">
                            <img src="./images/hospital3.png" alt=""/>
                        </div>
                    </div>

                    <div className="location-box">
                        <Map/>
                    </div>
                </div>

                <div className="tab-hospital">
                    {tabs.map((item, index) => {
                        return <div key={index} onClick={() => setTabActive(item.id)}
                                    className={tabActive === item.id ? "tab-active" : "tab"}>
                            {item.name}
                        </div>
                    })}
                </div>

                {tabActive === 1 && <div className="all-info">
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
                    <div className="service-hospital">
                        <div className="title">
                            Shifokorlarning ixtisoslashuvi
                        </div>
                        <div className="contents">
                            <div className="service">
                                Androlog
                            </div>
                            <div className="service">
                                Gastroenterolog
                            </div>
                            <div className="service">
                                Gastroenterolog
                            </div>
                            <div className="service">
                                Anesteziolog
                            </div>
                            <div className="service">
                                Ginekolog
                            </div>
                            <div className="service">
                                Ginekolog
                            </div>
                            <div className="service">
                                Venereolog
                            </div>
                            <div className="service">
                                Dermatolog
                            </div>
                            <div className="service">
                                Ginekolog
                            </div>
                            <div className="service">
                                Venereolog
                            </div>
                            <div className="service">
                                Dermatolog
                            </div>
                        </div>
                        <div onClick={() => navigate("/about-clinic")} className="more-btn">
                            Ko'proq ko'rsatish
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

                            <div onClick={() => ShowModal("commit", 1)} className="btn-commit">
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
                </div>}

                {tabActive === 2 && <div className="doctors">
                    <div className="category-wrapper">
                        {
                            Category.map((item, index) => {
                                return <div key={index}>
                                    <div onClick={() => setCategory(item.id)}
                                         className={`category-name ${category === item.id ? "active" : ""}`}>
                                        {item.name} <span></span> {item.count}
                                    </div>
                                </div>
                            })
                        }
                    </div>

                    <div className="doctors-warapper">
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
                </div>}

                {tabActive === 3 && <div className="all-commits">
                    <div className="header-commet">
                        <div className="counts">
                            <div className="raiting">
                                4.9
                            </div>
                            <div className="commit-count">
                                324 ta izoh
                            </div>
                        </div>

                        <div onClick={() => ShowModal("commit", 1)} className="btn-commit">
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
                </div>}

                {tabActive === 4 && <div className="service-box">
                    <div className="category-wrapper">
                        {
                            Category.map((item, index) => {
                                return <div key={index}>
                                    <div onClick={() => setCategory(item.id)}
                                         className={`category-name ${category === item.id ? "active" : ""}`}>
                                        {item.name} <span></span> {item.count}
                                    </div>
                                </div>
                            })
                        }
                    </div>

                    <div className="one-service">
                        <div className="title">
                            Muolaja xonasi
                        </div>
                        <div className="service">
                            <div className="name">To‘liq qon ro‘yxati (BC-30)</div>
                            <div className="value">100 000 so‘m</div>
                        </div>

                        <div className="service">
                            <div className="name">To‘liq qon ro‘yxati (BC-30)</div>
                            <div className="value">300 000 so‘m</div>
                        </div>

                        <div className="service">
                            <div className="name">Umumiy koagulogramma (albatros)</div>
                            <div className="value">120 000 so‘m</div>
                        </div>

                        <div className="service">
                            <div className="name">Bilirubin testi (jami)</div>
                            <div className="value">180 000 so‘m</div>
                        </div>

                        <div onClick={() => navigate("/about-clinic")} className="more-btn">
                            Ko'proq ko'rsatish
                        </div>
                    </div>

                </div>}
            </div>
        </div>
        <Footer/>
    </div>
};

export default AboutClinic