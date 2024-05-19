import {createSlice} from "@reduxjs/toolkit"

export const Clinics = createSlice({
    name: "Clinics",
    initialState: {
        data: []
    },
    reducers: {
        getClinics: (state, {payload}) => {
            state.data = payload
        },
    }
});

export const {getClinics} = Clinics.actions;
export default Clinics.reducer