import {createSlice} from "@reduxjs/toolkit"

export const Clinics = createSlice({
    name: "Clinics",
    initialState: {
        data: [{id: 1, latitude: "41.311153", longitude: "69.279729"}]
    },
    reducers: {
        getClinics: (state, {payload}) => {
            state.data = payload
        },
    }
});

export const {getClinics} = Clinics.actions;
export default Clinics.reducer