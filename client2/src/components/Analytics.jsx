import React, { useEffect, useState } from 'react'
import DashboardHeader from './DashboardHeader'
import { Dashboard } from './Dashboard'
import { useLocation } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ExpenseCard from "./ExpanseCard"
import axios from 'axios';
import { Nav } from './Navbar';


const Analytics = () => {
            const [tillNow, setTillNow] = useState([])
            const [thisYear, setThisYear] = useState([])
            const [thisMonth, setThisMonth] = useState([])
            const [thisWeek, setThisWeek] = useState([])

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

            const getPostByDateRange = async () => {
                        try {
                                    const res = await axios.get(import.meta.env.VITE_API_URL + "/post/getPostByDateRange", {
                                                headers: {
                                                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                                                }, withCredentials: true
                                    })

                                    const { data } = res.data;
                                    setTillNow(data.tillNow)
                                    setThisYear(data.thisYear)
                                    setThisMonth(data.thisMonth)
                                    setThisWeek(data.thisWeek)



                        } catch (error) {
                                    console.log(error.message)
                        }
            }




            useEffect(() => {
                        getPostByDateRange()
            }, [])


            useEffect(() => {
                        const calculateTotalForSeller = (data) => {

                                    const value = data.reduce((acc, curr) => {
                                                const price = curr.price || 0
                                                const purchase = curr.purchaseBy ? curr.purchaseBy.length : 0
                                                return acc + (price * purchase)
                                    }, 0)
                        }
            }, [])

            const calculateTotalForSellers = (data) => {

                        const value = data.reduce((acc, curr) => {

                                    return acc += curr.price
                                    const price = curr.price || 0
                                    const purchase = curr.purchaseBy ? curr.purchaseBy.length : 0
                                    return acc + (price * purchase)
                        }, 0)
                        console.log(value)
            }


            const calculateTotalForSeller = (data) => {
                        const value = data.reduce((acc, curr) => {
                                    const total = acc += curr.price
                                    return total;
                                    const price = curr.price || 0
                                    const purchase = curr.purchaseBy ? curr.purchaseBy.length : 0
                                    return acc + (price * purchase)
                        }, 0)

                        return value
            }

            const calculateTotalForBuyer = (data) => data.reduce((acc, curr) => acc + curr.price, 0)
            return (
                        <div className='w-full min-h-screen'>

                                    <Dashboard />


                                    <div className='w-full max-w-6xl m-auto rounded-2xl shadow-xl p-4'>
                                                <h1 className='text-center text-2xl lg:text-3xl'>Analytics</h1>
                                                <h2 className='text-center mb-4'>{pathname === "/seller/analytics/profile" ? "Uploaded" : "Purchased"} This year</h2>
                                                <ResponsiveContainer width="100%" height={300}>
                                                            <LineChart margin={{ top: 10, bottom: 10, left: 0 }} data={thisYear}>
                                                                        <XAxis dataKey="title" hide />
                                                                        <YAxis />
                                                                        <Tooltip />
                                                                        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                                                            </LineChart>
                                                </ResponsiveContainer>
                                    </div>

                                    <div className='flex flex-col gap-8 lg:flex-row w-full max-w-5xl m-auto mt-8'>

                                                <div className='w-full lg:w-1/3 px-2'>
                                                            <h1 className='text-center text-2xl lg:text-3xl'>This Week</h1>
                                                            <ResponsiveContainer width="100%" height={250}>
                                                                        <LineChart margin={{ top: 10, bottom: 10, left: 0 }} data={thisWeek}>
                                                                                    <XAxis dataKey="title" hide />
                                                                                    <YAxis />
                                                                                    <Tooltip />
                                                                                    <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                                                                        </LineChart>
                                                            </ResponsiveContainer>
                                                </div>

                                                <div className='w-full lg:w-1/3 px-2'>
                                                            <h1 className='text-center text-2xl lg:text-3xl'>This Month</h1>
                                                            <ResponsiveContainer width="100%" height={250}>
                                                                        <LineChart margin={{ top: 10, bottom: 10, left: 0 }} data={thisMonth}>
                                                                                    <XAxis dataKey="title" hide />
                                                                                    <YAxis />
                                                                                    <Tooltip />
                                                                                    <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                                                                        </LineChart>
                                                                        <p className='text-center mt-2'><span className='font-medium'>Total Earned</span>: ₹{calculateTotalForSeller(thisMonth) || "₹0"}</p>
                                                            </ResponsiveContainer>
                                                </div>

                                                <div className='w-full lg:w-1/3 px-2'>
                                                            <h1 className='text-center text-2xl lg:text-3xl'>Till Now</h1>
                                                            <ResponsiveContainer width="100%" height={250}>
                                                                        <LineChart margin={{ top: 10, bottom: 10, left: 0 }} data={tillNow}>
                                                                                    <XAxis dataKey="title" hide />
                                                                                    <YAxis />
                                                                                    <Tooltip />
                                                                                    <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                                                                        </LineChart>
                                                            </ResponsiveContainer>
                                                </div>

                                    </div>

                        </div>

            )
}

export default Analytics 