import React, { useState } from 'react';
import { Select, Option } from "@material-tailwind/react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import toast, { Toaster, } from "react-hot-toast"


export function Signup() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    termsAccepted: false,
    accountType: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      accountType: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL + "/signup", formData)

      if (data.success) {
        toast.success(data.message)
      }

      setTimeout(() => {
        navigate("/login")
      }, 1000)

    } catch (error) {

      console.log(error)
      toast.error(error.response.data.message)

    }
  };

  return (
    <div className="grid place-content-center min-h-[90vh] w-70  ">
      <Toaster position='top-center' />
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className='ml-6'>
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal ml-6">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt:2 lg:mt-8 md:mt-8  mb-2 w-70 m-auto  lg:w-80  max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-4 lg:gap-6 md:gap-6 ">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Your Name"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
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

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Account Type
            </Typography>

            {/* IN material-Tailwindcss in onChange event won't work instead use value to pass the value  */}
            <Select
              label="Select"
              value={formData.accountType}
              onChange={(value) => handleSelectChange(value)}
            >
              <Option value="Buyer">Buyer</Option>
              <Option value="Seller">Seller</Option>
            </Select>
          </div>

          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree to the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          <Button className="mt-6 rounded-full hover:bg-black hover:text-white " variant='outlined' fullWidth type="submit">
            Sign Up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to={"/login"} className="font-medium text-gray-900">
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
