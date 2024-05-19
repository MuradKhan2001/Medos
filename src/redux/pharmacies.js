import {createSlice} from "@reduxjs/toolkit"

export const Pharmacies = createSlice({
    name: "Pharmacies",
    initialState: {
        data: []
    },
    reducers: {
        getPharmacies: (state, {payload}) => {
            state.data = payload
        },
    }
});

export const {getPharmacies} = Pharmacies.actions;
export default Pharmacies.reducer