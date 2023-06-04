import React, { useEffect, useState } from "react";
import ApplicationList from "../components/ApplicationList";
import ClearanceForm from "../components/ClearanceForm";

export default function Dashboard() {
    const email = localStorage.getItem("email")
    const [adviser, setAdviser] = useState("")

    useEffect(() => {
        fetch(`http://localhost:3001/get-user-adviser-by-email?email=${email}`)
        .then(response => response.json())
        .then(data => {
            setAdviser(data)
        })
    }, [])
    
    return (
        <>
            <div class="w-[100%] flex flex-col">
                <div class="flex justify-center container container mx-auto">
                    <h1 class="font-extrabold flex text-4xl mt-20">
                        Clearance Application
                    </h1>
                </div>
                <div class="flex flex-col items-center p-5 place-content-center">
                    <ClearanceForm class="" adviser={adviser} email={email}/>
                </div>  
                <div class="flex flex-col items-center place-content-center">
                    <ApplicationList class="" email={email}/>
                </div>  
            </div>                    
        </>

    );
}