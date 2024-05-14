import {configureStore} from "@reduxjs/toolkit"
import baseUrl from "./BaseUrl";
import LocationUser from "./locationUser";
import ShowMap from "./show-map";
import Menu from "./menu";
import ModalContent from "./ModalContent";
import Doctors from "./DoctorProfile";


export const store = configureStore({
    reducer: {
        baseUrl,
        LocationUser,
        ShowMap,
        Menu,
        ModalContent,
        Doctors
    }
});