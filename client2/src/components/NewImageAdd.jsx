import React, { useState } from 'react';
import { Button, IconButton } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';
import useUpload from '../../hooks/UseUpload';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar"
import { Spinner } from "@material-tailwind/react";


const NewImageAdd = () => {
            const [image, setImage] = useState(null);
            const [progress, setProgress] = useState();
            const [title, setTitle] = useState('');
            const [price, setPrice] = useState('');
            const author = useSelector(state => state.auth.author)
            const dispatch = useDispatch();


            const images = "https://placehold.co/600x400/EEE/31343C";

            const imageHandle = (event) => {
                        const file = event.target.files[0];
                        setImage(file);
            };



            const onUploadProgress = (progressEvent) =>
                        setProgress(Math.round(progressEvent.loaded * 100) / progressEvent.total);


            const addPost = async (e) => {
                        e.preventDefault()

                        if (!title || !price) return toast.error("Fill the required fields");

                        try {
                                    const { public_id, secure_url } = await useUpload({
                                                image,
                                                onUploadProgress
                                    });



                                    if (!public_id || !secure_url) return toast.error("Image upload failed");

                                    setProgress(true)
                                    const res = await axios.post("http://localhost:5000/api/post/create", {
                                                title,
                                                price,
                                                image: secure_url,
                                                public_id,
                                                author
                                    }, {
                                                headers: {
                                                            "Authorization": "Bearer " + localStorage.getItem("accessToken")
                                                }
                                    });
                                    const data = await res.data;

                                    if (data.success) {
                                                toast.success(data.message);
                                                setProgress(false)
                                                e.target.reset();
                                                setImage(null);
                                                setProgress(0);
                                                setTitle('');
                                                setPrice('');
                                    }
                        } catch (error) {
                                    toast.error("Request Failed Please Login again")
                                    console.log(error);
                        }
            };



            return (
                        <>
                                    <div className="flex flex-col    ">
                                                <Toaster position='top-center' />
                                                <form onSubmit={addPost} className="w-full  ">
                                                            <div className=" rounded-md w-[200px] md:w-[400px] overflow-hidden lg:h-64 mb-4">
                                                                        <img src={image ? URL.createObjectURL(image) : images} alt="" className="h-full lg:w-full w-[300px]  object-cover" />
                                                            </div>
                                                            <div className="flex flex-col items-start gap-5 w-full mb-4">
                                                                        <input onChange={imageHandle} type="file" id="image" name="image" className='text' />
                                                            </div>
                                                            <div className='flex lg:flex-row flex-col  gap-4'>
                                                                        <div className="flex flex-col  w-[180px] lg:w-[250px] mb-4 shadow-lg">
                                                                                    <label htmlFor="title" className="mb-1">Title</label>
                                                                                    <input
                                                                                                type="text"
                                                                                                id='title'
                                                                                                name='title'
                                                                                                className='border border-gray-300 py-2 px-3 rounded focus:ring-2 outline-none focus:ring-blue-500 w-full'
                                                                                                value={title}
                                                                                                onChange={(e) => setTitle(e.target.value)}
                                                                                    />
                                                                        </div>
                                                                        <div className="flex flex-col w-[150px] mb-4 shadow-lg">
                                                                                    <label htmlFor="price" className="mb-1">Price</label>
                                                                                    <input
                                                                                                type="text"
                                                                                                name="price"
                                                                                                id="price"
                                                                                                className="border border-gray-300 py-2 px-3 rounded outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                                                                value={price}
                                                                                                onChange={(e) => setPrice(e.target.value)}
                                                                                                placeholder="₹0"
                                                                                    />
                                                                        </div>
                                                            </div>
                                                            <Button className='lg:w-full py-2  flex justify-center
                                                             bg-black 
                                                              text-white 
                                                              rounded-full' type='submit' >
                                                                        {progress ? <Spinner /> : "Submits"}
                                                            </Button>
                                                </form>
                                    </div>
                        </>
            );
};

export default NewImageAdd;
