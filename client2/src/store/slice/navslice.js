import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
            name: "navMenu",
            initialState: {
                        menuOpen: false,
            },
            reducers: {
                        toggleMenu: (state) => {
                                    state.menuOpen = !state.menuOpen;
                        },
                        // openMenu: (state) => {
                        //             state.menuOpen = true;
                        // },
                        // closeMenu: (state) => {
                        //             state.menuOpen = false;
                        // },
            },
});

export const { toggleMenu, openMenu, closeMenu } = navSlice.actions;

export default navSlice.reducer;
