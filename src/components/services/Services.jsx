import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./style-services.scss"


const Service = () => {
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

    return <div className="service-container">
        <Navbar/>

        <div className="service-box">
            <div className="title">
                Xizmatlar
            </div>

            <div className="services-tab">
                {
                    Category.map((item, index) => {
                        return <div key={index}>
                            <div className="category-name">
                                {item.name} <span></span> {item.count}
                            </div>
                        </div>
                    })
                }
            </div>

            <div className="service-content">
                <div className="title-service">
                    Angiyografiya <span></span>
                    <div className="num">
                        9
                    </div>
                </div>
                <div className="services">
                    <div className="service">
                        Qorin bo‘lgan angiografiyasi
                    </div>
                    <div className="service">
                        Miya angiografiyasi
                    </div>
                    <div className="service">
                        Ko‘krak qafasi angiografiyasi
                    </div>
                    <div className="service">
                        Qorin bo‘lgan angiografiyasi
                    </div>
                    <div className="service">
                        Miya angiografiyasi
                    </div>
                    <div className="service">
                        Ko‘krak qafasi angiografiyasi
                    </div>
                </div>
                <div className="more-btn">
                    Ko‘proq ko‘rsatish
                </div>
            </div>

            <div className="service-content">
                <div className="title-service">
                    Doppler (ultratovushli doppler) <span></span>
                    <div className="num">
                        20
                    </div>
                </div>
                <div className="services">
                    <div className="service">
                        Qorin bo‘lgan angiografiyasi
                    </div>
                    <div className="service">
                        Miya angiografiyasi
                    </div>
                    <div className="service">
                        Ko‘krak qafasi angiografiyasi
                    </div>
                    <div className="service">
                        Qorin bo‘lgan angiografiyasi
                    </div>
                    <div className="service">
                        Miya angiografiyasi
                    </div>
                    <div className="service">
                        Ko‘krak qafasi angiografiyasi
                    </div>
                </div>
                <div className="more-btn">
                    Ko‘proq ko‘rsatish
                </div>
            </div>

            <div className="service-content">
                <div className="title-service">
                    Dupleks skanerlash <span></span>
                    <div className="num">
                        22
                    </div>
                </div>
                <div className="services">
                    <div className="service">
                        Qorin bo‘lgan angiografiyasi
                    </div>
                    <div className="service">
                        Miya angiografiyasi
                    </div>
                    <div className="service">
                        Ko‘krak qafasi angiografiyasi
                    </div>
                    <div className="service">
                        Qorin bo‘lgan angiografiyasi
                    </div>
                    <div className="service">
                        Miya angiografiyasi
                    </div>
                    <div className="service">
                        Ko‘krak qafasi angiografiyasi
                    </div>
                </div>
                <div className="more-btn">
                    Ko‘proq ko‘rsatish
                </div>
            </div>

        </div>
        <Footer/>
    </div>
};

export default Service