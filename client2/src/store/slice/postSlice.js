import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
            name: "posts",
            initialState: {
                        allPost: [],
                        myPost: [],
            },

            reducers: {
                        setAllPosts: (state, action) => {
                                    state.myPost = action.payload
                        },

                        setMyPosts: (state, action) => {
                                    state.myPost = action.payload
                                    console.log("heyheyhey")
                        }
            }
})

export const { setAllPosts, setMyPosts } = postSlice.actions;
export default postSlice.reducer