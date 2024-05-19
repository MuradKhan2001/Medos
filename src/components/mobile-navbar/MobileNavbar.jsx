import "./style.scss"
import {NavLink, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const MobileNavbar = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const Menus = [
        {
            name: t('nav1'),
            url: "/",
            icon: "clinic"
        },
        {
            name: t('nav2'),
            url: "/doctors",
            icon: "doctor"
        },
        {
            name: t('nav3'),
            url: "/pharmacies",
            icon: "pharmacy"
        },
        {
            name: t('nav4'),
            url: "/services",
            icon: "service"
        }
    ];

    return <div className="mobile-navbar">
        <div className="menu-wrapper">
            {
                Menus.map((item, index) => {
                    return <NavLink to={item.url} key={index}
                                    className={`menu-item ${({isActive}) => isActive ? "active" : ""}`}>

                        <div className="icon">
                            <div className={`icons ${item.icon}`}/>
                        </div>

                        <span> {item.name}</span>
                    </NavLink>
                })
            }
        </div>
    </div>
};

export default MobileNavbar