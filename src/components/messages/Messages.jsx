import "./style.scss"
import Navbar from "../navbar/Navbar";


const Messages = () => {
    return <div className="messages-wrapper">
        <Navbar/>
        <div className="bottom-contents">
            <div className="left-side">
                <div className="title">
                    Kelib tushgan murojaat va xabarlar
                </div>
                <div className="messages">
                    <div className="message-box">
                        <div className="icon-message">
                            <img src="./images/mail.png" alt=""/>
                        </div>
                        <div className="del-icon">
                            <img src="./images/del-icon.png" alt=""/>
                        </div>
                        <div className="name">
                            Malikov Murodxon Adham o'g'li
                        </div>
                        <div className="number">
                            +998941882001
                        </div>
                        <div className="des">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus assumenda commodi dolorem
                            dolores, eius eveniet, exercitationem facere fugiat hic itaque obcaecati placeat praesentium sit
                            sunt suscipit vero voluptate! Eius nemo repellendus vero? Ab alias earum facere nihil quae.
                            Autem culpa cumque, ea similique soluta vel. Aperiam officia porro quas!
                        </div>
                    </div>
                </div>
               
            </div>
            <div className="right-side">
                <div className="my-information-card">
                    <div className="img-box">
                        <img src="./images/clinic.png" alt=""/>
                    </div>
                    <div className="info-box">
                        <div className="name">Akfa medline</div>
                        <div className="info">
                            <img src="./images/phone-pharma.png" alt=""/>
                            +9992922929
                        </div>
                        <div className="info">
                            <img src="./images/loaction-pharma.png" alt=""/>
                            Olmazor tumani
                        </div>
                        <div className="info">
                            <img src="./images/time-pharma.png" alt=""/>
                            08:00 dan 18:00 gacha
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Messages