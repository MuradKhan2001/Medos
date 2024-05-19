import {useEffect, useState, useMemo} from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import i18next from "i18next";
import {GOOGLE_MAPS_API_KEY} from "./googleMapsApi";
import {useDispatch, useSelector} from "react-redux";
import LoaderMap from "./loader-map/LoaderMap";
import AboutMarker from "./AboutMarker";

const libraries = ["places"];

const MapAbout = () => {
    const aboutMarker = useSelector((store) => store.MarkerAbout.data);
    const [onloadMap, setOnloadMap] = useState(false)
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: libraries,
        language: i18next.language,
    });
    let locationAbout = {lat: Number(aboutMarker.split(",")[0]), lng: Number(aboutMarker.split(",")[1])};

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

    if (!isLoaded) return <LoaderMap/>;
    return <>
        <GoogleMap
            zoom={9}
            center={locationAbout}
            options={options}
            mapContainerClassName="map"
            onLoad={() => setOnloadMap(true)}
        >
            {onloadMap && <AboutMarker/>}
        </GoogleMap>
    </>
};

export default MapAbout