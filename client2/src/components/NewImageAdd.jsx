import React, { useState } from 'react'
import images from "../assets/utility"
import { Button } from "@material-tailwind/react";
import toast from 'react-hot-toast';
import useUpload from '../../hooks/UseUpload';
import axios from 'axios';

const NewImageAdd = () => {

            const [image, setImage] = useState(null);
            const [progress, setProgress] = useState(0);
            const images = "https://images.unsplash.com/photo-1720048171180-a8178a198fa8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"

            const imageHanlde = (event) => {
                        const file = event.target.files[0];
                        setImage(file)
            }

            const onUploadProgress = (progressEvent) =>
                        setProgress(Math.round(progressEvent.loaded * 100) / progressEvent.total)

            const addPost = async (e) => {
                        const { name, value } = e.target
                        e.preventDefault();
                        try {
                                    const title = name;
                                    const price = value;

                                    if (!title || !price) return toast.error("Fill the required fields");
                                    const { public_id, secure_url } = await useUpload({
                                                image,
                                                onUploadProgress
                                    });

                                    if (!public_id || !secure_url) return toast.error("Image upload failed")
                                    const res = await axios.post(import.meta.env.VITE_API_URL + "/post/create", {
                                                title,
                                                price,
                                                image: secure_url,
                                                public_id: public_id,
                                                author,
                                    },
                                                {
                                                            headers: {
                                                                        "Authorization": "Bearer" + localStorage.getItem("accessToken")
                                                            }
                                                }
                                    )

                                    const data = await res.data;

                                    if (data.success) {
                                                toast.success(data.message)
                                                e.target.reset();
                                                setImage(null)
                                                setProgress(0)
                                    }


                        } catch (error) {
                                    console.log(error)
                        }
            }
            return (
                        <div >

                                    <form action="" onSubmit={addPost}>
                                                <div className='w-[600px] rounded-md overflow-hidden h-[400px]'>
                                                            <img src={`${image ? URL.createObjectURL(image) : images}`} alt="" className="h-[100%] w-[100%]   " />

                                                </div>

                                                <div className='flex flex-col justify-center items-start gap-5   w-[100%]'>

                                                            <input onChange={imageHanlde} type="file" id="image" name="image" className='text' />
                                                            <Button type='submit'>Submit</Button>
                                                </div>


                                    </form>




                        </div>
            )
}

export default NewImageAdd