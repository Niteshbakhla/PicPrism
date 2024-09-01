import React, { useState } from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from "react-hot-toast";
import { login } from '../store/slice/authSlice';
import { useDispatch } from "react-redux";



export function Login() {
            const navigate = useNavigate();
            const dispatch = useDispatch();
            const [formData, setFormData] = useState({
                        email: '',
                        password: '',
            });

            const handleChange = (e) => {
                        const { name, value } = e.target;
                        setFormData({
                                    ...formData,
                                    [name]: value,
                        });
            };

            const handleSubmit = async (e) => {

                        e.preventDefault();

                        try {
                                    const { data } = await axios.post(import.meta.env.VITE_API_URL + "/login", formData);

                                    if (data.success) {
                                                toast.success(data.message);
                                                dispatch(login(data));
                                                setTimeout(() => {
                                                            if (data.role.charAt(0).toLowerCase() + data.role.slice(1).toLowerCase() === "seller") {
                                                                        navigate("/seller/profile");
                                                            } else {
                                                                        navigate("/");
                                                            }
                                                }, 1000);
                                                return;     
                                    }
                        } catch (error) {
                                    toast.error(error.response.data.message);
                        }
            };



            return (
                        <div className="grid place-content-center min-h-[80vh] w-70">
                                    <Toaster position='top-center' />
                                    <Card color="transparent" shadow={false}>
                                                <Typography variant="h4" color="blue-gray" className='text-center'>
                                                            Login
                                                </Typography>

                                                <form className="mt-2 lg:mt-8 md:mt-8 mb-2 w-70 m-auto lg:w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                                                            <div className="mb-1 flex flex-col gap-4 lg:gap-6 md:gap-6">
                                                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                                                                    Your Email
                                                                        </Typography>
                                                                        <Input
                                                                                    size="lg"
                                                                                    placeholder="name@mail.com"
                                                                                    className="!border-gray-400 focus:!border-black"
                                                                                    labelProps={{
                                                                                                className: "before:content-none after:content-none",
                                                                                    }}
                                                                                    name="email"
                                                                                    value={formData.email}
                                                                                    onChange={handleChange}
                                                                                    required
                                                                        />
                                                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                                                                    Password
                                                                        </Typography>
                                                                        <Input
                                                                                    type="password"
                                                                                    size="lg"
                                                                                    placeholder="********"
                                                                                    className="!border-gray-400 focus:!border-black"
                                                                                    labelProps={{
                                                                                                className: "before:content-none after:content-none",
                                                                                    }}
                                                                                    name="password"
                                                                                    value={formData.password}
                                                                                    onChange={handleChange}
                                                                                    required
                                                                        />
                                                            </div>
                                                            <Button variant="outlined" className="mt-6  rounded-full  text-black hover:bg-black hover:text-white" fullWidth type="submit">
                                                                        Login
                                                            </Button>

                                                            <Typography color="gray" className="mt-4 text-center font-normal">
                                                                        Create your account?{" "}
                                                                        <Link to={"/signup"} className="font-medium text-black">
                                                                                    Signup
                                                                        </Link>
                                                            </Typography>
                                                </form>
                                    </Card>
                        </div>
            );
}
