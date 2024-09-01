import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slice/authSlice"
import postSlice from "./slice/postSlice"
import navslice from "./slice/navslice"
import orderslice from "./slice/orderslice"



export const store = configureStore({
            reducer: {
                        auth: authSlice,
                        posts: postSlice,
                        menu: navslice,
                        order: orderslice
            }
})