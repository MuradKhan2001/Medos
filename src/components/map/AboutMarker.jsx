import {MarkerF} from "@react-google-maps/api";
import {useSelector} from "react-redux";

const AboutMarker = () => {
    const aboutMarker = useSelector((store) => store.MarkerAbout.data);
    const icon = {url: './images/address.png', scaledSize: {width: 50, height: 65}};
    let location = {lat: Number(aboutMarker.split(",")[0]), lng: Number(aboutMarker.split(",")[1])};
    return <>
        <MarkerF
            key={location.lat}
            position={location}
            icon={icon}
        />
    </>
};

export default AboutMarker