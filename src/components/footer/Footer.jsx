import "./footer-style.scss"
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const links = [
        {name: t('nav1'), link: "/"},
        {name: t("nav2"), link: "/doctors"},
        {name: t("nav4"), link: "/services"},
        {name: t("nav3"), link: "/pharmacies"},
        {name: t("saved"), link: "/saved"},
        {name: t("add-doctor"), link: "/register-doctor"},
        {name: t("add-clinic"), link: "/register-hospital"},
        {name: t("add-pharmacy"), link: "/register-pharmacies"}
    ];

    return <>
        <div className="footer-container">
            <div className="top-content">
                <div className="contents-footer">
                    {
                        links.map((item, index) => {
                            return <div onClick={()=>navigate(item.link)} key={index} className="links">
                                {item.name}
                            </div>
                        })
                    }
                </div>

                <div className="call">
                    <div className="title-call">1060</div>
                    <div className="des-call">
                        {t("des-footer")}
                    </div>
                </div>

                <div className="social-medias">
                    <div className="title-bot">medos.uz</div>
                    <div className="des-bot">
                        {t("des-footer2")}
                    </div>

                    <div className="icon-social-media">
                        <a href="#">
                            <img src="./images/instagram.png" alt=""/>
                        </a>
                        <a href="#">
                            <img src="./images/facebook.png" alt=""/>
                        </a>
                        <a href="#">
                            <img src="./images/telegram.png" alt=""/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="bottom-content-footer">
                <div className="text">
                    © 2024 medos.uz · {t("footer-text")}
                </div>
                <div className="uzb">
                    <img src="./images/globe.png" alt=""/>
                    {t("uzb")}
                </div>
            </div>
        </div>
    </>
};

export default Footer