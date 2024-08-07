import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NewImageAdd from './NewImageAdd';
import { IconButton } from '@material-tailwind/react';
import { toggleMenu } from '../store/slice/navslice';

const DashboardHeader = () => {
            const author = useSelector(state => state.auth.author);
            const role = useSelector(state => state.auth.role)
            const menu = useSelector(state => state.menu.menuOpen)

            const dispatch = useDispatch();

            return (
                        <div className='md:w-[35%]  w-[80%]  pt-8 pr-6 ml-6 border p-4 rounded-3xl shadow-xl  '>

                                    <IconButton
                                                variant="text"
                                                className=" absolute  right-4 top-5 ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                                ripple={false}
                                                onClick={() => dispatch(toggleMenu())}
                                    >
                                                {menu ? (
                                                            <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        fill="none"
                                                                        className="h-6 w-6"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                        strokeWidth={2}
                                                            >
                                                                        <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    d="M6 18L18 6M6 6l12 12"
                                                                        />
                                                            </svg>
                                                ) : (
                                                            <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-6 w-6"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth={2}
                                                            >
                                                                        <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    d="M4 6h16M4 12h16M4 18h16"
                                                                        />
                                                            </svg>
                                                )}
                                    </IconButton>
                                    <div className='font-bold text-4xl '>
                                                {
                                                            `Hello ${author.charAt(0).toUpperCase() + author.slice(1)}`
                                                }

                                                <p className='font-extralight'>Welcome  to your  {role} Dashboard</p>
                                    </div>

                                    <div className='' >
                                                <NewImageAdd />
                                    </div>
                        </div>
            )
}

export default DashboardHeader