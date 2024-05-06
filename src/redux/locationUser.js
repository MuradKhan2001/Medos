import {createSlice} from "@reduxjs/toolkit"

export const LocationUser = createSlice({
    name: "LocationUser",
    initialState: {
        data: ""
    },
    reducers: {
        getLocation: (state, {payload}) => {
            state.data = payload
        },
    }
});

export const {getLocation} = LocationUser.actions;
export default LocationUser.reducer