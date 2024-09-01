import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../store/slice/orderslice';
import DashboardHeader from './DashboardHeader';
import { Dashboard } from './Dashboard';

const Order = () => {
            const dispatch = useDispatch();
            const orders = useSelector((state) => state.order.orders);
            const role = useSelector((state) => state.auth.role);

            const getOrder = async () => {
                        try {
                                    const { data } = await axios.get(import.meta.env.VITE_API_URL + '/order/get', {
                                                headers: {
                                                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                                },
                                    });

                                    dispatch(setOrders(data.data));
                        } catch (error) {
                                    console.log(error.message);
                        }
            };

            useEffect(() => {
                        getOrder();
            }, []);

            return (
                        <div className="px-4 sm:px-6 lg:px-8">
                                    <Dashboard />

                                    <h1 className="text-2xl sm:text-4xl text-center my-4 font-bold underline">Orders</h1>

                                    <div className="overflow-x-auto">
                                                <table className="min-w-full bg-white rounded-lg shadow-md">
                                                            <thead>
                                                                        <tr className="bg-gray-200 text-gray-600 uppercase text-xs sm:text-sm leading-none">
                                                                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-center">Id</th>
                                                                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-center">Item</th>
                                                                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-center">
                                                                                                {role === 'Seller' ? 'Buyer' : 'Owner of this product'}
                                                                                    </th>
                                                                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-center">Date</th>
                                                                                    <th className="py-2 px-3 sm:py-3 sm:px-6 text-center">Price</th>
                                                                        </tr>
                                                            </thead>

                                                            {orders && orders.length > 0 ? (
                                                                        <tbody className="text-gray-600 text-xs sm:text-sm font-light">
                                                                                    {orders.map((order) => (
                                                                                                <tr
                                                                                                            key={order.reciept}
                                                                                                            className="border-b hover:bg-blue-gray-300 hover:text-white  hover:cursor-pointer"
                                                                                                >
                                                                                                            <td className="  py-2 px-3 sm:py-4 sm:px-6 text-center">{order.reciept}</td>
                                                                                                            <td className="  py-2 px-3 sm:py-4 sm:px-6 text-center">{order.title}</td>
                                                                                                            <td className="  py-2 px-3 sm:py-4 sm:px-6 text-center">
                                                                                                                        {role === 'Seller' ? order.nameOfBuyer : order.author.charAt(0).toUpperCase() + order.author.slice(1)}
                                                                                                            </td>
                                                                                                            <td className="py-2 px-3 sm:py-4 sm:px-6 text-center">{new Date(order.createdAt).toLocaleString()}</td>
                                                                                                            <td className="py-2 px-3 sm:py-4 sm:px-6 text-center">{order.price}</td>
                                                                                                </tr>
                                                                                    ))}
                                                                        </tbody>
                                                            ) : (
                                                                        <tbody>
                                                                                    <tr>
                                                                                                <td colSpan="5" className="text-center py-8">
                                                                                                            <h1 className="text-lg sm:text-3xl">No Orders yet</h1>
                                                                                                </td>
                                                                                    </tr>
                                                                        </tbody>
                                                            )}
                                                </table>
                                    </div>
                        </div>
            );
};

export default Order;
