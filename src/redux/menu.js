import {createSlice} from "@reduxjs/toolkit"

export const Menu = createSlice({
    name: "Menu",
    initialState: {
        data: false
    },
    reducers: {
        changeMenu: (state, {payload}) => {
            state.data = payload
        },
    }
});

export const {changeMenu} = Menu.actions;
export default Menu.reducer