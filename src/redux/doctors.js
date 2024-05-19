import {createSlice} from "@reduxjs/toolkit"

export const Doctors = createSlice({
    name: "Doctors",
    initialState: {
        data: []
    },
    reducers: {
        getDoctor: (state, {payload}) => {
            state.data = payload
        },
    }
});

export const {getDoctor} = Doctors.actions;
export default Doctors.reducer