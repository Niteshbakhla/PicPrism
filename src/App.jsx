import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { SellerDashboard } from './pages/SellerDashboard'
import { BuyerDashboard } from './pages/BuyerDashboard'
import { Nav, } from './components/Navbar'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/seller' element={<SellerDashboard />} />
          <Route path='/buyer' element={<BuyerDashboard />} />
        </Routes>
      </Router>
    </>
  )
}


