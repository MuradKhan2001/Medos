import React, {useMemo, useState, useEffect, createContext} from "react";
import {Routes, Route} from "react-router-dom";
import NotFound from "../notFound/NotFound";
import {allRoutes, publicRoutes} from "../../routes/Routes";
import axios from "axios";
import i18next from "i18next";
import {useDispatch} from "react-redux";
import {getLocation} from "../../redux/locationUser";
import Modal from "../modal/Modal";
import Alerts from "../alerts/Alerts";


export const MainContext = createContext();

const App = () => {
    const [url, setUrl] = useState('https://api.buyukyol.uz/');
    const dispatch = useDispatch();

    const user = useMemo(() => localStorage.getItem('token'), []);

    const routes = useMemo(() => {
        if (user) return allRoutes;
        return publicRoutes
    }, [user]);

    const regions = [
        {name: "Andijon", latitude: 40.813616, longitude: 72.283463},
        {name: "Buxoro", latitude: 39.767070, longitude: 64.455393},
        {name: "Farg‘ona", latitude: 40.372379, longitude: 71.797770},
        {name: "Jizzax", latitude: 40.119300, longitude: 67.880140},
        {name: "Namangan", latitude: 41.004297, longitude: 71.642956},
        {name: "Navoiy", latitude: 40.096634, longitude: 65.352255},
        {name: "Qashqadaryo", latitude: 38.852124, longitude: 65.784203},
        {name: "Samarqand", latitude: 39.649307, longitude: 66.965182},
        {name: "Sirdaryo", latitude: 40.376986, longitude: 68.713159},
        {name: "Surxondaryo", latitude: 37.931559, longitude: 67.564765},
        {name: "Toshkent", latitude: 41.295695, longitude: 69.239730},
        {name: "Xorazm", latitude: 41.522326, longitude: 60.623731},
        {name: "Qoraqalpog‘iston", latitude: 43.730521, longitude: 59.064533}
    ];

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&lan=en`;
            axios.get(`${url}`, {headers: {"Accept-Language": i18next.language}}).then((res) => {
                const location = {
                    key: regions.findIndex(region => region.name === res.data.address.city),
                    "city": res.data.address.city, "latitude": Number(latitude), "longitude": Number(longitude)
                };
                dispatch(getLocation(location))
            });
        });
    }, []);

    return <MainContext.Provider value={url}>
        <Routes>
            {routes.map((route, index) => (<Route key={index} {...route} />))}
            <Route path={'*'} element={<NotFound/>}/>
        </Routes>
        <Modal/>
        <Alerts/>
    </MainContext.Provider>
};

export default App;