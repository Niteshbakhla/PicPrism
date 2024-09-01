import React, { useEffect, useState } from 'react'
import { Dashboard } from '../components/Dashboard'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { ImageCard } from '../components/ImageCard'
import { RiShoppingCart2Line } from 'react-icons/ri'
import { Button } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { setMyFavourite } from '../store/slice/postSlice'

const Favourite = () => {


            const posts = useSelector(state => state.posts.myFavourite)
            const dispatch = useDispatch()

            const getFavouriteImage = async () => {
                        try {
                                    const { data } = await axios.get(import.meta.env.VITE_API_URL + "/post/favourite", {
                                                headers: {
                                                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                                                }
                                    })



                                    dispatch(setMyFavourite(data.data))

                        } catch (error) {

                                    toast.success(error.response.data.message)
                                    console.log(error.message)
                        }
            }

            const removeFromFavourites = async (postId) => {
                        try {
                                    const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/posts/removeFavourites/${postId}`, {}, {
                                                headers: {
                                                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                                                }
                                    })

                                    toast.success(data.message)


                        } catch (error) {
                                    console.log(error)
                        }
            }


            useEffect(() => {
                        getFavouriteImage()
            }, [])
            return (
                        <>

                                    <Dashboard />
                                    <div className='max-w-6xl b  mx-auto grid grid-cols-1 shadow-2xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[600px] overflow-y-auto'>
                                                <Toaster position='top-center' />
                                                {
                                                            posts.length === 0 && <h1 className='text-6xl text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  '>No favourites</h1>
                                                }
                                                {
                                                            posts?.map(({ _id, title, image, author, price }) => (
                                                                        <ImageCard
                                                                                    key={Math.random()}
                                                                                    _id={_id}
                                                                                    title={title}
                                                                                    image={image}
                                                                                    price={price}
                                                                                    button1={<Button onClick={() => removeFromFavourites(_id)}>remove</Button>}

                                                                        />
                                                            ))
                                                }
                                    </div>

                        </>
            )
}

export default Favourite