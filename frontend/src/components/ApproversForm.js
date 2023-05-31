import React from "react";

export default function ApproversForm() {
    return (
        <>
        {/* whole box */}
        <div class="container w-[70%] h-min bg-100-charcoal p-2 rounded-lg flex justify-center">
            <div class="flex flex-row text-white justify-center w-[100%]">
                <div class="flex flex-col">
                    <div class="flex flex-row items-center">
                        <div class="p-2">
                            <h1>
                                First Name
                            </h1>
                            <input placeholder="First Name" class="p-2 rounded-md text-100-charcoal"/>
                        </div>
                        <div class="p-2">
                            <h1>
                                Middle Name
                            </h1>
                            <input placeholder="Middle Name" class="p-2 rounded-md text-100-charcoal"/>
                        </div>      
                        <div class="p-2">
                            <h1>
                                Last Name
                            </h1>
                            <input placeholder="Last Name" class="p-2 rounded-md text-100-charcoal"/>
                        </div>              
                    </div>  
                    <div class="flex flex-row">
                        <div class="w-[50%] p-2">
                            <h1>
                                UP Mail
                            </h1>
                            <input placeholder="UP Mail" class="w-[100%] p-2 rounded-md text-100-charcoal"/>
                        </div>
                        <div class="w-[50%] p-2">
                            <h1>
                                Password
                            </h1>
                            <input placeholder="Password" class="w-[100%] p-2 rounded-md text-100-charcoal"/>
                        </div>
                    </div>
                    <div class="w-[100%] flex flex-row">
                        <button
                            className=" w-[50%] m-2 rounded bg-100-payne px-4 py-2 text-white hover:bg-black"
                        >
                            Reset
                        </button>     
                        <button
                            className="w-[50%] m-2 rounded bg-100-payne px-4 py-2 text-white hover:bg-black"
                        >
                            Submit
                        </button>    
                    </div>
             
                </div>


            </div>

        </div>
        </>
    );
}
