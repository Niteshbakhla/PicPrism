import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExpanseCard = ({ color = "red",thisYear }) => {
          

            return (
                        <div className={`m-2 shadow-xl rounded-x  `}>
                                    <ResponsiveContainer width="100%" height={400}>
                                                <LineChart margin={{
                                                            top: 20,
                                                            bottom: -50,
                                                            left: -61,

                                                }} data={data}>
                                                            <XAxis dataKey="name" hide />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Line type="monotone" dataKey="amt" stroke="#8884d8" strokeWidth={2} />

                                                </LineChart>
                                    </ResponsiveContainer>
                        </div>
            );
};

export default ExpanseCard;
