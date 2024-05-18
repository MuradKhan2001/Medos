import {createSlice} from "@reduxjs/toolkit"

export const Pharmacies = createSlice({
    name: "Pharmacies",
    initialState: {
        data: [{id: 1, latitude: "41.311153", longitude: "69.279729"}]
    },
    reducers: {
        getPharmacies: (state, {payload}) => {
            state.data = payload
        },
    }
});

export const {getPharmacies} = Pharmacies.actions;
export default Pharmacies.reducer