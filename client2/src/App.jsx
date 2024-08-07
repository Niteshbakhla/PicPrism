import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'
import { SellerDashboard } from './pages/SellerDashboard'
import { BuyerDashboard } from './pages/BuyerDashboard'
import { Nav } from './components/Navbar'
import { ProtectedRoute } from './components/Protectedroutes'


function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login")
    }
  }, [])

  return (
    <>
      <Nav />
      <Routes location={location}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<ProtectedRoute children={<Login />} requiresAuth={false} />} />
        <Route path='/signup' element={<ProtectedRoute children={<Signup />} requiresAuth={false} />} />
        <Route path='/seller/profile' element={<ProtectedRoute children={<SellerDashboard />} />} />
        <Route path='/buyer/profile' element={<ProtectedRoute children={<BuyerDashboard />} />} />
      </Routes>
    </>
  )
}

export default App
