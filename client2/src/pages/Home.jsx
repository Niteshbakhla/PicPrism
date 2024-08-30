import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllPosts } from '../store/slice/postSlice'
import { ImageCard } from '../components/ImageCard'
import toast, { Toaster } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { RiShoppingCart2Line } from "react-icons/ri";
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@material-tailwind/react'
import { Dashboard } from "../components/Dashboard"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export const Home = () => {
    const [order, setOrder] = useState(null);
    const dispatch = useDispatch()
    const location = useLocation();
    const posts = useSelector((state) => state.posts.allPost)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const navigate = useNavigate()

    const getAllImages = async () => {
        if (posts?.length > 0) return
        const res = await axios.get(import.meta.env.VITE_API_URL + "/post/getAll")
        const { data } = res.data;
        dispatch(setAllPosts(data))

    }


    const paymentImage = async (postId, author) => {
        if (!isAuthenticated) {
            toast.error("Please login to purchase asset");
            navigate("/login")
            return
        }

        try {
            const stripe = await stripePromise;
            const { data } = await axios.post(import.meta.env.VITE_API_URL + "/payment/generate",
                {
                    postId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    },
                }
            );

            // return console.log(data.posts.purchaseBy)

            const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
            if (error) {
                console.error('Stripe Checkout error:', error);
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const addToFavourite = async (postId) => {
        try {
            const res = await axios.put(import.meta.env.VITE_API_URL + `/posts/addToFavourites/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })

            return toast.success(res.data.message)
        } catch (error) {
            console.log(error.message)
            return toast.error(error.response.data.message)
        }
    }


    useEffect(() => {
        getAllImages()

    }, [])

    return (
        <div className='flex justify-center items-center   h-[86vh]'>
            <Dashboard />

            <Toaster position='top-center' />
            <div className='max-w-6xl h-[100vh]    mx-auto  grid grid-cols-1 lg:shadow-2xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:h-[500px] overflow-y-auto'>

                {
                    !posts && <h1 className='text-6xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`'>no post yet</h1>
                }

                {
                    posts?.map(({ _id, title, image, price }) => (
                        <ImageCard
                            key={_id}
                            _id={_id}
                            title={title}
                            image={image}
                            price={price}
                            icon1={<RiShoppingCart2Line onClick={() => addToFavourite(_id)}
                                title='cart' className='text-2xl  text-black cursor-pointer transition-all ease-linear duration-300' />}
                            button={<Button onClick={() => paymentImage(_id,)} >Buy</Button>}
                        />
                    ))
                }
            </div>
        </div>


    )
}

