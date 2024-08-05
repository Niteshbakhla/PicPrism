import {
            Card,
            Typography,
            List,
            ListItem,
            ListItemPrefix,
            ListItemSuffix,
            Chip,
            IconButton
} from "@material-tailwind/react";
import {
            PresentationChartBarIcon,
            ShoppingBagIcon,
            UserCircleIcon,
            Cog6ToothIcon,
            InboxIcon,
            PowerIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slice/authSlice";
import toast, { Toaster } from "react-hot-toast";

export function Dashboard() {
            const author = useSelector((state) => state.auth.author)
            const menu = useSelector((state) => state.menu.menuOpen)
            const [openNav, setOpenNav] = useState(false)

            const dispatch = useDispatch()
            const navigation = useNavigate()

            const [clickButton, setClickButton] = useState(false);


            const logouthandle = () => {
                        toast.success("Successfully logout")
                        setTimeout(() => {
                                    navigation("/login")
                                    dispatch(logout())
                        }, 1000)
            }


            return (
                        <>
                                    <Card className={`h-[100vh] absolute -bottom-[100%] lg:-bottom-0 } ${menu === true && "-bottom-0"} w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 fixed left-0 transition-all`}>
                                                <Toaster position="top-center" />
                                                <div className="mb-2 p-4">
                                                            <Typography variant="h5" color="blue-gray" className="flex items-center justify-between flex-row-reverse">
                                                                        {
                                                                                    clickButton ? (
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                                                                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clip-rule="evenodd" />
                                                                                                </svg>

                                                                                    ) : (
                                                                                                <Link to={"/home"}>
                                                                                                            <svg onClick={() => setClickButton(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                                                            </svg>
                                                                                                </Link>

                                                                                    )

                                                                        }


                                                                        <span className="bg-black text-white w-[60px] h-[60px] rounded-full grid place-content-center text-3xl">
                                                                                    {
                                                                                                author.charAt(0).toUpperCase()
                                                                                    }
                                                                        </span>
                                                            </Typography>
                                                </div>
                                                <List>
                                                            <ListItem>
                                                                        <ListItemPrefix>
                                                                                    <PresentationChartBarIcon className="h-5 w-5" />
                                                                        </ListItemPrefix>
                                                                        Dashboard
                                                            </ListItem>
                                                            <ListItem>
                                                                        <ListItemPrefix>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                                                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                                                                                    </svg>

                                                                        </ListItemPrefix>
                                                                        Photo management
                                                            </ListItem>
                                                            <ListItem>
                                                                        <ListItemPrefix>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                                                                <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clip-rule="evenodd" />
                                                                                                <path fill-rule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clip-rule="evenodd" />
                                                                                    </svg>

                                                                        </ListItemPrefix>
                                                                        Analytics
                                                                        {/* <ListItemSuffix>
                                                                        <Chip value="104" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                                            </ListItemSuffix> */}
                                                            </ListItem>
                                                            <ListItem>
                                                                        <ListItemPrefix>
                                                                                    <UserCircleIcon className="h-5 w-5" />

                                                                        </ListItemPrefix>
                                                                        Orders
                                                            </ListItem>
                                                            <ListItem>
                                                                        <ListItemPrefix>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                                                                <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clip-rule="evenodd" />
                                                                                    </svg>

                                                                        </ListItemPrefix>
                                                                        Favourite
                                                            </ListItem>

                                                            <ListItem onClick={logouthandle} >
                                                                        <ListItemPrefix>
                                                                                    <PowerIcon className="h-5 w-5" />
                                                                        </ListItemPrefix>
                                                                        Log Out
                                                            </ListItem>

                                                </List>
                                    </Card>


                        </>
            );
}