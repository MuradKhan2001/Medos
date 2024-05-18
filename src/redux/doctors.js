import {createSlice} from "@reduxjs/toolkit"

export const Doctors = createSlice({
    name: "Doctors",
    initialState: {
        data: [{id: 1, latitude: "41.311153", longitude: "69.279729"}]
    },
    reducers: {
        getDoctor: (state, {payload}) => {
            state.data = payload
        },
    }
});

export const {getDoctor} = Doctors.actions;
export default Doctors.reducer