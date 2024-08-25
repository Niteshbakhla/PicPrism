import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setOrders } from '../store/slice/orderslice';
import DashboardHeader from './DashboardHeader';
import { Dashboard } from './Dashboard';


const Order = () => {

            const dispatch = useDispatch();
            const orders = useSelector(state => state.order.orders)
            const role = useSelector(state => state.auth.role)

            const getOrder = async () => {

                        try {
                                    const { data } = await axios.get(import.meta.env.VITE_API_URL + "/order/get", {
                                                headers: {
                                                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                                                }
                                    })

                                    console.log()
                                    dispatch(setOrders(data.data))
                        } catch (error) {
                                    console.log(error.message)
                        }
            }

            useEffect(() => {
                        getOrder()
                        console.log(orders)
            }, [])


            return (
                        <div className=''>
                                    <Dashboard />
                                    
                                    <h1 className='text-4xl text-center m-4 font-bold underline'>Orders</h1>

                                    <table className='w-full mt-[40px] m-auto sm:w-[80vw] rounded-lg shadow-md'>
                                                <thead>
                                                            <tr className='w-full bg-gray-200 text-gray-600 uppercase text-sm leading-none'>
                                                                        <th className=' hover:bg-black/30 hover:text-black hover:cursor-pointer transition-all   py-3 px-6 text-center'>Id</th>
                                                                        <th className=' hover:bg-black/30 hover:text-black hover:cursor-pointer transition-all   py-3 px-6 text-center'>Item</th>
                                                                        <th className=' hover:bg-black/30 hover:text-black hover:cursor-pointer transition-all   py-3 px-6 text-center'>{role === 'Seller' ? "Buyer" : "Owner of this product"}</th>
                                                                        <th className=' hover:bg-black/30 hover:text-black hover:cursor-pointer transition-all   py-3 px-6 text-center'>Date</th>
                                                                        <th className=' hover:bg-black/30 hover:text-black hover:cursor-pointer transition-all   py-3 px-6 text-center'>Price</th>
                                                            </tr>
                                                </thead>
                                                {
                                                            orders ? (<h1 className='sm:text-6xl text-3xl  absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>No Orders yet</h1>) : (
                                                                        <tbody className='text-gray-600 text-sm font-light'>

                                                                                    {

                                                                                                orders?.map((order) => (
                                                                                                            <tr className='border-b-2 hover:bg-blue-gray-300 hover:text-black hover:cursor-pointer  ' >
                                                                                                                        <td className='p-4 transition-all'>{order.reciept}</td>
                                                                                                                        <td className='p-4 transition-all'>{order.title}</td>
                                                                                                                        {
                                                                                                                                    role === "Seller" ? <td>{order.nameOfBuyer}</td> : <td>{order.author.charAt(0).toUpperCase() + order.author.slice(1)}</td>
                                                                                                                        }


                                                                                                                        <td className='py- transition-all4'>{order.createdAt}</td>
                                                                                                                        <td className='py- transition-all4'>{order.price}</td>
                                                                                                            </tr>

                                                                                                ))
                                                                                    }
                                                                        </tbody>
                                                            )
                                                }
                                    </table>
                        </div >
            )
}

export default Order