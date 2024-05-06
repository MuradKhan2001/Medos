import {useEffect, useState, useMemo, useRef} from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import i18next from "i18next";
import {GOOGLE_MAPS_API_KEY} from "./googleMapsApi";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../../redux/locationUser";
import {show} from "../../redux/show-map";
import ClinicMarkers from "./ClinicMarkers";
import Doctors from "../doctors/Doctors";
import DoctorMarkers from "./DoctorMarkers";
import PharmaciesMarkers from "./PharmaciesMarkers";
import LoaderMap from "./loader-map/LoaderMap";

const libraries = ["places"];

const Clinics = () => {
    const dispatch = useDispatch();

    const location = useSelector((store) => store.LocationUser.data);
    const showMap = useSelector((store) => store.ShowMap.data);
    const menu = useSelector((store) => store.Menu.data);

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: libraries,
        language: i18next.language,
    });

    const options = useMemo(
        () => ({
            disableDefaultUI: false,
            clickableIcons: false
        }),
        []
    );

    const myLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&lan=en`;
            axios.get(`${url}`, {headers: {"Accept-Language": i18next.language}}).then((res) => {
                const location = {"city": res.data.address.city, "latitude": latitude, "longitude": longitude};
                dispatch(getLocation(location));
            });
        });
    };

    if (!isLoaded) return <LoaderMap/>;
    return <>
        <GoogleMap
            zoom={9}
            center={{lat: location.latitude, lng: location.longitude}}
            options={options}
            mapContainerClassName="map"
        >
            <div onClick={myLocation} className="my-location">
                <img src="./images/direction.png" alt=""/>
            </div>

            <div onClick={() => dispatch(show(!showMap))} className="show-hide-btn">
                <img className={showMap ? "hide-img" : ""} src="./images/Vector.png" alt=""/>
            </div>

            {menu === "/" && <ClinicMarkers/>}
            {menu === "/doctors" &&  <DoctorMarkers/>}
            {menu === "/pharmacies" && <PharmaciesMarkers/>}
        </GoogleMap>
    </>
};

export default Clinics