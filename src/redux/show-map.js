import {createSlice} from "@reduxjs/toolkit"

export const ShowMap = createSlice({
    name: "ShowMap",
    initialState: {
        data: false
    },
    reducers: {
        show: (state, {payload}) => {
            state.data = payload
        },
    }
});

export const {show} = ShowMap.actions;
export default ShowMap.reducer