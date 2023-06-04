import React, { useEffect, useState, useSession} from "react";
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import logoclearance from "../images/logo.png";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
    const navigate = useNavigate();
  
    useEffect(() => {
        fetch(`http://localhost:3001/get-user-by-email?email=${email}`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
        })
        .catch(error => {
          console.error("Failed to fetch user details:", error);
        });
    }, [isLoggedIn, navigate]);
  
  
    const email = localStorage.getItem("email");
    const [user, setUser] = useState(null);

    return (
        <>
        <nav class="sticky top-0 h-20 z-50 flex w-full flex-wrap items-center justify-end bg-100-charcoal p-4 py-1 sm:flex-row">
                <div className="h-15 relative flex w-12 flex-col self-center rounded-full">
                    <img
                    src={logoclearance}
                    className="object-scale-down object-left"
                    alt="Site Logo"
                    fill
                    />
                </div>
                <div className="flex self-center px-4">
                    <h1 className="text-2xl font-bold text-white">
                    {user?.fname} {user?.mname} {user?.lname}
                    </h1>
                </div>
        </nav>     
        <Outlet />
        </>
    );
}
