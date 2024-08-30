import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'
import { SellerDashboard } from './pages/SellerDashboard'
import { BuyerDashboard } from './pages/BuyerDashboard'
import { Nav } from './components/Navbar'
import { ProtectedRoute } from './components/Protectedroutes'
import Analytics from './components/Analytics'
import Favourite from './pages/Favourite'
import Order from './components/Order'
import { useSelector } from 'react-redux'
import PaymentSuccess from './pages/PaymentSuccess'
import CancelPaymentPage from './pages/CancelPayment'


function App() {
  const navigate = useNavigate()
  const role = useSelector(state => state.auth.role)

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
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/seller/profile' element={<ProtectedRoute children={<SellerDashboard />} />} />
        <Route path="/seller/analytics/profile" element={<ProtectedRoute children={<Analytics />} />} />
        <Route path="/seller/favourite/profile" element={<ProtectedRoute children={<Favourite />} />} />
        <Route path={`/${role}/order/profile`} element={<ProtectedRoute children={<Order />} />} />
        <Route path='/success' element={<PaymentSuccess />} />
        <Route path='/cancel' element={<CancelPaymentPage />} />
        <Route path='/buyer/profile' element={<ProtectedRoute children={<BuyerDashboard />} />} />
      </Routes>
    </>
  )
}

export default App
