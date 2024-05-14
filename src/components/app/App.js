import React, {useMemo, useState, useEffect, createContext} from "react";
import {Routes, Route} from "react-router-dom";
import NotFound from "../notFound/NotFound";
import {allRoutes, publicRoutes} from "../../routes/Routes";
import axios from "axios";
import i18next from "i18next";
import {useDispatch} from "react-redux";
import {getLocation} from "../../redux/locationUser";
import Modal from "../modal/Modal";


export const MainContext = createContext();

const App = () => {
    const [url, setUrl] = useState('https://api.buyukyol.uz/');
    const dispatch = useDispatch();

    const user = useMemo(() => localStorage.getItem('token'), []);

    const routes = useMemo(() => {
        if (user) return allRoutes;
        return publicRoutes
    }, [user]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&lan=en`;
            axios.get(`${url}`, {headers: {"Accept-Language": i18next.language}}).then((res) => {
                const location = {"city": res.data.address.city, "latitude": latitude, "longitude": longitude}
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
    </MainContext.Provider>
};

export default App;