import React from 'react'
import { Dashboard } from '../components/Dashboard'
import DashboardHeader from '../components/DashboardHeader'

export const SellerDashboard = () => {
  return (
    <div className='flex gap-2'>
      <Dashboard />
      <DashboardHeader />
    </div>
  )
}
