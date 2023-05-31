import React from "react";

export default function AppCO() {
    return (
        <>
        <div class="container w-[25%] h-min bg-100-payne p-2 rounded-lg flex justify-center p-5 flex-col">
            <div class="flex flex-col text-white content-center justify-start">
                <div class="flex flex-col w-[100%] p-2 m-3">
                    <h1 class = "font-extrabold">
                        STUDENT
                    </h1>
                    <h1 class = "">
                        Kaeya Alberich
                    </h1>
                    <h1 class = "">
                        2021-12345
                    </h1>
                    <h1 class = "">
                        https://github.com/kalberich/spfile
                    </h1>
                    <h1 class = "">
                        This is a student's remarks.
                    </h1>
                </div>
                <div class="flex flex-col w-[100%] p-2 m-3">
                    <h1 class = "font-extrabold">
                        ADVISER
                    </h1>
                    <h1 class = "">
                        Monina Gazelle Charina B. Carandang 
                    </h1>   
                    <h1 class = "">
                        Approved
                    </h1>                 
                    <h1 class = "">
                        This is an adviser's remarks.
                    </h1>
                </div>
                <div class="flex flex-col w-[100%] p-2 m-3">
                    <h1 class="font-bold text-white">
                        CLEARANCE OFFICER'S REMARKS
                    </h1>
                    <input placeholder="Enter Remarks Here." class="w-80 p-2 rounded-md text-100-charcoal"/>
                </div>
            </div>
            <div class=" flex flex-row justify-center" >
                <button
                        className=" w-28 m-3 justify-center mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                    >
                        Approve
                </button>
                <button
                        className=" w-28 m-3 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                    >
                        Reject
                </button>                
            </div>

        </div>
        </>
    );
}
