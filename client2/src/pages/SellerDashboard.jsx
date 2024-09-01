import React, { useEffect } from 'react'
import { Dashboard } from '../components/Dashboard'
import DashboardHeader from '../components/DashboardHeader'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slice/authSlice'
import toast from 'react-hot-toast'
import axios from 'axios'
import { setMyPosts } from '../store/slice/postSlice'
import { useNavigate } from 'react-router-dom'
import { ImageCard } from '../components/ImageCard'
import { BiSolidMessageSquareEdit } from "react-icons/bi"
import { MdDelete } from "react-icons/md";
import Order from '../components/Order'

export const SellerDashboard = () => {

  const { data: posts } = useSelector((state) => state.posts.myPost);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const getMyPosts = async () => {
    // if (posts.length > 0) return;


    try {
      const { data } = await axios.get("http://localhost:5000/api/post/", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        },
      }
      )
      dispatch(setMyPosts(data))

    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/post/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        withCredentials: true
      });

      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        console.error("Failed to delete the post:", response.data.message);
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("An error occurred while deleting the post:", error.message);
    }
  };

  useEffect(() => {
    getMyPosts()
  }, [])
  return (
    <React.Fragment>
      <div className='flex  flex-col  lg:flex-row gap-2 min-h-[100vh] lg:h-[50vh]  justify-center items-center lg:p-16 pt-12 '>
        {/* Seller Dashboard left side */}
        <Dashboard />
        {/* Seller Dashboard right side */}
        <DashboardHeader />


        <div className='w-full'>

          <div className='lg:grid lg:grid-cols-3   place-content-start min-h-[80vh] lg:overflow-auto bg-black/5   pt-4 scroll-smooth rounded-md p-8   '>

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
                  icon2={<MdDelete onClick={() => deletePost(_id)} title="Delete"
                    className="text-2xl text-black cursor-pointer transition-all ease-linear duration-300" />}
                />
              ))
            }
          </div>
        </div>
      </div>


    </React.Fragment>
  )
}
