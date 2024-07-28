import React, { useEffect } from 'react'
import { Dashboard } from '../components/Dashboard'
import DashboardHeader from '../components/DashboardHeader'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slice/authSlice'
import toast from 'react-hot-toast'
import axios from 'axios'
import { setMyPosts } from '../store/slice/postSlice'

export const SellerDashboard = () => {

  const posts = useSelector((state) => state.posts.myPosts);
  const dispatch = useDispatch();


  const getMyPosts = async () => {
    try {
      if (posts.length > 0) return; 
      const res = await axios.get(
        import.meta.env.VITE_API_URL + "/post/myPosts", {
        headers: {
          Authorization: "Bearer" + localStorage.get("accessToken")
        },
      }
      )

      const { data } = await res.data
      dispatch(setMyPosts(data))

    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(logout())
    }
  }

  useEffect(() => {
    getMyPosts()
  }, [])
  return (
    <div className='flex gap-2'>
      <Dashboard />
      <DashboardHeader />
    </div>
  )
}
