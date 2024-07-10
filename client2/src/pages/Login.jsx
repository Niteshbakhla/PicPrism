import React, { useState } from 'react';
import { Select, Option } from "@material-tailwind/react";
import {
            Card,
            Input,
            Checkbox,
            Button,
            Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';

export function Login() {
            const [formData, setFormData] = useState({
                        email: '',
                        password: '',

            });

            const handleChange = (e) => {
                        const { name, value, } = e.target;
                        setFormData({
                                    ...formData,
                                    [name]: value,
                        });
            };



            const handleSubmit = (e) => {
                        e.preventDefault();
                        console.log('Form Data:', formData);
            };

            return (
                        <div className="grid place-content-center min-h-[100vh] w-70 ">
                                    <Card color="transparent" shadow={false}>
                                                <Typography variant="h4" color="blue-gray" className='text-center'>
                                                            Login
                                                </Typography>

                                                <form className="mt:2 lg:mt-8 md:mt-8  mb-2 w-70 m-auto  lg:w-80  max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                                                            <div className="mb-1 flex flex-col gap-4 lg:gap-6 md:gap-6 ">

                                                                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                                                                                    Your Email
                                                                        </Typography>
                                                                        <Input
                                                                                    size="lg"
                                                                                    placeholder="name@mail.com"
                                                                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
                                                                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                                                                    labelProps={{
                                                                                                className: "before:content-none after:content-none",
                                                                                    }}
                                                                                    name="password"
                                                                                    value={formData.password}
                                                                                    onChange={handleChange}
                                                                                    required
                                                                        />
                                                            </div>
                                                            <Button className="mt-6" fullWidth type="submit">
                                                                        Login
                                                            </Button>
                                                            <Typography color="gray" className="mt-4 text-center font-normal">
                                                                        Create your  account?{" "}
                                                                        <Link to={"/signup"} className="font-medium text-gray-900">
                                                                                    Signup
                                                                        </Link>
                                                            </Typography>
                                                </form>
                                    </Card>
                        </div>
            );
}
