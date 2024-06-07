import "./style.scss"
import Navbar from "../navbar/Navbar";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import MobileNavbar from "../mobile-navbar/MobileNavbar";


const Messages = () => {
    const baseUrl = useSelector((store) => store.baseUrl.data);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}patient/${localStorage.getItem("userId")}/`).then((response) => {
            setMessages(response.data);
        });
    }, []);
    const delMessage = (id) => {
        axios.delete(`${baseUrl}patient/${id}/`).then((response) => {
            axios.get(`${baseUrl}patient/${localStorage.getItem("userId")}/`).then((response) => {
                setMessages(response.data);
            });
        });
    };
    return <div className="messages-wrapper">
        <Navbar/>
        <div className="bottom-contents">
            <div className="left-side">
                <div className="title">
                    Kelib tushgan murojaat va xabarlar
                </div>
                <div className="messages">
                    {messages.map((item, index) => {
                        return <div key={index} className="message-box">
                            <div className="icon-message">
                                <img src="./images/mail.png" alt=""/>
                            </div>
                            <div onClick={() => delMessage(item.id)} className="del-icon">
                                <img src="./images/del-icon.png" alt=""/>
                            </div>
                            <div className="name">
                                {item.name}
                            </div>
                            <div className="number">
                                {item.phone}
                            </div>
                            <div className="des">
                                {item.text} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores,
                                consequuntur dolorem ea illum incidunt ipsam iste nisi perferendis quod quos ratione
                                similique tempora tempore. Assumenda at aut, consectetur consequuntur delectus dolorum
                                et explicabo fugit ipsa ipsam labore magni mollitia necessitatibus nihil nostrum odio
                                recusandae reiciendis sed ut voluptatibus. A culpa deserunt dolorem doloremque, dolores
                                ex nesciunt, quam quia quibusdam recusandae sequi veniam voluptas voluptatum. Ab dolore
                                et exercitationem minus qui quibusdam reprehenderit veritatis vitae. Accusamus aliquam
                                atque cupiditate debitis eaque eos et ex, expedita facere incidunt itaque labore laborum
                                magni minima, modi odio praesentium qui quia quos repudiandae rerum sapiente sequi
                                similique, sunt totam vel voluptates. Accusantium animi architecto consequuntur cumque,
                                cupiditate ea eos harum neque odio quae. Aliquam amet autem optio pariatur quam quasi
                                rerum voluptate. Architecto aspernatur eveniet excepturi impedit iusto laudantium
                                maiores minima. Corporis dignissimos doloribus, esse laborum mollitia obcaecati sed
                                similique sint, sit, soluta tenetur totam vel. Consectetur consequuntur corporis
                                deserunt dicta dignissimos error eveniet ex fuga harum illo illum inventore, ipsam iusto
                                labore mollitia nesciunt non odio odit officiis omnis praesentium provident qui
                                reprehenderit saepe temporibus veniam, voluptas. Deleniti doloremque eius enim maiores
                                minima nesciunt perferendis totam? Amet dolore expedita iure nesciunt perspiciatis
                                reiciendis repellendus.
                            </div>
                            <div className="time">
                                <span>Qabul kuni:</span>
                                {item.utime}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
        <div className="mobile-navbar-container">
            <MobileNavbar/>
        </div>
    </div>
};

export default Messages