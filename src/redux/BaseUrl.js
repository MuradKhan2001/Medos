import {createSlice} from "@reduxjs/toolkit"

export const baseUrl = createSlice({
    name: "baseUrl",
    initialState: {data: "https://api.medos.uz/api/v1/"},
});

export default baseUrl.reducer

