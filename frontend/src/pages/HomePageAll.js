import React, { useEffect, useState, useSession} from "react";
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import ApplicationList from "../components/ApplicationList";
import ClearanceForm from "../components/ClearanceForm";
import logoclearance from "../images/logo.png";

export default function HomePageAll() {
    const [isLoggedIn, setIsLoggedIn] = useState(useLoaderData());
    const navigate = useNavigate();
    const members = ["Zachary Allen Catindig", "Aira Nicole Natividad", "Marian Stephanie Vergara"];
    const listMembers = members.map((members) =>
        <li>{members}</li>,
    );

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
            <div class="w-[100%] flex flex-col">
                <div class="flex justify-center container flex-col">
                    {/* <div className="flex w-24 flex-col self-center rounded-full mt-5">
                        <img
                        src={logoclearance}
                        className="object-scale-down object-center"
                        alt="Site Logo"
                        fill
                        />
                    </div> */}
                    <h1 class="font-extrabold flex self-cente justify-center text-4xl mt-10">
                        Welcome {user?.fname}!
                    </h1>
                </div>
                <div class="flex flex-col items-center p-5 place-content-center mt-10 mx-20 bg-100-gwhite">
                    <p class="text-xl">
                    Welcome to the Clearance Application Site! To start, we would like to inform you first that this system is still under development. If you encounter any problems, errors or bugs please report it through the Support GForm: /link/. <br/> <br/> To help you navigate easily through our system, the following are the modules that are currently working: <br/>
                    {user?.usertype == 1 && (
                    <li>
                    Dashboard
                    </li>
                    )}
                    {user?.usertype == 2 &&(
                    <li>
                    Manage Applications
                    </li>
                    )}
                    {user?.usertype == 3 &&(
                    <li>
                    Manage Applications
                    </li>
                    )}
                    {user?.usertype == 4 &&(
                        <>
                            <li>
                            Manage Approvers
                            </li>
                            <li>
                            Student Account Approval
                            </li>
                        </>

                    )}
                    <br/>
                    <div class="text-sm flex flex-col">
                        This system was co-created by CMSC 100 UV5L students:
                        <ul class="ml-5">{listMembers}</ul>                        
                    </div>

                    </p>
                </div>  
                <div class="flex flex-col items-center place-content-center">
                    {/* <ApplicationList class="" email={email}/> */}
                </div>  
            </div>                    
        </>

    );
}