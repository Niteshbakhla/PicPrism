import React from 'react'
import DashboardHeader from './DashboardHeader'
import { Dashboard } from './Dashboard'
import { useLocation } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ExpanseCard from './ExpanseCard';


const Analytics = () => {
            const { pathname } = useLocation();
            const data = [
                        {
                                    name: 'Page A',
                                    uv: 4000,
                                    pv: 100,
                                    amt: 2400,
                        },
                        {
                                    name: 'Page B',
                                    uv: 3000,
                                    pv: 1398,
                                    amt: 2210,
                        },
                        {
                                    name: 'Page C',
                                    uv: 2000,
                                    pv: 9800,
                                    amt: 2290,
                        },
                        {
                                    name: 'Page D',
                                    uv: 2780,
                                    pv: 3908,
                                    amt: 2000,
                        },
                        {
                                    name: 'Page E',
                                    uv: 1890,
                                    pv: 4800,
                                    amt: 2181,
                        },
                        {
                                    name: 'Page F',
                                    uv: 2390,
                                    pv: 3800,
                                    amt: 2500,
                        },
                        {
                                    name: 'Page G',
                                    uv: 3490,
                                    pv: 4300,
                                    amt: 2100,
                        },
            ];

            return (
                        <div className='w-[100%] min-h-[100vh] flex '>
                                    <Dashboard />
                                    <div className='w-[85%] min-h-[90vh]  m-auto rounded-2xl shadow-xl p-4'>
                                                <h1 className='text-6xl'>Analytics</h1>
                                                <h2>{pathname === "/seller/analytics/profile" ? "Uploaded" : "Purchased"} This year</h2>

                                                <ExpanseCard />
                                    </div>


                        </div>
            )
}

export default Analytics