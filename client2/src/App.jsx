import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'
import { SellerDashboard } from './pages/SellerDashboard'
import { BuyerDashboard } from './pages/BuyerDashboard'
import { Nav } from './components/Navbar'


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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/seller/profile' element={<SellerDashboard />} />
        <Route path='/buyer/profile' element={<BuyerDashboard />} />
      </Routes>
    </>
  )
}

export default App
