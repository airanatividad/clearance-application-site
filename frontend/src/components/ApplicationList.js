import React from "react";

export default function ApplicationList() {
    return (
        <>
        <div class="container w-[68%] h-min bg-100-payne p-2 rounded-lg flex justify-center p-5 flex-col">
            <div class="flex flex-row text-white content-center justify-start">
                <div class="flex flex-col w-64 p-2 border-black-200">
                    <h1 class = "font-extrabold">
                        APPLICATION
                    </h1>
                    <h1 class = "">
                        Application #001
                    </h1>
                </div>
                <div class="flex flex-col w-64 p-2">
                    <h1 class = "font-extrabold">
                        STATUS
                    </h1>
                    <h1 class = "">
                        Adviser - Pending
                    </h1>
                    <h1 class = "">
                        Clearance Officer - Pending
                    </h1>
                </div>
                <div class="flex flex-col w-64 p-2">
                <h1 class = "font-extrabold">
                        REMARKS
                    </h1>
                    <h1 class = "">
                        Adviser - Good Job. Signed.
                    </h1>
                    <h1 class = "">
                        Clearance Officer - <i>null</i>
                    </h1>
                </div>
            </div>
            <button
                    className=" mt-3 rounded bg-100-charcoal px-4 py-2 text-white hover:bg-black"
                >
                    Cancel Application
            </button>
        </div>
        </>
    );
}
