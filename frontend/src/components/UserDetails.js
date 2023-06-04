import React, { useEffect, useState, useSession} from "react";
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import ApplicationList from "../components/ApplicationList";
import ClearanceForm from "../components/ClearanceForm";

export default function UserDetails() {
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
            <div class="flex flex-col rounded-md pt-3 h-16 w-60 m-1"> 
            <div class="text-white font-bold">
                <h1 class="flex item-center justify-center align-center">
                    {user?.email}   
                </h1>
                {user?.usertype === 1 && <h1 class="flex item-center justify-center align-center">STUDENT</h1>}
                {user?.usertype === 2 && <h1 class="flex item-center justify-center align-center">ADVISER</h1>}
                {user?.usertype === 3 && <h1 class="flex item-center justify-center align-center">CLEARANCE OFFICER</h1>}
                {user?.usertype !== 1 && user?.usertype !== 2 && user?.usertype !== 3 && <h1 class="flex item-center justify-center align-center">ADMIN</h1>}                
            </div>

            </div>                    
        </>

    );
}