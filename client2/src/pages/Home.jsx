import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllPosts } from '../store/slice/postSlice'
import { ImageCard } from '../components/ImageCard'
import { BiSolidMessageSquareEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

export const Home = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts.allPost)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const getAllImages = async () => {
        // if (posts?.length > 0) return
        const res = await axios.get(import.meta.env.VITE_API_URL + "/post/getAll")
        const { data } = res.data;
        dispatch(setAllPosts(data))

    }

    useEffect(() => {
        getAllImages()

    }, [])
    return (
        <div className='flex justify-center items-center h-[86vh]'>
            <div className='max-w-6xl mx-auto grid grid-cols-1 shadow-2xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[500px] overflow-y-auto'>
                {
                    posts?.map(({ _id, title, image, author, price }) => (
                        <ImageCard
                            key={_id}
                            _id={_id}
                            title={title}
                            image={image}
                            price={price}
                            icon1={<BiSolidMessageSquareEdit
                                title='Edit' className='text-2xl text-black cursor-pointer transition-all ease-linear duration-300' />}
                            icon2={<MdDelete title="Delete"
                                className="text-2xl text-black cursor-pointer transition-all ease-linear duration-300" />}
                        />
                    ))
                }
            </div>
        </div>


    )
}

