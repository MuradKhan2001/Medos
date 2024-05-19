import {createSlice} from "@reduxjs/toolkit"

export const baseUrl = createSlice({
    name: "baseUrl",
    initialState: {data: "http://138.197.97.98/api/v1/"},
});

export default baseUrl.reducer

