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

  useEffect(() => {
    getMyPosts()
  }, [])
  return (
    <React.Fragment>
      <div className='flex  flex-col  lg:flex-row gap-2 min-h-[100vh]  justify-center items-center lg:p-16 pt-12 '>
        {/* Seller Dashboard left side */}
        <Dashboard />
        {/* Seller Dashboard right side */}
        <DashboardHeader />

      
        <div className='w-full'>

          <div className='lg:grid lg:grid-cols-3   place-content-start h-[80vh] lg:overflow-auto bg-black/5   lpt-4 scroll-smooth rounded-md p-8   '>

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
      </div>


    </React.Fragment>
  )
}
