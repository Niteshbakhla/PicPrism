import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
            name: "posts",
            initialState: {
                        allPost: [],
                        myPost: [],
                        myFavourite: []
            },

            reducers: {
                        setAllPosts: (state, action) => {
                                    state.allPost = action.payload

                        },


                        setMyPosts: (state, action) => {
                                    state.myPost = action.payload

                        },

                        setMyFavourite: (state, action) => {
                                    state.myFavourite = action.payload;
                        }

            }
})

export const { setAllPosts, setMyPosts, setMyFavourite } = postSlice.actions;
export default postSlice.reducer