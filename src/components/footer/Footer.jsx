import "./footer-style.scss"

const Footer = ()=>{

    const links =[
        {name:"Shofokorlar"},
        {name:"Doktorlar"},
        {name:"Xizmatlar"},
        {name:"Dorixonalar"},
        {name:"Saqlanganlar"},
        {name:"Shifokor qo'shish"},
        {name:"Dorixona qo'shish"},
        {name:"Shifoxona qo'shish"}
    ]

    return <>
        <div className="footer-container">
            <div className="top-content">
                <div className="contents-footer">
                    {
                        links.map((item,index)=>{
                            return <div key={index} className="links">
                                {item.name}
                            </div>
                        })
                    }
                </div>

                <div className="call">
                    <div className="title-call">1060</div>
                    <div className="des-call">
                        Savollar va takliflarga javob berish uchun ishonch telefon raqami. Qo‘ng‘iroq qilish bepul.
                    </div>
                </div>

                <div className="social-medias">
                    <div className="title-bot">@medossupportbot</div>
                    <div className="des-bot">
                        Botda mavjud bo‘lgan imkoniyatlar haqida qisqacha izoh yozib ketish kerak.
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
                    © 2024 medos.uz · Barcha huquqlar himoyalangan
                </div>

                <div className="uzb">
                    <img src="./images/globe.png" alt=""/>
                    O'zbekiston
                </div>
            </div>

        </div>
    </>
};

export default Footer