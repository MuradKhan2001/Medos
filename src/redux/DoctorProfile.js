import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const getDoctor = createAsyncThunk("getDoctor", async (payload) => {
    return fetch(`http://192.168.0.102:8000/api/v1/doctor-profile/`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`
        }
    }).then((res) => res.json())

})

export const doctorSlice = createSlice({
    name: "Doctor", initialState: {data: [], status: "", activeOrders: ""}, reducers: {}, extraReducers: (builder) => {
        builder
            .addMatcher(getDoctor, (state, {payload}) => {
                state.status = "pending"
            })

            .addMatcher((action) => action.type.endsWith('/rejected'), (state, {payload}) => {
                state.status = "rejected"
            })

            .addMatcher((action) => action.type.endsWith('/fulfilled'), (state, {payload}) => {
                state.status = "success";
                state.data = payload;
            })
    }
})

export default doctorSlice.reducer