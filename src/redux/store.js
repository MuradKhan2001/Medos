import {configureStore} from "@reduxjs/toolkit"
import baseUrl from "./BaseUrl";
import LocationUser from "./locationUser";
import ShowMap from "./show-map";
import Menu from "./menu";
import Clinics from "./clinics";
import ModalContent from "./ModalContent";
import Alerts from  "./AlertsBox";
import Doctors from "./doctors";
import MarkerAbout from "./markerAbout";
import Pharmacies from "./pharmacies";


export const store = configureStore({
    reducer: {
        baseUrl,
        LocationUser,
        ShowMap,
        Menu,
        ModalContent,
        Doctors,
        Pharmacies,
        Alerts,
        Clinics,
        MarkerAbout
    }
});