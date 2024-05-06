import {configureStore} from "@reduxjs/toolkit"
import baseUrl from "./BaseUrl";
import LocationUser from "./locationUser";
import ShowMap from "./show-map";
import Menu from "./menu";
import ModalContent from "./ModalContent";

export const store = configureStore({
    reducer: {
        baseUrl,
        LocationUser,
        ShowMap,
        Menu,
        ModalContent
    }
});