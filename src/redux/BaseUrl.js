import {createSlice} from "@reduxjs/toolkit"

export const baseUrl = createSlice({
    name: "baseUrl",
    initialState: {data: "http://192.168.0.102:8000/api/v1/"},
});

export default baseUrl.reducer

