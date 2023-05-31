import React from "react";

export default function StudentsList() {
    return (
        <>
        <div class="container w-[68%] h-min bg-100-payne p-2 rounded-lg flex justify-center p-5 flex-col m-1">
            <div class="flex flex-row text-white content-center items-center justify-between">
                <h1 class="text-xl">
                    Kaeya Alberich            
                </h1>
                <h1 class="text-lg">
                    kalberich@up.edu.ph
                </h1>
                <h1 class="text-lg">
                    2020-12345
                </h1>
                <h1 class="text-lg">
                    Insert Dropdown Here
                </h1>
                <div class="flex flex-row">
                    <button
                            className=" mx-2 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                        >
                            Approve
                    </button>         
                    <button
                            className=" mx-2 mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                        >
                            Reject
                    </button>                       
                </div>
          
            </div>

        </div>
        </>
    );
}
