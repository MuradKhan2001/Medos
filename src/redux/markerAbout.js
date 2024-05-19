import {createSlice} from "@reduxjs/toolkit"

export const AboutMarker = createSlice({
    name: "AboutMarker",
    initialState: {
        data: ""
    },
    reducers: {
        getAboutMarker: (state, {payload}) => {
            state.data = payload
        },
    }
});

export const {getAboutMarker} = AboutMarker.actions;
export default AboutMarker.reducer