import React from 'react'
import { useSelector } from 'react-redux'
import NewImageAdd from './NewImageAdd';

const DashboardHeader = () => {
            const author = useSelector(state => state.auth.author);
            const role = useSelector(state => state.auth.role)
            return (
                        <div className='w-[100%] mt-8'>
                                    <div className='font-bold text-4xl'>
                                                {
                                                            `Hello ${author.charAt(0).toUpperCase() + author.slice(1)}`
                                                }

                                                <p className='font-extralight'>Welcome  to your  {role} Dashboard</p>
                                    </div>

                                    <div>
                                                <NewImageAdd />
                                    </div>
                        </div>
            )
}

export default DashboardHeader