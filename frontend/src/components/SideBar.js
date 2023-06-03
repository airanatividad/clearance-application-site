import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import SideButton from "./SideButton";

export default function SideBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData())
    const navigate = useNavigate()
  
    useEffect(() => {
      if (!isLoggedIn) {
        navigate(`/login`)
      }
    }, [isLoggedIn, navigate])
  
    function logout() {
      const cookies = new Cookies();
      cookies.remove("authToken");
  
      localStorage.removeItem("username");
      localStorage.removeItem("email");
  
      setIsLoggedIn(false)
    }
    
    return (
        <>
            <div class="flex">
                <aside class="absolute h-screen w-60 sticky left-0 bg-100-charcoal">
                    <div class="flex flex-col items-center text-white mt-10">
                        {/* user details */}
                            <div class="flex w-20 h-20 rounded-full bg-black m-3">
                                {/* <img class="rounded-full w-20 h-20" src="userimage.jpg" alt="image description">
                                </img> */}
                            </div>
                            <h1 class="font-extrabold self-center text-lg text-white">
                                KAEYA
                            </h1>
                            <p class="pb-3">
                                kalberich@up.edu.ph
                            </p>                            
                        {/* buttons */}
                        <div>
                            <SideButton redirectLink='/dashboard' label="Dashboard" />
                            <SideButton redirectLink='/manage/acc' label="Manage Accounts" />
                            <SideButton redirectLink='/manage/apps' label="Manage Applications" />
                            <SideButton redirectLink='/manage/stud' label="Student Account Approval" />

                            {/* temporary log out button */}
                            <button onClick={logout} class="flex flex-none flex-col rounded-md bg-100-payne pt-3 shadow shadow-p-dblue/50 hover:bg-black h-16 w-60 m-1">Log Out</button> 
                        </div>                        
                    </div>
                </aside>
                <Outlet />
            </div>
        </>
    );
}
