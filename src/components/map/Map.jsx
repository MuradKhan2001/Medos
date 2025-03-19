import {useEffect, useState, useMemo} from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import i18next from "i18next";
import {GOOGLE_MAPS_API_KEY} from "./googleMapsApi";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../../redux/locationUser";
import {show} from "../../redux/show-map";
import LoaderMap from "./loader-map/LoaderMap";
import {useNavigate} from "react-router-dom";
import ClinicMarkers from "./ClinicMarkers";
import DoctorMarkers from "./DoctorMarkers";
import PharmaciesMarkers from "./PharmaciesMarkers";
import AboutMarker from "./AboutMarker";
import {useTranslation} from "react-i18next";

const libraries = ["places"];

const Map = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [onloadMap, setOnloadMap] = useState(false)
    const location = useSelector((store) => store.LocationUser.data);
    const showMap = useSelector((store) => store.ShowMap.data);
    const [center, setCenter] = useState(null)
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: libraries,
        language: i18next.language,
    });

    const regions = [
        {name: t("Andijan"), latitude: 40.813616, longitude: 72.283463},
        {name: t("Bukhara"), latitude: 39.767070, longitude: 64.455393},
        {name: t("Ferghana"), latitude: 40.372379, longitude: 71.797770},
        {name: t("Jizzakh"), latitude: 40.119300, longitude: 67.880140},
        {name: t("Namangan"), latitude: 41.004297, longitude: 71.642956},
        {name: t("Navoi"), latitude: 40.096634, longitude: 65.352255},
        {name: t("Kashkadarya"), latitude: 38.852124, longitude: 65.784203},
        {name: t("Samarkand"), latitude: 39.649307, longitude: 66.965182},
        {name: t("SyrDarya"), latitude: 40.376986, longitude: 68.713159},
        {name: t("Surkhandarya"), latitude: 37.931559, longitude: 67.564765},
        {name: t("Tashkent"), latitude: 41.295695, longitude: 69.239730},
        {name: t("Khorezm"), latitude: 41.522326, longitude: 60.623731},
        {name: t("Karakalpakstan"), latitude: 43.730521, longitude: 59.064533}
    ];
    const options = useMemo(
        () => ({
            disableDefaultUI: false,
            clickableIcons: false
        }),
        []
    );

    useEffect(() => {
        if (isLoaded) {
            setOnloadMap(true);
        }
    }, [isLoaded]);

    useEffect(() => {
        if (location.latitude && location.longitude) {
            let locMy = {lat: Number(location.latitude), lng: Number(location.longitude)};
            setCenter(locMy)
        }
    }, [location]);

    const myLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&lan=en`;
            axios.get(`${url}`, {headers: {"Accept-Language": i18next.language}}).then((res) => {
                let regionkey = regions.findIndex(region => region.name === res.data.address.city)
                const location = {
                    key: regionkey,
                    "city": res.data.address.city,
                    "latitude": latitude,
                    "longitude": longitude
                };
                dispatch(getLocation(location));
            });
        });
    };

    if (!isLoaded) return <LoaderMap/>;
    return <>
        <GoogleMap
            zoom={9}
            center={center}
            options={options}
            mapContainerClassName="map"
            onLoad={() => setOnloadMap(true)}
        >
            <div onClick={myLocation} className="my-location">
                <img src="./images/direction.png" alt=""/>
            </div>

            <div onClick={() => dispatch(show(!showMap))} className="show-hide-btn">
                <img className={showMap ? "hide-img" : ""} src="./images/Vector.png" alt=""/>
            </div>

            {onloadMap && window.location.pathname === "/" && <ClinicMarkers/>}
            {onloadMap && window.location.pathname === "/doctors" && <DoctorMarkers/>}
            {onloadMap && window.location.pathname === "/pharmacies" && <PharmaciesMarkers/>}
        </GoogleMap>
    </>
};

export default Map