import React from "react";

export default function ClearanceForm() {
    return (
        <>
        <div class="container w-[70%] h-min bg-100-charcoal p-2 rounded-lg flex justify-center">
            <div class="flex flex-row text-white content-center justify-start">
                <div class="flex flex-col">
                    <div class="p-2">
                        <h1>Adviser</h1>
                        <p class="font-bold">Monina Gazelle Charina B. Carandang</p>
                    </div>
                    <div class="flex flex-row items-center">
                        <div class="p-2">
                            <h1>
                                Github Link
                            </h1>
                            <input placeholder="Github Link Here." class="p-2 m-2 rounded-md text-100-charcoal"/>
                        </div>
                        <div class="p-2">
                            <h1>
                                Remarks
                            </h1>
                            <input placeholder="Insert Remarks Here." class="p-2 m-2 rounded-md text-100-charcoal"/>
                        </div>                    
                    </div>  
                    <button
                        className=" ml-3 mb-1 rounded bg-100-payne px-4 py-2 text-white hover:bg-black"
                    >
                        Submit
                    </button>                  
                </div>


            </div>

        </div>
        </>
    );
}
