import React from "react";
import ApplicationList from "../components/ApplicationList";
import ClearanceForm from "../components/ClearanceForm";

export default function Dashboard() {


    return (
        <>
            <div class="w-[100%] flex flex-col">
                <div class="flex justify-center container container mx-auto">
                    <h1 class="font-extrabold flex text-4xl mt-20">
                        Clearance Application   
                    </h1>
                </div>
                <div class="flex flex-col items-center p-5 place-content-center">
                    <ClearanceForm class="" />
                </div>  
                <div class="flex flex-col items-center place-content-center">
                    <ApplicationList class="" />
                </div>  
            </div>                    
        </>

    );
}