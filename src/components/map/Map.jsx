import {useEffect, useState, useMemo} from "react";
import {GoogleMap,useLoadScript} from "@react-google-maps/api";
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

const libraries = ["places"];

const Clinics = () => {
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
    const options = useMemo(
        () => ({
            disableDefaultUI: false,
            clickableIcons: false
        }),
        []
    );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const {latitude, longitude} = position.coords;
            let locMy = {lat: Number(latitude), lng: Number(longitude)}
            setCenter(locMy)
        });
    }, []);

    useEffect(() => {
        if (isLoaded) {
            setOnloadMap(true);
        }
    }, [isLoaded]);

    useEffect(() => {
        let locMy = {lat: Number(location.latitude), lng: Number(location.longitude)};
        setCenter(locMy)
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
            center={{lat: 41.295695, lng: 69.239730}}
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

            {onloadMap && (window.location.pathname === "/about-clinic" || window.location.pathname === "/") && <ClinicMarkers/>}
            {onloadMap && (window.location.pathname === "/about-doctor" || window.location.pathname === "/doctors") && <DoctorMarkers/>}
            {onloadMap && (window.location.pathname === "/about-pharmacies" || window.location.pathname === "/pharmacies") && <PharmaciesMarkers/>}
        </GoogleMap>
    </>
};

export default Clinics