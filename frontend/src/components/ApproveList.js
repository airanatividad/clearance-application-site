import React from "react";

export default function ApproveList() {
    return (
        <>
        <div class="container w-[68%] h-min bg-100-payne p-2 rounded-lg flex justify-center p-5 flex-col m-1">
            <div class="flex flex-row text-white content-center items-center justify-between">
                <h1 class="text-xl">
                    Monina Gazelle Charina B. Carandang                
                </h1>
                <h1 class="text-lg">
                    mgccarandang@up.edu.ph
                </h1>
                <div class="flex flex-row">
                    <button
                            className=" mx-2 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                        >
                            Delete
                    </button>         
                    <button
                            className=" mx-2 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                        >
                            Edit
                    </button>                       
                </div>
          
            </div>

        </div>
        </>
    );
}
